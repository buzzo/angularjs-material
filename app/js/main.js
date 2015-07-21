require('angular/angular');
require('angular-route/angular-route');
require('angular-css');

// door3.css is from angular-css (adding style 'css' per route)
var requires = [
    'ngRoute',
    'door3.css'
];

// mount on window for testing
window.app = angular.module('app', requires).config(['$routeProvider', require('./routes')]);
