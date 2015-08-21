'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.controller('TopBarController', ['$scope', '$location', '$mdSidenav', '$mdUtil', 'SharedContext', function ($scope, $location, $mdSidenav, $mdUtil, SharedContext) {
    $scope.context = SharedContext;
    $scope.toggleLeftNav = $mdUtil.debounce(function () {
        $mdSidenav('left').toggle();
    }, 100);
}]);


