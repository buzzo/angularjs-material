'use strict';

module.exports = function ($scope, $location, $mdSidenav, $mdUtil) {
    function buildToggler() {
        return $mdUtil.debounce(function () {
            $mdSidenav('left').toggle();
        }, 50);
    }

    $scope.toggleLeftNav = buildToggler();

    $scope.navigateTo = function (to) {
        $location.path(to);
    };
};
