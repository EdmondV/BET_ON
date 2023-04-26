const noop = () => {
};

const DEFAULT_OPTIONS = {
  onMessage: noop,
  onConnect: noop,
  onDisconnect: noop,
  onError: noop,
};

const marshal = (data) => JSON.stringify(data);

const unmarshal = (data) => JSON.parse(data);

/**
 * @param {string} url
 * @param {{}} options
 * @constructor
 */
export default function WS(url, options) {
  const ws = new WebSocket(url);
  const {
    onMessage, onConnect, onDisconnect, onError,
  } = { ...DEFAULT_OPTIONS, ...options };

  ws.onclose = () => {
    onDisconnect();
    try {
      setTimeout(() => {
        new WS(url, options); // eslint-disable-line no-new
      }, 1000);
    } catch (e) {
      //  DO nothing
    }
  };
  ws.onmessage = (evt) => {
    if (evt.data.length) {
      onMessage(unmarshal(evt.data));
    }
  };

  ws.onopen = onConnect;
  ws.onerror = onError;

  this.ws = ws;
}

WS.prototype = {
  subscribe(...channels) {
    this.ws.send(marshal({
      action: 'subscribe',
      args: channels,
    }));
  },
  unsubscribe(...channels) {
    this.ws.send(marshal({
      action: 'unsubscribe',
      args: channels,
    }));
  },
};
