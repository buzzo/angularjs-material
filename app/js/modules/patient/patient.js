'use strict';

var fs = require('fs');
var angular = require('angular');

module.exports = function ($scope, $mdDialog, $mdToast, Patient) {

    _load();

    $scope.add = function () {
        $scope.showDetails(new Patient, false);
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
                _update();
            } else {
                _add();
            }
        };

        $scope.delete = function () {
            _delete();
        };

        $scope.close = function (reload) {
            var result = {reload: reload};
            $mdDialog.hide(result);
        };

        function _add() {
            var addingToast = _simpleToast('Adding...', false);
            $scope.isUpdating = true;
            $scope.entity.$save(function (data) {
                $scope.isUpdating = false;
                $mdToast.hide(addingToast);
                $scope.close(true);
                _simpleToast('Patient added!', 3000);
            });
        }

        function _update() {
            var updatingToast = _simpleToast('Updating...', false);
            $scope.isUpdating = true;
            $scope.wasEntityUpdated = true;
            $scope.toggleViewMode();
            Patient.update({id: $scope.entity.id}, $scope.entity, function () {
                $scope.isUpdating = false;
                $mdToast.hide(updatingToast);
                _simpleToast('Patient updated!', 3000);
            });
        }

        function _delete() {
            $scope.isUpdating = true;
            var deletingToast = _simpleToast('Deleting...', false);
            Patient.delete({id: $scope.entity.id}, function () {
                $scope.isUpdating = false;
                $mdToast.hide(deletingToast);
                $scope.close(true);
                _simpleToast('Patient deleted!', 3000);
            });
        }

        /**
         * @param delay int in milliseconds or false if never hide the toast.
         * @returns toast object. Can be used to hide ($mdToast.hide()) if delay param is false (the toast will not hide itself).
         */
        function _simpleToast(message, delay) {
            var toast = $mdToast.simple()
                .content(message)
                .hideDelay(delay);
            $mdToast.show(toast);
            return toast;
        }
    }

    function _load() {
        $scope.isLoading = true;
        $scope.entities = Patient.query(function () {
            $scope.isLoading = false;
        });
    }

};