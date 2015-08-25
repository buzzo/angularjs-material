'use strict';

module.exports = function ($scope, $rootScope, $translate, SharedContext) {

    $translate('DASHBOARD').then(function (translation) {
        $rootScope.$broadcast('title', translation);
    });

    $scope.title = 'Dashboard';

    $scope.data = {};
    $scope.data.cb1 = true;

};
