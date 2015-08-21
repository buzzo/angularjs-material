'use strict';

module.exports = function ($scope, $translate, SharedContext) {

    $translate('DASHBOARD').then(function (translation) {
        SharedContext.title = translation;
    });

    $scope.title = 'Dashboard';

    $scope.data = {};
    $scope.data.cb1 = true;

};
