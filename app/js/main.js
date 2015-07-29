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

// top menu
app.controller('TopMenuController', ['$scope', '$location', '$mdSidenav', '$mdUtil', function ($scope, $location, $mdSidenav, $mdUtil) {
    $scope.toggleLeftNav = buildToggler();
    function buildToggler() {
        return $mdUtil.debounce(function () {
            $mdSidenav('left').toggle();
        }, 50);
    }
    $scope.navigateTo = function (to) {
        $location.path(to);
    };
}]);

// left nav menu
app.controller('LeftNavController', ['$scope', '$location', '$mdSidenav', '$mdUtil', function ($scope, $location, $mdSidenav, $mdUtil) {
    $scope.navigateTo = function (to) {
        $location.path(to);
        $mdSidenav('left').toggle();
    };
}]);

// mount on window for testing
window.app = app;

