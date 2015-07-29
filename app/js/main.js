require('angular/angular');
require('angular-route/angular-route'); //ngRoute
require('angular-css'); // door3.css
require('angular-material'); // ngMaterial

var requires = [
    'ngRoute',
    'door3.css',
    'ngMaterial'
];

var app = angular.module('app', requires).config(['$routeProvider', require('./routes')]);

app.controller('TopMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/topMenu.js')]);
app.controller('LeftMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/leftMenu.js')]);

// mount on window for testing
window.app = app;

