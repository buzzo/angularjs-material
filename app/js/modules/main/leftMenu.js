'use strict';

module.exports = function ($scope, $location, $mdSidenav, $mdUtil) {
    $scope.navigateTo = function (to) {
        $location.path(to);
        $mdSidenav('left').toggle();
    };
};