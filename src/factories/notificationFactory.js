import {
  GENERIC_API_ERROR,
  GENERIC_FRONTEND_ERROR,
} from '@/store/mutationsConsts';

import store from '@/store/store';

const defaultNotification = {
  message: 'short text for the user',
  details: 'the full error text',
  stack: 'the Stack Trace',
  color: 'success',
  icon: 'check_circle',
  timeout: 4000,
  y: 'top', // 'top' or 'bottom'
  x: null, // 'right' or 'left'
}
export function successMessage(message, details) {
  const notification = defaultNotification;
  notification.message = message;
  notification.details = details;
  return notification;
}

export function errorMessage(message, details, stack) {
  const notification = defaultNotification;
  notification.message = message;
  notification.details = details;
  notification.stack = stack;
  notification.color = 'error';
  notification.icon = 'error';
  notification.timeout = 8000;
  return notification;
}

export function warningMessage(message, details) {
  const notification = defaultNotification;
  notification.message = message;
  notification.details = details;
  notification.color = 'warning';
  notification.icon = 'warning';
  notification.timeout = 6000;
  return notification;
}

function genericMessage (status) {
  switch (status) {
    case 400:
      return "Client tried to execute a function with wrong parameters";
    case 401:
      return "Not authorized";
    // case 422:
    //   return "Unprosomething entity";
    case 403:
      return "Access denied";
    case 404:
      return "Could not find the requested resource";
    case 405:
      return "Client tried to execute an unkown function";
    case 408:
      return "Timeout! Ups no answer from the internet? Check your internet connection and if it persits report this error.";
    default:
      return "An unknown Error occured please report to the envidat team (envidat@wsl.ch)";
  }
}

export function handleGenericAPIError (reason) {
  // const errorStatus = error ? error.status : error;
  // const errorMessage = genericMessage(errorStatus);

  let errObj = errorMessage(reason);

  if (reason.response) {
    const status = reason.response.status + ' ' + reason.response.statusText;
    const message = genericMessage(reason.response.status);
    const details = reason.request.responseURL;
    errObj = errorMessage(message, status + ' ' + details, reason.response.stack);
  }

  store.commit(GENERIC_FRONTEND_ERROR, errObj);
}

export function handleGenericError (msg, details, stack) {
  const errObj = errorMessage(msg, details, stack);

  store.commit(GENERIC_FRONTEND_ERROR, errObj);
}
