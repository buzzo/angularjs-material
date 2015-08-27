'use strict';

var fs = require('fs');

module.exports = function ($routeProvider, $translateProvider, $mdThemingProvider) {

    // route
    $routeProvider
        .when('/dashboard', {
            controller: ['$scope', '$rootScope', '$translate', require('./modules/dashboard/dashboard.js')],
            template: fs.readFileSync(__dirname + '/modules/dashboard/dashboard.html', 'utf-8'),
            css: require('./modules/dashboard/dashboard.css')
        })
        .when('/patient', {
            controller: ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$translate', 'Patient', require('./modules/patient/patient.js')],
            template: fs.readFileSync(__dirname + '/modules/patient/patient.html', 'utf-8'),
            css: require('./modules/patient/patient.css')
        })
        .when('/account', {
            controller: ['$scope', '$rootScope', '$translate', require('./modules/account/account.js')],
            template: fs.readFileSync(__dirname + '/modules/account/account.html', 'utf-8'),
            css: require('./modules/account/account.css')
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    // i18n
    $translateProvider.translations('en-us', require('./locales/en-us.json'));
    $translateProvider.translations('pt-br', require('./locales/pt-br.json'));
    $translateProvider.preferredLanguage('pt-br');
    // theme
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        }).accentPalette('pink');
    $mdThemingProvider.theme('input', 'default').primaryPalette('grey');
};
