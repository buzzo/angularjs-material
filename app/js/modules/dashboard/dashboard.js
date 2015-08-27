'use strict';

module.exports = function ($scope, $rootScope, $translate, SharedContext) {

    // init top bar
    $translate('DASHBOARD').then(function (translation) {
        $rootScope.$broadcast('title', translation);
        $rootScope.$broadcast('allowSearch', false);
    });

    $scope.title = 'Dashboard';

    $scope.data = {};
    $scope.data.cb1 = true;

};
