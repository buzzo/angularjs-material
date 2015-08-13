'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.controller('TopMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', function ($scope, $location, $mdSidenav, $mdUtil) {
    $scope.toggleLeftNav = $mdUtil.debounce(function () {
        $mdSidenav('left').toggle();
    }, 100);

    $scope.navigateTo = function (to) {
        $location.path(to);
    };
}]);


