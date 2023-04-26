import { round } from '../app/utils/math';

export default class Scenario {
  constructor(initial) {
    this.currentFrame = 0;
    this.frames = [initial];
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  addAssetValue(timestamp, value, name = 'rawData') {
    this.frames.push({
      ...this.frames[this.currentFrame],
      [name]: [...this.frames[this.currentFrame][name], { timestamp, value: round(value, this.frames[this.currentFrame].room.assetDecimals) }],
    });

    this.currentFrame += 1;
  }
}
