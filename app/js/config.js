'use strict';

var fs = require('fs');

module.exports = function ($routeProvider, $translateProvider, $mdThemingProvider, SystemConfigProvider) {
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
            controller: ['$scope', '$rootScope', '$mdDialog', '$translate', require('./modules/account/account.js')],
            template: fs.readFileSync(__dirname + '/modules/account/account.html', 'utf-8'),
            css: require('./modules/account/account.css')
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    // i18n
    var languages = SystemConfigProvider.$get().languages;
    languages.available.forEach(function (language) {
        $translateProvider.translations(language.locale, language.content);
    });
    $translateProvider.preferredLanguage(languages.preferred);
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
