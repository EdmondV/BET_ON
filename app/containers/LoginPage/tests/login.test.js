
import Nightmare from 'nightmare';
import Config from 'config.dev.json';
import {
  signup,
} from 'utils/tests';

const randomName = `${Math.round(Math.random() * 100000000)}@test.com`;
const randomPassword = Math.round(Math.random() * 100000000);
const password = '123456';

describe('Login page', () => {
  const nightmare = new Nightmare();
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000; // eslint-disable-line

  it('should redirect to game and have new room button on demo button click', () => {
    expect.assertions(1);
    return nightmare
      .goto(Config.baseUrl) // demo signup does not work @localhost
      .wait('.demo button')
      .click('.demo button')
      .wait('button[class^="NewRoom"]')
      .evaluate(() => document.querySelector('button[class^="NewRoom"]').innerHTML)
      .then((newRoomButton) => {
        expect(newRoomButton).toContain('New');
      });
  });

  it('shows popup to demo user before logout', () => {
    expect.assertions(1);
    return nightmare
      .wait(2000)
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .click('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .wait('#logout button')
      .click('#logout button')
      .wait('div[class^="DemoUserPopup__"] button')
      .click('div[class^="DemoUserPopup__"] div[class^="Wrapper"]:nth-child(2) button')
      .wait('.demo button')
      .evaluate(() => document.querySelector('.demo button').innerHTML)
      .then((demoButton) => {
        expect(demoButton).toContain('Play demo');
      });
  });

  it('sign in with wrong data', () => {
    expect.assertions(1);
    return nightmare
        .wait('input[name="email"]')
        .type('input[name="email"]', randomName) // login, should be real
        .type('input[name="password"]', randomPassword) // login, should be real
        .click('button[class^="StyledButton__StyledButtonInner-"]')
        .wait(2000)
        .wait('.notifications-wrapper .notification-message')
        .click('.notifications-wrapper')
        // .screenshot('signInWrongCredentials.png')
        .evaluate(() => document.querySelector('.notifications-wrapper .notification-message').innerHTML)
        .then((notification) => {
          expect(notification).toContain('Wrong password or email');
        });
  });

  it('recovers password with wrong data', () => {
    expect.assertions(1);
    return nightmare
        .goto(Config.baseUrl)
        .wait('a[href="/forgot-password"]')
        .click('a[href="/forgot-password"]')
        .type('input[name="email"]', randomName)
        .click('button[class^="StyledButton__StyledButtonInner-"]')
        .wait('.notifications-wrapper .notification-message')
        .click('.notifications-wrapper')
        .evaluate(() => document.querySelector('.notifications-wrapper .notification-message').innerHTML)
        .then((notification) => {
          expect(notification).toContain('Wrong password or email');
        });
  });

  it('sends feedback', () => {
    expect.assertions(1);
    return nightmare
      .goto(Config.baseUrl)
      .wait('a[href="/feedback"]')
      .click('a[href="/feedback"]')
      .wait('a[href="/"]')
      .type('input[name="email"]', randomName)
      .type('textarea[name="message"]', randomName)
      .click('button[class^="StyledButton__StyledButtonInner-"]')
      .wait('div[class^="NoticeFeedback__NoticeWrapper"]')
      // .screenshot('feedback.png')
      .evaluate(() => document.querySelector('div[class^="NoticeFeedback__NoticeWrapper"]').innerHTML)
      .then((notification) => {
        expect(notification).toContain('Your message sent');
      });
  });

  it('should sign up a new user', () => {
    expect.assertions(1);
    return signup(nightmare, randomName, password)
      .evaluate(() => document.querySelector('button[class^="NewRoom"]').innerHTML)
      .then((newRoomButton) => {
        expect(newRoomButton).toContain('New');
      });
  });

  it('should sign out', () => {
    expect.assertions(1);
    return nightmare
      .wait('div[class^="Header__AvatarWrapper"]')
      .click('div[class^="Header__AvatarWrapper"]')
      .wait('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .click('div[class^="LeftPanel__StyledAsideLink"][name="account"]')
      .wait('#logout button')
      .click('#logout button')
      .wait('.demo button')
      .evaluate(() => document.querySelector('.demo button').innerHTML)
      .then((demoButton) => {
        expect(demoButton).toContain('Play demo');
      });
  });

  it('should redirect unauthorized user to login page', () => {
    expect.assertions(1);
    return nightmare
      .goto(`${Config.baseUrl}/room/new`)
      .wait(2000)
      .url()
      .then((url) => {
        expect(url).toContain(Config.baseUrl);
      });
  });

  it('should login and redirect user to the page he tried to access before login', () => {
    expect.assertions(1);
    return nightmare
      .wait('input[name="email"]')
      .type('input[name="email"]', randomName)
      .type('input[name="password"]', password)
      .click('button[class^="StyledButton__StyledButtonInner-"]')
      .wait('div[class^="Header__AvatarWrapper"]')
      .wait(1000)
      .end()
      .url()
      .then((url) => {
        expect(url).toEqual(`${Config.baseUrl}/room/new`);
      });
  });

  it('recovers password', () => {
    expect.assertions(1);
    const n = new Nightmare();
    return n
      .goto(Config.baseUrl)
      .wait('a[href="/forgot-password"]')
      .click('a[href="/forgot-password"]')
      .type('input[name="email"]', randomName)
      .click('button[class^="StyledButton__StyledButtonInner-"]')
      .wait('div[class^="SuccessRestore__SuccessWrapper"]')
      .end()
      .evaluate(() => document.querySelector('div[class^="SuccessRestore__SuccessWrapper"]').innerHTML)
      .then((notification) => {
        expect(notification).toContain('Password recovery information has been successfully sent to your email');
      });
  });

  it('should have faq text', () => {
    expect.assertions(1);
    const n2 = new Nightmare();
    return n2
      .goto(Config.baseUrl)
      .wait('a[href="/feedback"]')
      .click('a[href="/feedback"]')
      .wait('div[class^="InfoBlock__FAQInfo"]')
      .visible('div[class^="InfoBlock__FAQInfo"] li')
      .end()
      .then((li) => {
        expect(li).toEqual(true);
      });
  });
});
