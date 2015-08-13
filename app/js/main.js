'use strict';

var angular = require('angular');
require('angular-route/angular-route'); //ngRoute
require('angular-css'); // door3.css
require('angular-material'); // ngMaterial
require('angular-resource'); // ngResource
require('angular-messages'); // ngMessages

var requires = [
    'ngRoute',
    'door3.css',
    'ngMaterial',
    'ngResource',
    'ngMessages'
];

angular
    .module('app', requires)
    .config(['$routeProvider', require('./config')]);

// index.html controllers
require('./common/menu.left.js');
require('./common/menu.top.js');

// common directives
require('./common/converter.date.js');