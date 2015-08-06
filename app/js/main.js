'use strict';

var angular = require('angular');
require('angular-route/angular-route'); //ngRoute
require('angular-css'); // door3.css
require('angular-material'); // ngMaterial
require('angular-resource'); // ngResource

var requires = [
    'ngRoute',
    'door3.css',
    'ngMaterial',
    'ngResource'
];

var app = angular.module('app', requires).config(['$routeProvider', require('./routes')]);

app.controller('TopMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/topMenu.js')]);
app.controller('LeftMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/leftMenu.js')]);

// mount on window for testing
window.app = app;
