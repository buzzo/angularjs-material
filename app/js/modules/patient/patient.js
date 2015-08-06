'use strict';

var fs = require('fs');
var angular = require('angular');

module.exports = function ($scope, $mdDialog, Patient) {

    _load();

    $scope.showDetails = function (entity, $event) {

        var details = {
            controller: function DialogController($scope, $mdDialog) {
                $scope.entity = angular.copy(entity);

                $scope.disabled = true;

                $scope.toggleEditDetails = function () {
                    $scope.disabled = !$scope.disabled;
                };

                $scope.clean = function () {
                    $scope.entity = angular.copy(entity);
                };

                $scope.save = function () {
                    _update($scope.entity);
                };

                $scope.delete = function () {
                    _delete($scope.entity);
                };

                $scope.close = function (answer) {
                    $mdDialog.hide(answer);
                };
            },
            template: fs.readFileSync(__dirname + '/patient.details.html'),
            targetEvent: $event
        };

        $mdDialog.show(details)
            .then(function () {
                _load();
            }, function () {
                _load();
            });
    };

    function _load() {
        $scope.isLoading = true;
        $scope.entities = Patient.query(function () {
            $scope.isLoading = false;
        });
    }

    function _update(entity) {
        $scope.isUpdating = true;
        Patient.update({id: entity.id}, entity, function () {
            // TODO TOAST!
            $scope.isUpdating = false;
        });
    }

    function _delete(entity) {
        Patient.delete({id: entity.id}, function () {
            // TODO TOAST!
        });
    }
};