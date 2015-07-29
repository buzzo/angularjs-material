'use strict';

module.exports = function ($scope, $location, $mdSidenav, $mdUtil) {
    $scope.toggleLeftNav = buildToggler();
    function buildToggler() {
        return $mdUtil.debounce(function () {
            $mdSidenav('left').toggle();
        }, 50);
    }

    $scope.navigateTo = function (to) {
        $location.path(to);
    };
};
