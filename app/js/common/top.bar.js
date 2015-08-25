'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.controller('TopBarController', ['$scope', '$rootScope', '$location', '$mdSidenav', '$mdUtil',
    function ($scope, $rootScope, $location, $mdSidenav, $mdUtil) {

        $scope.toggleLeftNav = $mdUtil.debounce(function () {
            $mdSidenav('left').toggle();
        }, 100);

        // receives title change from content region
        $scope.$on('title', function (event, data) {
            $scope.title = data;
        });

        // sends the search word down to relevant region
        $scope.query = function () {
            $rootScope.$broadcast('search', $scope.search);
        };

    }]);


