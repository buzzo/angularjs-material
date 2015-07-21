'use strict';

var fs = require('fs');

module.exports = function ($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            controller: ['$scope', require('./modules/dashboard/dashboard.js')],
            template: fs.readFileSync(__dirname + '/modules/dashboard/dashboard.html'),
            css: require('./modules/dashboard/dashboard.css')
        })
        .when('/security', {
            controller: ['$scope', require('./modules/security/security.js')],
            template: fs.readFileSync(__dirname + '/modules/security/security.html'),
            css: require('./modules/security/security.css')
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
};
