import Xvfb from 'xvfb';

// todo bootsrap login here


// needs to run only on linux servers
const xvfb = new Xvfb({
  silent: true,
});
xvfb.startSync();

jest.mock('./facade');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

console.warn = jest.genMockFunction(); // eslint-disable-line
