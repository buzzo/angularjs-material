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

var app = angular.module('app', requires).config(['$routeProvider', require('./config')]);

app.controller('TopMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/topMenu.js')]);
app.controller('LeftMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', require('./modules/main/leftMenu.js')]);

// mount on window for testing
window.app = app;

// TODO: place this inside a file
// general purpose directive to convert yyyy-MM-dd string to Date and back
// http://stackoverflow.com/questions/11616636/how-to-do-two-way-filtering-in-angular-js
app.directive('dateconverter', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {

            function fromUser(text) {
                if (text) {
                    return text.toString("yyyy-MM-dd");
                } else {
                    return '';
                }
            }

            function toUser(text) {
                if (text) {
                    return new Date(text);
                } else {
                    return text;
                }
            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});