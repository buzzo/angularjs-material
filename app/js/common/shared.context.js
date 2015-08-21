'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.factory('SharedContext', function () {
    var context = {title: ''};
    return context;
});
