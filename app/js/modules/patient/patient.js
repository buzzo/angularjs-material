'use strict';

var fs = require('fs');
var angular = require('angular');

module.exports = function ($scope, $mdDialog) {

    // TODO LOAD
    $scope.entities = [
        {name: 'Janet Perkins', tel: '1112212', birthday: new Date(1995, 11, 17), notes: 'Next appointment: 12th Dec'},
        {name: 'Mary Johnson', tel: '4545454', birthday: new Date(2005, 12, 17), notes: ''},
        {name: 'Peter Carlsson', tel: '658789', birthday: new Date(1988, 1, 7), notes: ''},
        {name: 'Margaret D.', tel: '9988676', birthday: new Date(1999, 3, 3), notes: ''},
        {name: 'Rubens Hojj', tel: '+55112443', birthday: new Date(1999, 1, 9), notes: ''},
        {name: 'Yum Kin', tel: '', notes: ''},
        {name: 'Walter N. Buzz', tel: '7674323', birthday: new Date(1955, 4, 18), notes: 'Never on time'}
    ];

    $scope.showDetails = function (person, $event) {

        var details = {
            controller: function DialogController($scope, $mdDialog) {
                $scope.entity = angular.copy(person);

                $scope.disabled = true;

                $scope.toggleEditDetails = function () {
                    $scope.disabled = !$scope.disabled;
                };

                $scope.clean = function () {
                    $scope.entity = angular.copy(person);
                };

                $scope.save = function () {
                    // TODO TOAST!
                    person = angular.copy($scope.entity);
                };

                $scope.close = function (answer) {
                    $mdDialog.hide(answer);
                };
            },
            template: fs.readFileSync(__dirname + '/patient-details.html'),
            targetEvent: $event
        };

        // TODO FIX
        $mdDialog.show(details)
            .then(function (answer) {
                $scope.alert = 'SAVE TOAST' + answer;
            }, function () {
                $scope.alert = 'CANCEL!!';
            });
    };


};