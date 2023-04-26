
import { login } from 'utils/tests';

describe('Main page', () => {
  const nightmare = login(true);
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // eslint-disable-line

  it('opens chat', () => {
    expect.assertions(1);
    return nightmare
      .viewport(1200, 1200)
      .wait(1000)
      .wait('div[class="chatButton"]')
      .click('div[class="chatButton"]') // open chat panel
      .wait(1000)
      .wait('div[class="message"]')
      .insert('div[class="message"]', 'test message')
      .evaluate(() => document.querySelector('div[class="message"]').innerText)
      .then((message) => {
        expect(message).toEqual('test message');
      });
  });

  it('should not send a message to chat unless a bet was made', () => {
    expect.assertions(1);
    return nightmare
      .wait('button[class^="ChatForm__SendIcon"]')
      .click('button[class^="ChatForm__SendIcon"]')
      .wait(1000)
      .evaluate(() => document.querySelector('div[class^="ChatMessageStyles__StyledMessage"]'))
      .then((message) => {
        expect(message).toEqual(null);
      });
  });

  it('should make bet from expanded bets panel', () => {
    expect.assertions(1);

    return nightmare
      .wait(3000)
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="rooms"]')
      .click('div[class^="LeftPanel__StyledAsideLink"][name="rooms"]') // open rooms panel
      .wait('div[class^="RoomPreviewStyles__RoomPreviewWrapper"]') // successful open rooms panel
      .wait('button[class*="__ButtonWrapper-"]')
      .click('button[class*="__ButtonWrapper-"]') // make bet
      .wait('div[class^="RoomTabStyles__TabContent"]')
      .evaluate(() => document.querySelectorAll('div[class^="RoomTabStyles__TabContent"]').length)
      .then((tabs) => {
        expect(tabs).toEqual(1);
      });
  });

  it('should send a message to chat if a bet was made', () => {
    expect.assertions(2);
    return nightmare
      .wait(2000)
      .wait('button[class^="ChatForm__SendIcon"]')
      .click('button[class^="ChatForm__SendIcon"]')
      .wait(2000)
      .evaluate(() => ({
        name: document.querySelector('div[class^="ChatMessageStyles__MessageUsername"]').innerHTML,
        message: document.querySelector('div[class^="ChatMessageStyles__MessageBody"]').innerHTML,
      }))
      .then(({ name, message }) => {
        expect(name).toEqual('test');
        expect(message).toEqual('test message');
      });
  });

  // it('closes chat panel', () => {
  //   expect.assertions(1);
  //   return nightmare
  //     .wait('div[class^="HeaderChart__ChatIcon"]')
  //     .click('div[class^="HeaderChart__ChatIcon"]') // open chat panel
  //     .wait(1000)
  //     .evaluate(() => {
  //       const position = document
  //         .querySelector('div[class^="ChatPanel__ChatWrapper"]')
  //         .getBoundingClientRect().right;
  //       return position;
  //     })
  //     .then((right) => {
  //       expect(right).toEqual(1480); // viewport width (1200) + panel width 280
  //     });
  // });

  it('should make bet from collapsed view', () => {
    expect.assertions(1);
    return nightmare
      .wait(1000)
      .wait('div[class^="IconToggleView__IconWrapper"]')
      .click('div[class^="IconToggleView__IconWrapper"] div div')
      .wait('div[class^="RoomPreviewStyles__Triangle"]')
      .click('div[class^="RoomPreviewStyles__Triangle"]') // click on bet button
      .wait('div[class^="NoticeBet__StyledButtonWrapper"] button')
      .click('div[class^="NoticeBet__StyledButtonWrapper"] button') // click on confirm
      .wait(3000)
      .end()
      .evaluate(() => document.querySelectorAll('div[class^="RoomTabStyles__TabContent"]').length)
      .then((tabs) => {
        expect(tabs).toEqual(2);
      });
  });
});
