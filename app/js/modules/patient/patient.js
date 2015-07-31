'use strict';

module.exports = function ($scope, $mdDialog) {

    $scope.people = [
        {name: 'Janet Perkins', tel: '1112212', notes: 'Next appointment: 12th Dec - 8:00 AM'},
        {name: 'Mary Johnson', tel: '4545454', notes: ''},
        {name: 'Peter Carlsson', tel: '658789', notes: ''},
        {name: 'Margaret D.', tel: '9988676', notes: ''},
        {name: 'Rubens Hojj', tel: '+55112443', notes: ''},
        {name: 'Yum Kin', tel: '', notes: ''},
        {name: 'Walter N. Buzz', tel: '7674323', notes: 'Never on time'},
    ];

    $scope.goToPerson = function (person, event) {

        var alert = $mdDialog.alert()
            .title('Attention, ' + $scope.userName)
            .content('This is an example of how easy dialogs can be!')
            .ok('Close');

        $mdDialog.show(alert);

    };

};