'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.controller('LeftMenuController', ['$scope', '$location', '$mdSidenav', function ($scope, $location, $mdSidenav) {
    $scope.navigateTo = function (to) {
        $location.path(to);
        $mdSidenav('left').toggle();
    };
}]);


