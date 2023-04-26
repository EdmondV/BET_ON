import { store } from '../../../../app';

export function Ticker(data = []) {
  this.data = data;
  this.timer = null;
  this.lastTs = 0;
}

Ticker.prototype = {
  data: [],

  ticker(assetTs = null) {
    if (!assetTs) {
      const asset = this.data[0] ? this.data[0] : null;
      this.data = this.data.length ? this.data.slice(1, this.data.length) : [...this.data];

      return asset;
    }

    const asset = this.data.find((a) => a.timestamp === assetTs);
    this.data = asset ? this.data.filter((a) => a.timestamp > assetTs) : [...this.data];

    return asset;
  },

  startFrom(from = null) {
    if (from) {
      this.lastTs = from;
      const index = this.data.findIndex((d) => d.timestamp === from);
      this.data = this.data.length && index !== -1 ? this.data.slice(index, this.data.length) : [...this.data];
    }

    // this.timer = setInterval(() => {
    //   const asset = this.ticker();
    //   if (!asset) {
    //     this.pause();
    //   } else {
    //     store.dispatch({ type: 'TICKER_TICK', payload: asset });
    //   }
    // }, 1000);
  },

  tick(lastTs) {
    const asset = this.ticker(lastTs * 1000);
    // console.log('tick value', lastTs * 1000);
    if (!asset) {
      this.pause();
    } else if (this.lastTs < lastTs && asset) {
      this.lastTs = lastTs;
      store.dispatch({ type: 'TICKER_TICK', payload: asset });
    }
  },

  pause() {
    clearInterval(this.timer);
  },

  getData() {
    return this.data;
  },
};
