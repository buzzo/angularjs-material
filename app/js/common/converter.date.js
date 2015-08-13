'use strict';

var angular = require('angular');
var app = angular.module('app');

// general purpose directive to convert yyyy-MM-dd string to Date and back
// http://stackoverflow.com/questions/11616636/how-to-do-two-way-filtering-in-angular-js
module.exports = app.directive('dateconverter', function () {
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
