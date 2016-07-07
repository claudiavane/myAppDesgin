angular.module('ServiceMan')

.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    notFound: 'auth-not-found',
    noConnection: 'err-no-connection',
    serverError: 'server-error',
    definedError: 'defined-error',
})


.constant('APP_PARAMS', {
    url_mj: 'http://192.168.1.239:38080/mj-core',
    date_format: 'MM/dd/yyyy',
    datetime_format: 'MM/dd/yyyy HH:mm',
    client_key: 'mj123',
    button_dialog: 'button-dark',
    button_dialog_cancel: 'button-stable',
    demo_mode: true,
});