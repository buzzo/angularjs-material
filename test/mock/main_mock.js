'use strict';

var angular = require('angular');
require('angular-resource');
require('angular-mocks'); // ngMockE2E
require('../../app/js/main.js');

var requires = [
    'app',
    'ngMockE2E'
];

angular.module('app-mock', requires).run(function ($httpBackend) {
    // let all views through (the actual html views from the views folder should be loaded)
    //$httpBackend.whenGET(new RegExp('views\/.*')).passThrough();
    //
    //// Mock out the call to '/service/hello'
    //$httpBackend.whenGET('/service/hello').respond(200, {message: 'world'});
    //// Respond with 404 for all other service calls
    //$httpBackend.whenGET(new RegExp('service\/.*')).respond(404)
});