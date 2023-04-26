import Nightmare from 'nightmare';
import Config from 'config.dev.json';

const realUser = 'test@test.test';
const realPassword = '123123';

function login(show = false, user = realUser, password = realPassword) {
  const nightmare = new Nightmare({
    show,
    webPreferences: {
      partition: 'shared-login',
    },
  });
  const url = nightmare
    .goto(Config.baseUrl) // will redirect to main
    .wait('input[name="email"]')
    .type('input[name="email"]', user) // login, should be real
    .type('input[name="password"]', password) // login, should be real
    .click('button[class^="StyledButton__StyledButtonInner-"]')
    .wait(2000)
    .url();

  if (url === Config.baseUrl) {
    return signup(nightmare, user, password);
  }
  return nightmare;
}

function goToCreateRoom(nightmare) {
  return nightmare
    .wait('button[class^="NewRoom"]')
    .wait(3000)
    .click('button[class^="NewRoom"]')
    .wait('div[class^="PeriodsList__InputWrapper"]');
}

function signup(nightmare, username, password) {
  return nightmare
      .goto(Config.baseUrl)
      .wait('a[href="/registration"]')
      .click('a[href="/registration"]')
      .type('input[name="email"]', username)
      .type('input[name="username"]', username)
      .type('input[name="password"]', password)
      .click('button[class^="StyledButton__StyledButtonInner-"]')
      .wait('button[class^="NewRoom"]');
}

export {
  realUser,
  realPassword,
  goToCreateRoom,
  login,
  signup,
};
