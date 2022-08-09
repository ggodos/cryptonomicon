import { v4 as uuidv4 } from "uuid";

const worker = new SharedWorker("/cryptonomicon/worker.js");
const id = uuidv4();
const ALL_COINS_URL =
  "https://min-api.cryptocompare.com/data/all/coinlist?summary=true";

/**
 * @type {Map.<string, Array.<Function>>}
 */
const tickersHandlers = new Map();
/**
 * @type {Map.<string, Array.<Function>>}
 */
const tickersErrorHandlers = new Map();
/**
 * @type {Map.<string, Map<string, number>>}
 */
const exchangeDependencies = new Map();
/**
 * @type {Map<string, string>}
 */
const subscribesForExchange = new Map();
const exchangeRoute = {
  USD: "BTC",
  BTC: "ETH"
};

const AGGREGATE_INDEX = "5";
const INVALID_SUB_INDEX = "500";
const INVALID_SUB_MESSAGE = "INVALID_SUB";
const SUBSCRIBTION_UNRECOGNIZED = "SUBSCRIPTION_UNRECOGNIZED";
const ALREADY_ACTIVE = "SUBSCRIPTION_ALREADY_ACTIVE";

// Handle web socket messages
worker.port.start();
worker.port.onmessage = event => {
  handleMessageFromPort(event.data);
};

function handleMessageFromPort(data) {
  const {
    TYPE: type,
    MESSAGE: message,
    FROMSYMBOL: fromCoin,
    TOSYMBOL: toCoin,
    PRICE: newPrice,
    PARAMETER: parameter
  } = data;
  // console.log(
  //   `type: ${type}\nfrom: ${fromCoin}\nto: ${toCoin}\nprice: ${newPrice}\n`
  // );

  if (message == ALREADY_ACTIVE) {
    handleAlreadyActive(parameter);
    return;
  }

  // can't subscribe
  if (type == INVALID_SUB_INDEX && message == INVALID_SUB_MESSAGE) {
    handleUnsubscribed(parameter);
    return;
  }

  // unsub if use cross exchange
  if (message == SUBSCRIBTION_UNRECOGNIZED) {
    unsubscribeCrossExchange(parameter);
    return;
  }

  // not update
  if (type != AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }

  // cross exchange usage
  if (toCoin != "USD") {
    useCrossExchange(fromCoin, toCoin, newPrice);
    return;
  }

  const coinsHandlers = tickersHandlers.get(fromCoin) ?? [];
  coinsHandlers.forEach(fn => fn(newPrice));

  const deps = exchangeDependencies.get(fromCoin) ?? [];
  deps.forEach((price, curr) => {
    const dependeciesHandlers = tickersHandlers.get(curr) ?? [];
    dependeciesHandlers.forEach(fn => fn((1 / price) * newPrice));
  });
}

function postMessageToWorker(data) {
  worker.port.postMessage(data);
}

/**
 * @param {string} parameter
 * @return {Array.<{index: string, indexType: string, fromCoin: string, toCoin: string}>}
 */
function extractFromParameter(parameter) {
  return parameter.split("~");
}

function handleAlreadyActive(parameter) {
  const [fromCoin, toCoin] = extractFromParameter(parameter).slice(2, 4);
  if (toCoin != "USD") {
    addDependencyToWs(fromCoin, toCoin);
  }
}

function useCrossExchange(fromCoin, toCoin, price) {
  if (!exchangeDependencies.get(toCoin)) {
    exchangeDependencies.set(toCoin, new Map());
  }

  subscribesForExchange.set(fromCoin, toCoin);
  exchangeDependencies.get(toCoin).set(fromCoin, 1 / price);
  subscribeToCoinOnWs(toCoin, "USD");
}

function unsubscribeCrossExchange(parameter) {
  const fromCoin = extractFromParameter(parameter)[2];
  const toCoin = subscribesForExchange.get(fromCoin);
  if (!toCoin) {
    return;
  }

  unsubscribeFromCoinOnWs(fromCoin, toCoin);
  subscribesForExchange.delete(fromCoin);

  const exchangeCoins = exchangeDependencies.get(toCoin);
  if (exchangeCoins) {
    exchangeCoins.delete(fromCoin);

    if (
      exchangeCoins.size == 0 &&
      tickersHandlers.get(toCoin) &&
      tickersHandlers.get(toCoin).length == 0
    ) {
      unsubscribeFromCoinOnWs(toCoin);
    }
  }
}

function handleUnsubscribed(parameter) {
  const [fromCoin, toCoin] = extractFromParameter(parameter).slice(2, 4);
  if (subscribesForExchange.get(fromCoin)) {
    return;
  }

  const nextReference = exchangeRoute[toCoin];
  console.log(fromCoin, toCoin, nextReference);
  if (nextReference) {
    subscribeToCoinOnWs(fromCoin, nextReference);
    return;
  }

  const errorsHandlers = tickersErrorHandlers.get(fromCoin) ?? [];
  errorsHandlers.forEach(fn => fn());
  tickersErrorHandlers.delete(fromCoin);
}

function addDependencyToWs(fromCoin, toCoin) {
  // console.log(`add deps ${fromCoin} and ${toCoin}`);
  postMessageToWorker({
    command: "addDependency",
    fromCoin: fromCoin,
    toCoin: toCoin,
    id: id
  });
}

function subscribeToCoinOnWs(fromCoin, toCoin = "USD") {
  postMessageToWorker({
    data: {
      action: "SubAdd",
      subs: [`5~CCCAGG~${fromCoin}~${toCoin}`]
    },
    command: "sub",
    fromCoin: fromCoin,
    toCoin: toCoin,
    id: id
  });
}

function unsubscribeFromCoinOnWs(fromCoin, toCoin = "USD") {
  // console.log(`UNSUB WS ${fromCoin} ${toCoin}`);
  postMessageToWorker({
    data: {
      action: "SubRemove",
      subs: [`5~CCCAGG~${fromCoin}~${toCoin}`]
    },
    command: "unsub",
    fromCoin: fromCoin,
    toCoin: toCoin,
    id: id
  });
}

export const subscribeToCoin = (coin, cb, errorCb = undefined) => {
  const subscribers = tickersHandlers.get(coin) || [];
  tickersHandlers.set(coin, [...subscribers, cb]);

  if (errorCb) {
    const errors = tickersErrorHandlers.get(coin) || [];
    tickersErrorHandlers.set(coin, [...errors, errorCb]);
  }
  subscribeToCoinOnWs(coin, "USD");
};

export const unsubscribeFromCoin = coin => {
  // console.log(`UNSUB MAIN ${coin}`);
  tickersHandlers.delete(coin);
  tickersErrorHandlers.delete(coin);

  unsubscribeFromCoinOnWs(coin, "USD");
};

export const loadAllCoins = () => fetch(ALL_COINS_URL).then(r => r.json());

addEventListener("beforeunload", () => {
  worker.port.postMessage({ command: "closing", id: id });
});
