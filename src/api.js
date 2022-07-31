const API_KEY =
  "1490c4962f40a8aad84eba5777a0641fd8e8b68e90177d4b188e786fd0a3cec7";

const tickersHandlers = new Map();
const tickersErrorHandlers = new Map();
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

const AGGREGATE_INDEX = "5";
const INVALID_SUB_INDEX = "500";
const INVALID_SUB_MESSAGE = "INVALID_SUB";

socket.addEventListener("message", e => {
  const {
    TYPE: type,
    MESSAGE: message,
    FROMSYMBOL: currency,
    PRICE: newPrice,
    PARAMETER: parameter
  } = JSON.parse(e.data);
  if (type == INVALID_SUB_INDEX && message == INVALID_SUB_MESSAGE) {
    const ticker = parameter.split("~")[2];
    const errorsHandlers = tickersErrorHandlers.get(ticker) ?? [];
    errorsHandlers.forEach(fn => fn());
    tickersErrorHandlers.delete(ticker);
    return;
  }

  if (type != AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach(fn => fn(newPrice));
});

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

function subscribeToTickerOnWs(tickerName) {
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${tickerName}~USD`]
  });
}

function unsubscribeFromTickerOnWs(tickerName) {
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${tickerName}~USD`]
  });
}

export const subscribeToTicker = (tickerName, cb, errorCb = undefined) => {
  const subscribers = tickersHandlers.get(tickerName) || [];
  tickersHandlers.set(tickerName, [...subscribers, cb]);

  if (errorCb) {
    const errors = tickersErrorHandlers.get(tickerName) || [];
    tickersErrorHandlers.set(tickerName, [...errors, errorCb]);
  }

  subscribeToTickerOnWs(tickerName);
};

export const unsubscribeFromTicker = tickerName => {
  tickersHandlers.delete(tickerName);
  tickersErrorHandlers.delete(tickerName);
  unsubscribeFromTickerOnWs(tickerName);
};

export const loadAllCoins = () =>
  fetch(
    `https://min-api.cryptocompare.com/data/all/coinlist?summary=true`
  ).then(r => r.json());
