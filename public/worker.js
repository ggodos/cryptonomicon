// const API_KEY = localStorage.getItem("cryptonomicon-api-key");
const API_KEY =
  "7a082780120e86a8fab36faaa20c682d77602d6377171b07b0d8f6d9f0abfcb9";
const ws = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

/**
 * coin: ids[]
 * @type {Map.<string, string[]>}
 */
const coinsSubscribes = new Map();
const idToPortMap = new Map();

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
    const { data, command, coin, id } = event.data;
    if (coin && !coinsSubscribes.get(coin)) {
      coinsSubscribes.set(coin, new Set());
    }

    switch (command) {
      case "sub":
        handleSubscribe(coin, id, data, port);
        break;
      case "unsub":
        handleUnsubscribe(coin, id, data);
        break;
      case "closing":
        handleClosing(id);
        break;
    }
  };
};

function handleSubscribe(coin, id, data, port) {
  if (!id) {
    return;
  }

  console.log(`Sub to ${coin} from ${id}`);

  idToPortMap.set(id, port);
  sendToWebSocket(data);

  coinsSubscribes.get(coin).add(id);
}

function handleUnsubscribe(coin, id, data) {
  console.log(`Unsub from ${coin} from ${id}`);
  if (coinsSubscribes.get(coin).size == 0) {
    sendToWebSocket(data);
  }

  coinsSubscribes.get(coin).delete(id);
}

function handleClosing(id) {
  console.log(`close id is ${id}`);
  idToPortMap.delete(id);
  console.log(`closing port for id ${id}`);
}
