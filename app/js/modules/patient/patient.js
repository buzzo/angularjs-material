'use strict';

var fs = require('fs');
var angular = require('angular');

module.exports = function ($scope, $mdDialog, $mdToast, Patient) {

    _load();

    $scope.add = function () {
        $scope.showDetails({});
    };

    $scope.update = function (entity) {
        $scope.showDetails(entity);
    };

    $scope.showDetails = function (entity) {

        var details = {
            controller: function DialogController($scope, $mdDialog) {
                $scope.entity = angular.copy(entity);

                $scope.disabled = true;

                $scope.toggleEditDetails = function () {
                    $scope.disabled = !$scope.disabled;
                };

                $scope.clean = function () {
                    $scope.entity = angular.copy(entity);
                    $scope.toggleEditDetails();
                };

                $scope.save = function () {
                    _update($scope.entity);
                    $scope.toggleEditDetails();
                };

                $scope.delete = function () {
                    _delete($scope.entity, $scope.close);
                };

                $scope.close = function () {
                    $mdDialog.hide();
                };
            },
            template: fs.readFileSync(__dirname + '/patient.details.html'),
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
            $scope.isUpdating = false;
            // toast
            $mdToast.show(
                $mdToast.simple()
                    .content('Patient updated!')
                    .hideDelay(3000)
            );
        });
    }

    function _delete(entity, callback) {
        $scope.isUpdating = true;
        Patient.delete({id: entity.id}, function () {
            $scope.isUpdating = false;
            callback();
            // toast
            $mdToast.show(
                $mdToast.simple()
                    .content('Patient deleted!')
                    .hideDelay(3000)
            );
        });
    }
};