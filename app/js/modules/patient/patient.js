'use strict';

var fs = require('fs');
var angular = require('angular');

module.exports = function ($scope, $mdDialog, $mdToast, Patient) {

    _load();

    $scope.add = function () {
        $scope.showDetails({}, false);
    };

    $scope.update = function (entity) {
        $scope.showDetails(entity, true);
    };

    $scope.showDetails = function (entity, isEntityUpdate) {
        var details = {
            template: fs.readFileSync(__dirname + '/patient.details.html'),
            controller: DetailsDialogController,
            locals: {
                entity: entity,
                isEntityUpdate: isEntityUpdate
            }
        };

        $mdDialog.show(details)
            .then(function (result) {
                // all outputs
                if (result && result.reload) {
                    _load();
                }
            }, function () {
                // 'esc' pressed
                _load();
            }).finally(function () {
                // clean up
                details = undefined;
            });
    };

    function DetailsDialogController($scope, $mdDialog, $mdToast, entity, isEntityUpdate) {

        $scope.entity = angular.copy(entity);

        // 'viewMode' controls the change between view and edit mode
        // if we are updating then starts in 'view only' mode
        // if is an add then starts in 'editing' mode (allow edit)
        $scope.viewMode = isEntityUpdate;
        $scope.isEntityUpdate = isEntityUpdate;
        $scope.wasEntityUpdated = false;

        $scope.toggleViewMode = function () {
            $scope.viewMode = !$scope.viewMode;
        };

        $scope.cancel = function () {
            if (isEntityUpdate) {
                // update
                $scope.clean();
                $scope.toggleViewMode();
            } else {
                // add
                $scope.close($scope.wasEntityUpdated);
            }
        };

        $scope.clean = function () {
            // retrieve the original entity
            $scope.entity = angular.copy(entity);
        };

        $scope.save = function () {
            if (isEntityUpdate) {
                // update
                $scope.wasEntityUpdated = true;
                $scope.toggleViewMode();
                _update($scope.entity,
                    function () {
                        _simpleToast($mdToast, 'Patient updated!');
                    });
            } else {
                // add
                _add($scope.entity,
                    function () {
                        $scope.close(true);
                        _simpleToast($mdToast, 'Patient added!');
                    });
            }
        };

        $scope.delete = function () {
            _delete($scope.entity,
                function () {
                    $scope.close(true);
                    _simpleToast($mdToast, 'Patient deleted!');
                });
        };

        $scope.close = function (reload) {
            var result = {reload: reload};
            $mdDialog.hide(result);
        };
    }

    function _load() {
        $scope.isLoading = true;
        $scope.entities = Patient.query(function () {
            $scope.isLoading = false;
        });
    }

    function _add(entity, sucess) {
        console.log(entity);
        sucess();
    }

    function _update(entity, sucess) {
        $scope.isUpdating = true;
        Patient.update({id: entity.id}, entity, function () {
            $scope.isUpdating = false;
            sucess();
        });
    }

    function _delete(entity, sucess) {
        $scope.isUpdating = true;
        Patient.delete({id: entity.id}, function () {
            $scope.isUpdating = false;
            sucess();
        });
    }

    function _simpleToast($mdToast, message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .hideDelay(3000)
        );
    }
};