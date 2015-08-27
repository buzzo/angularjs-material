'use strict';

module.exports = function ($scope, $rootScope, $translate) {

    // init top bar
    $translate('DASHBOARD').then(function (translation) {
        $rootScope.$broadcast('title', translation);
        $rootScope.$broadcast('allowSearch', false);
    });

};
