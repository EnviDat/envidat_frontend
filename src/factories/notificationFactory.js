import {
  ADD_USER_NOTIFICATION,
} from '@/store/mutationsConsts';

import store from '@/store/store';

function defaultNotification() {
  return {
    message: 'short text for the user',
    details: 'the full error text',
    stack: 'the Stack Trace',
    color: 'success',
    icon: 'check_circle',
    type: 'info',
    timeout: 4000,
    show: true,
  };
}
export function successMessage(message, details) {
  const notification = defaultNotification();
  notification.message = message;
  notification.details = details;
  return notification;
}

export function errorMessage(message, details, stack) {
  const notification = defaultNotification();
  notification.message = message;
  notification.details = details;
  notification.stack = stack;
  notification.color = 'error';
  notification.icon = 'error';
  notification.type = 'error';
  notification.timeout = 8000;
  return notification;
}

export function warningMessage(message, details) {
  const notification = defaultNotification();
  notification.message = message;
  notification.details = details;
  notification.color = 'warning';
  notification.icon = 'warning';
  notification.type = 'warning';
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

export function getSpecificApiError(details, reason) {
  let errObj = errorMessage(reason, details);

  if (reason.response) {
    const status = reason.response.status + ' ' + reason.response.statusText;
    details += '\n' + reason.request.responseURL;
    errObj = errorMessage(status, details, reason.response.stack);
  }

  return errObj;
}

export function getGenericApiError(reason) {
  let errObj = errorMessage(reason);

  if (reason.response) {
    const status = reason.response.status + ' ' + reason.response.statusText;
    const message = genericMessage(reason.response.status);
    const details = reason.request.responseURL;
    errObj = errorMessage(message, status + ' ' + details, reason.response.stack);
  }

  return errObj;
}

export function handleGenericAPIError (reason) {
  let errObj = getGenericApiError(reason);

  store.commit(ADD_USER_NOTIFICATION, errObj);
}

export function handleGenericError (msg, details, stack) {
  const errObj = errorMessage(msg, details, stack);

  store.commit(ADD_USER_NOTIFICATION, errObj);
}
