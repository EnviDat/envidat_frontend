const defaultNotification = {
    message: 'short text for the user',
    details: 'the full error text',
    stack: 'the Stack Trace',
    color: 'success',
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
    notification.timeout = 8000;
    return notification;
}

export function warningMessage(message, details) {
    const notification = defaultNotification;
    notification.message = message;
    notification.details = details;
    notification.color = 'warning';
    notification.timeout = 6000;
    return notification;
}