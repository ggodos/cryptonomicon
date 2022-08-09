// const API_KEY = localStorage.getItem("cryptonomicon-api-key");
const API_KEY =
  "7a082780120e86a8fab36faaa20c682d77602d6377171b07b0d8f6d9f0abfcb9";
const ws = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const exchangeCoins = ["BTC", "ETH"];
/**
 * Array of subscribed ids on coin
 * @type {Map.<string, Set.<string>>}
 */
const coinsSubscribes = new Map();
const idToPortMap = new Map();
const dependencies = new Map();
/**
 * Array of coins that depends on ExchangeCoin
 * required init from exchangeCoins
 * @type {Map.<string, Array.<string>>}
 */
const exchangeDeps = new Map();
const selfSubed = new Set();

// Init deps
exchangeCoins.forEach(c => exchangeDeps.set(c, []));

function postToAllPorts(msg) {
  for (const port of idToPortMap.values()) {
    port.postMessage(msg);
  }
}

// handling websocket messages
ws.onmessage = ({ data }) => {
  const parsedData = JSON.parse(data);
  // Maybe save ports subcribes?
  postToAllPorts(parsedData);
};

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(stringifiedMessage);
    return;
  }

  ws.addEventListener(
    "open",
    () => {
      ws.send(stringifiedMessage);
    },
    { once: true }
  );
}

// client messages
self.onconnect = function (e) {
  const port = e.ports[0];

  port.onmessage = event => {
    const { data, command, fromCoin: coin, toCoin: currency, id } = event.data;
    if (coin && !coinsSubscribes.get(coin)) {
      coinsSubscribes.set(coin, new Set());
    }

    switch (command) {
      case "sub":
        idToPortMap.set(id, port);
        handleSubscribe(data, id, coin, currency);
        break;
      case "unsub":
        handleUnsubscribe(data, id, coin, currency);
        break;
      case "closing":
        handleClosing(id);
        break;
    }
  };
};

function handleSubscribe(data, id, coin, currency) {
  // console.log(`Sub to ${coin} from ${id}`);
  // TODO: if dependencies.get(coin) use saved

  coinsSubscribes.get(coin).add(id);
  sendToWebSocket(data);

  // add deps to exchange fromCoin
  if (currency != "USD") {
    // "SHA" -> "BTC"
    dependencies.set(coin, currency);
    exchangeDeps.set(currency, [...(exchangeDeps.get(currency) ?? []), coin]);
  } else if (exchangeCoins.includes(coin)) {
    // "BTC" -> "USD"
    selfSubed.add(currency);
  }
}

// eslint-disable-next-line no-unused-vars
function handleUnsubscribe(data, id, coin, refCurrency) {
  // if exchange refCurrency "USD"
  //   if refCurrency in ["BTC", "ETH"]
  //     coin("BTC") have thing that depends on him?
  //     yes: none
  //     no: ws.unsub(coin, "USD") // sendToWebSocket(data);
  //   else
  //     ws.unsub(coin, "USD")
  //
  // else if refCUrrency == "USD"
  //   ws.unsub(coin, refCurrency) // sendToWebSocket(data);
  //   unsubOnWs(data, id, refCurrency, "USD")
  // console.log(coin, refCurrency, exchangeDeps, dependencies, coinsSubscribes);
  coinsSubscribes.get(coin).delete(id);
  if (coinsSubscribes.get(coin).size > 0) {
    return;
  }

  if (refCurrency == "USD") {
    if (exchangeCoins.includes(coin)) {
      // "BTC" -> "USD"
      if (exchangeDeps.get(coin).length == 0) {
        sendToWebSocket(data); // Remove of exchange coin
        selfSubed.add(coin);
      } // else doesn't remove
    } else {
      // "SHA" -> "USD"
      sendToWebSocket(data);
      // TODO: remove deps
      // "BTC" = deps["SHA"]
      const exchangeCoin = dependencies.get(coin);
      if (exchangeCoin) {
        exchangeDeps.set(
          exchangeCoin, // "BTC"
          exchangeDeps.get(exchangeCoin).filter(v => v != coin)
          // "BTC": [..., "SHA", ...] -> [..., ...]
        );
      }
    }
  } else {
    // "SHA" -> "BTC"
    //  coin -> refCurrency
    sendToWebSocket(data);
    exchangeDeps.set(
      refCurrency,
      exchangeDeps.get(refCurrency).filter(v => v != coin)
    );
    if (selfSubed.has(refCurrency)) {
      unsubOnWs(id, refCurrency, "USD");
    }
  }
}

function handleClosing(id) {
  console.log(`close id is ${id}`);
  idToPortMap.delete(id);
  console.log(`closing port for id ${id}`);
}

// eslint-disable-next-line no-unused-vars
function unsubOnWs(id, coin, refCurrency) {
  const data = {
    action: "SubRemove",
    subs: [`5~CCCAGG~${coin}~${refCurrency}`]
  };
  handleUnsubscribe(data, id, coin, refCurrency);
}
