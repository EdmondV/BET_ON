import {
  login,
} from 'utils/tests';
import messages from '../messages';

describe('Left panel', () => {
  const nightmare = login();
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // eslint-disable-line

  it('should open history panel', () => { // eslint-disable-line
    return nightmare
      .wait(2000)
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="history"]')
      .wait(300)
      .click('div[class^="LeftPanel__StyledAsideLink"][name="history"]') // open rooms panel
      .wait('h2[class^="LeftPanelHeaderStyles__AsideTitle"]')
      .evaluate(() => document.querySelector('h2[class^="LeftPanelHeaderStyles__AsideTitle"]').innerHTML)
      .then((closedWrapper) => {
        expect(closedWrapper).toContain(messages.history_rooms.defaultMessage);
      });
  });

  it('should open account panel', () => { // eslint-disable-line
    return nightmare
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .wait(300)
      .click('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .wait('#logout button')
      .evaluate(() => document.querySelector('#logout button').innerHTML)
      .then((demoButton) => {
        expect(demoButton).toContain(messages.logout.defaultMessage);
      });
  });

  it('should open leaders panel', () => { // eslint-disable-line
    return nightmare
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="leaders"]')
      .wait(300)
      .click('div[class^="LeftPanel__StyledAsideLink"][name="leaders"]')
      .wait('h2[class^="LeftPanelHeaderStyles__AsideTitle-"]')
      .evaluate(() => document.querySelector('h2[class^="LeftPanelHeaderStyles__AsideTitle-"]').innerHTML)
      .then((avatarWrapper) => {
        expect(avatarWrapper).toContain(messages.leaders.defaultMessage);
      });
  });

  it('should open feedback panel', () => { // eslint-disable-line
    return nightmare
    .wait('div[class^="LeftPanel__StyledAsideLink"][name="feedback"]')
    .wait(300)
    .click('div[class^="LeftPanel__StyledAsideLink"][name="feedback"]')
    .wait('textarea#feedback_input')
    .insert('textarea#feedback_input', 'noreply@noreply')
    .click('button[class^="FeedbackStyles__StyledButton"]')
    .wait('.notifications-wrapper .notification-message')
    .evaluate(() => document.querySelector('.notifications-wrapper .notification-message').innerHTML)
    .then((notification) => {
      expect(notification).toContain('Thanks for the feedback. Your message was sent');
    });
  });

  it('should open rooms panel', () => { // eslint-disable-line
    expect.assertions(1);
    return nightmare
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="rooms"]')
      .wait(300)
      .click('div[class^="LeftPanel__StyledAsideLink"][name="rooms"]') // open rooms panel
      .wait('h2[class^="LeftPanelHeaderStyles__AsideTitle-"]')
      .wait(300)
      .evaluate(() => document.querySelector('h2[class^="LeftPanelHeaderStyles__AsideTitle-"]').innerHTML)
      .then((betWrapper) => {
        expect(betWrapper).toContain(messages.available_rooms.defaultMessage);
      });
  });

  // let title = '';
  it('has rooms', () => {
    expect.assertions(1);
    return nightmare
      .wait(2000)
      .end()
      .evaluate(() => document.querySelector('div[class^="RoomPreviewStyles__RoomPreviewWrapper-"] .title').innerHTML)
      .then((t) => {
        expect(t).not.toEqual(null);
        // title = t;
      });
  });

  // it('searches for rooms by title', () => { // eslint-disable-line
  //   const titleSelector = 'div[class^="RoomPreviewStyles__RoomPreviewWrapper-"] .title';
  //   return nightmare
  //     .wait('div[class^="SearchInput__"]')
  //     .insert('div[class^="SearchInput__"] input', title)
  //     .wait('div[class^="RoomPreviewStyles__RoomPreviewWrapper-"]')
  //     .wait(5000)
  //     .evaluate(() => Array
  //       .from(document.querySelectorAll(titleSelector))
  //       .map((element) => element.innerText))
  //     .end()
  //     .then((titles) => titles.map((t) => expect(t).toContain(title)));
  // });
});
