'use strict';

var angular = require('angular');
require('angular-route/angular-route'); //ngRoute
require('angular-css'); // door3.css
require('angular-material'); // ngMaterial
require('angular-resource'); // ngResource
require('angular-messages'); // ngMessages
require('angular-translate'); // pascalprecht.translate

var requires = [
    'ngRoute',
    'door3.css',
    'ngMaterial',
    'ngResource',
    'ngMessages',
    'pascalprecht.translate'
];

var app = angular.module('app', requires);

// services
require('./modules/patient/patient.service.js'); // Patient
require('./common/system.config.js'); // SystemConfig

// directives
require('./common/converter.date.js');

// index.html controllers
require('./modules/navigation/left.menu.js');
require('./modules/navigation/top.bar.js');

// configuration
app.config(['$routeProvider', '$translateProvider', '$mdThemingProvider', 'SystemConfigProvider', require('./config')]);