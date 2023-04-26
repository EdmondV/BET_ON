import 'whatwg-fetch';
import queryString from 'query-string';
import Cookies from 'js-cookie';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return (response && response.json) ? response.json() : response;
}

export const API_URL = process.env.API_URL;

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (!response || !response.status || response.status === 401) {
    // logout();
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  console.log(error); // eslint-disable-line
  error.response = response;
  throw error;
}

const isMultipartFormdata = (type) => type === 'multipart/form-data';

export function post(url, body, contentType = 'application/json') {
  const headers = {
    Authorization: `Bearer ${Cookies.get('session')}`,
  };

  // we need to avoid setting content-type if multipart/form-data
  // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
  if (!isMultipartFormdata(contentType)) {
    headers['Content-Type'] = contentType;
  }

  return request(url, {
    method: 'POST',
    headers,
    body: !isMultipartFormdata(contentType) ? JSON.stringify(body) : body,
  }, isMultipartFormdata(contentType));
}

export function put(url, body) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('session')}`,
    },
    body: JSON.stringify(body),
  });
}

export function get(url, params = null, contentType = 'application/json') {
  const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;

  const req = request(requestUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${Cookies.get('session')}`,
    },
  });
  return req;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param {bool} multipart    if data is multipart/form-data
 *
 * @return {object}           The response data
 */
export default function request(url, options, multipart = false) {
  const req = fetch(url, options)
    .then(checkStatus);

  if (options.headers['Content-Type'] !== 'application/json' && !multipart) {
    return req;
  }

  return req.then(parseJSON);
}
