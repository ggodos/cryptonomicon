const API_KEY =
  "1490c4962f40a8aad84eba5777a0641fd8e8b68e90177d4b188e786fd0a3cec7";

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

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const AGGREGATE_INDEX = "5";
const INVALID_SUB_INDEX = "500";
const INVALID_SUB_MESSAGE = "INVALID_SUB";
const SUBSCRIBTION_UNRECOGNIZED = "SUBSCRIPTION_UNRECOGNIZED";

socket.addEventListener("message", e => {
  const {
    TYPE: type,
    MESSAGE: message,
    FROMSYMBOL: currency,
    TOSYMBOL: referenceCurrency,
    PRICE: newPrice,
    PARAMETER: parameter
  } = JSON.parse(e.data);

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
  if (referenceCurrency != "USD") {
    useCrossExchange(currency, referenceCurrency, newPrice);
    return;
  }

  const currencyHandlers = tickersHandlers.get(currency) ?? [];
  currencyHandlers.forEach(fn => fn(newPrice));

  const deps = exchangeDependencies.get(currency) ?? [];
  deps.forEach((price, curr) => {
    const dependeciesHandlers = tickersHandlers.get(curr) ?? [];
    dependeciesHandlers.forEach(fn => fn((1 / price) * newPrice));
  });
});

/**
 * @param {string} parameter
 * @return {Array.<{index: string, indexType: string, currency: string, referenceCurrency: string}>}
 */
function extractFromParameter(parameter) {
  return parameter.split("~");
}

function useCrossExchange(currency, referenceCurrency, price) {
  if (!exchangeDependencies.get(referenceCurrency)) {
    exchangeDependencies.set(referenceCurrency, new Map());
  }

  subscribesForExchange.set(currency, referenceCurrency);
  exchangeDependencies.get(referenceCurrency).set(currency, 1 / price);
  subscribeToTickerOnWs(referenceCurrency, "USD");
}

function unsubscribeCrossExchange(parameter) {
  const currency = extractFromParameter(parameter)[2];
  const referenceCurrency = subscribesForExchange.get(currency);
  unsubscribeFromTickerOnWs(currency, referenceCurrency);
  subscribesForExchange.delete(currency);
  const exchangeCurrency = exchangeDependencies.get(referenceCurrency);
  if (exchangeCurrency) {
    exchangeCurrency.delete(currency);
    // doesn't have dependencies and don't have ticker
    if (exchangeCurrency.size == 0 && !tickersHandlers.get(referenceCurrency)) {
      unsubscribeFromTickerOnWs(referenceCurrency, "USD");
    }
  }
}

function handleUnsubscribed(parameter) {
  const [currency, referenceCurrency] = extractFromParameter(parameter).slice(
    2,
    4
  );
  const nextReference = exchangeRoute[referenceCurrency];
  if (nextReference) {
    subscribeToTickerOnWs(currency, nextReference);
    return;
  }
  const errorsHandlers = tickersErrorHandlers.get(currency) ?? [];
  errorsHandlers.forEach(fn => fn());
  tickersErrorHandlers.delete(currency);
}

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}

function subscribeToTickerOnWs(tickerName, currency = "USD") {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${tickerName}~${currency}`]
  });
}

function unsubscribeFromTickerOnWs(tickerName, currency = "USD") {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${tickerName}~${currency}`]
  });
}

export const subscribeToTicker = (tickerName, cb, errorCb = undefined) => {
  const subscribers = tickersHandlers.get(tickerName) || [];
  tickersHandlers.set(tickerName, [...subscribers, cb]);

  if (errorCb) {
    const errors = tickersErrorHandlers.get(tickerName) || [];
    tickersErrorHandlers.set(tickerName, [...errors, errorCb]);
  }

  subscribeToTickerOnWs(tickerName, "USD");
};

export const unsubscribeFromTicker = tickerName => {
  tickersHandlers.delete(tickerName);
  tickersErrorHandlers.delete(tickerName);
  console.log(exchangeDependencies.get(tickerName));
  const exchangeCurrency = exchangeDependencies.get(tickerName);
  if (exchangeCurrency && exchangeCurrency.size == 0) {
    unsubscribeFromTickerOnWs(tickerName);
  }
};

export const loadAllCoins = () => fetch(ALL_COINS_URL).then(r => r.json());
