'use strict';

module.exports = function ($scope, $rootScope, $translate, SharedContext) {

    // init top bar
    $translate('MY_ACCOUNT').then(function (translation) {
        $rootScope.$broadcast('title', translation);
        $rootScope.$broadcast('allowSearch', false);
    });

    $scope.title = 'Account';

    var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        dontUseScrolls: true // because so little data, no need to use scroll bars
    };


};