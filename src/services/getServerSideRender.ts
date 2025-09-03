import { CONSTANTS } from '@/config/constant';
import { KEYS } from '@/config/key';

export async function serverRequest(request: any, url: string, methodName: string) {
  var requestHeaders = await getHeader(url, request);
  var response = null;
  if (methodName === CONSTANTS.REQUEST_GET) {
    response = await fetch(url, {
      method: methodName,
      headers: requestHeaders,
      cache: "no-store",
    });
  } else {
    response = await fetch(url, {
      method: methodName,
      headers: requestHeaders,
      body: JSON.stringify(request),
    });
  }
  const json = await response.json();
  if (
    json &&
    json?.errors &&
    json.errors.length > 0 &&
    json?.errors[0]?.message
  ) {
  }
  return json;
}

export async function getHeader(url: string, request: any) {
  const headers: any = {};
  headers[KEYS.CONTENT_TYPE] = CONSTANTS.REQUEST_FORMAT;
  headers[KEYS.ACCEPT_TYPE] = CONSTANTS.RESPONSE_FORMAT;
  headers[KEYS.ACCEPT_LANGUAGE] = CONSTANTS.LANGUAGE_ENGLISH;
  headers[KEYS.X_AUTHORIZATION_TOKEN] = CONSTANTS.X_AUTHORIZATION_TOKEN;
  headers[KEYS.X_NETWORK_GUID] = CONSTANTS.X_NETWORK_GUID;

  return headers;
}