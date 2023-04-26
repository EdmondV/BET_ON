import Config from 'config.dev.json';
import { ROOM_CREATE_URL } from 'utils/redirects';

import {
  login,
  goToCreateRoom,
} from 'utils/tests';

describe('Create room page', () => {
  const nightmare = login();

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // eslint-disable-line
  });

  it('opens create room page and has default 1 dollar bet', () => {
    expect.assertions(1);

    // TODO: pick different asset, timeframe, click +/-, try empty bet
    return goToCreateRoom(nightmare)
      .evaluate(() => document.querySelector('input[name="bet"]').value)
      .then((amountInput) => {
        expect(amountInput).toContain('$1');
      });
  });

  it('filters user input for bet amount', () => {
    expect.assertions(1);
    return nightmare
      .type('input[name="bet"]', '$$1ASDASD$$')
      .evaluate(() => document.querySelector('input[name="bet"]').value)
      .then((amountInput) => {
        expect(amountInput).toContain('$11'); // value is appended to the original $1
      });
  });

  it('adds $5 on + button click', () => {
    expect.assertions(1);
    return nightmare
      .click('div[value="increment"]')
      .evaluate(() => document.querySelector('input[name="bet"]').value)
      .then((amountInput) => {
        expect(amountInput).toContain('$16');
      });
  });

  it('subtracts $5 on - button click', () => {
    expect.assertions(1);
    return nightmare
      .click('div[value="decrement"]')
      .evaluate(() => document.querySelector('input[name="bet"]').value)
      .then((amountInput) => {
        expect(amountInput).toContain('$11');
      });
  });

  it('allows to select a different asset', () => {
    expect.assertions(2);
    return nightmare
      .click('div[class^="SelectInput__InputWrapper"]')
      .wait('div[class^="SelectInput__StyledOption-"]:nth-child(2)')
      .click('div[class^="SelectInput__StyledOption-"]:nth-child(2)')
      .evaluate(() => document.querySelector('input[name="asset"]').value)
      .then((timeframe) => {
        expect(timeframe).toEqual('USDJPY');
        expect(timeframe).not.toEqual('EURUSD');
      });
  });

  it('allows to select a different timeframe', () => {
    expect.assertions(2);
    return nightmare
      .click('div[class^="PeriodsList__InputWrapper"]')
      .wait('div[class^="PeriodsList__StyledOption-"]:first-child')
      .click('div[class^="PeriodsList__StyledOption-"]:first-child')
      .evaluate(() => document.querySelector('input[name="expired"]').value)
      .then((timeframe) => {
        expect(timeframe).toEqual('1m');
        expect(timeframe).not.toEqual('3m');
      });
  });

  it('does not allow user to create a room without a proper name', () => {
    expect.assertions(1);
    return nightmare
      .wait('input[name="title"]')
      .type('input[name="title"]', '')
      .click('button[class^="ButtonBull__ButtonWrapper"]')
      .wait(2000)
      .end()
      .url()
      .then((url) => {
        expect(url).toEqual(`${Config.baseUrl}${ROOM_CREATE_URL}`); // there should be no room created
      });
  });
});
