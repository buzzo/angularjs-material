'use strict';

require('./modules/patient/patient.service.js'); // Patient

var fs = require('fs');

module.exports = function ($routeProvider) {
    // route
    $routeProvider
        .when('/dashboard', {
            controller: ['$scope', require('./modules/dashboard/dashboard.js')],
            template: fs.readFileSync(__dirname + '/modules/dashboard/dashboard.html'),
            css: require('./modules/dashboard/dashboard.css')
        })
        .when('/patient', {
            controller: ['$scope', '$mdDialog', '$mdToast', 'Patient', require('./modules/patient/patient.js')],
            template: fs.readFileSync(__dirname + '/modules/patient/patient.html'),
            css: require('./modules/patient/patient.css')
        })
        .when('/account', {
            controller: ['$scope', require('./modules/account/account.js')],
            template: fs.readFileSync(__dirname + '/modules/account/account.html'),
            css: require('./modules/account/account.css')
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
};
