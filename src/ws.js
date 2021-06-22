export default class CryptoTicker {
  constructor(wssUrl, pairs, cb) {
    this.wssUrl = wssUrl;
    this.pairs = pairs;
    this.cb = cb;
    this.subscribedPairs = {};

    // open new WebSocket connection
    this.ws = new WebSocket(this.wssUrl);

    this.ws.onopen = () => {
      // loop over all coin pairsand subscribe to ticker WS channel for each
      this.pairs.forEach((pair) => this.subscribeToChannel(pair));
    };

    // on every WebSocket message call parseChanelResponse
    // with message received
    this.ws.onmessage = this.parseChanelResponse;
  }

  subscribeToChannel = (pair) => {
    this.ws.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        pair: pair,
      }),
    );
  };

  parseChanelResponse = (message) => {
    // parse the json data
    const response = JSON.parse(message.data);

    if (response.event === "subscribed") {
      this.subscribedPairs[response.chanId] = {
        channelID: response.chanId,
        pair: response.pair,
      };
    }

    // ignore messages that not contain data
    if (response.length === 11) {
      const channelID = response[0];

      this.subscribedPairs[channelID].dailyChange = response[6];
      this.subscribedPairs[channelID].last = response[7];
      this.subscribedPairs[channelID].volume = response[8];

      this.cb({ ...this.subscribedPairs });
    }
  };

  getPairs = () => {
    return this.subscribedPairs;
  };
}
