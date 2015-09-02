'use strict';

var fs = require('fs');

module.exports = function ($scope, $rootScope, $mdDialog, $translate) {

    // init top bar
    $translate('MY_ACCOUNT').then(function (translation) {
        $rootScope.$broadcast('title', translation);
        $rootScope.$broadcast('allowSearch', false);
    });

    // TODO: TBD
    $translate('NEVER').then(function (translation) {
        $scope.lastChange = {time: translation};
    });

    // TODO: TBD
    $scope.currentLanguage = {language: '???'};

    $scope.changeLanguage = function () {
        var language = {
            template: fs.readFileSync(__dirname + '/account.language.html'),
            controller: LanguageDialogController
        };

        $mdDialog.show(language)
            .then(function (result) {
                // all outputs
                if (result) {
                    // TODO: TBD
                }
            }, function () {
                // 'esc' pressed
                // TODO: TBD
            }).finally(function () {
                // clean up
                language = undefined;
            });
    }

    function LanguageDialogController($scope, $mdDialog) {
        $scope.cancel = function () {
            $mdDialog.hide();
        };

        $scope.save = function () {
            $mdDialog.hide();
        };
    };

    $scope.changePassword = function () {
        // TODO: TBD
    }


};