'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.factory('Patient', ['$resource', function ($resource) {
    return $resource('/services/patients/:id', {id: '@_id'}, {
        update: {
            method: 'PUT'
        }
    });
}]);
