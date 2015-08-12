'use strict';

var RESPONSE_DELAY = 2000; // 2s

var angular = require('angular');
require('../../app/js/main.js'); // app
require('angular-mocks'); // ngMockE2E

var requires = [
    'app',
    'ngMockE2E'
];

var patients = [
    {id: 1, name: 'Janet Perkins', tel: '1112212', birthday: '1995-11-17', notes: 'Next: 12th Dec'},
    {id: 2, name: 'Mary Johnson', tel: '4545454', birthday: '2005-12-17', notes: ''},
    {id: 3, name: 'Peter Carlsson', tel: '658789', birthday: '1988-1-7', notes: ''},
    {id: 4, name: 'Margaret D.', tel: '9988676', birthday: '1999-3-3', notes: ''},
    {id: 5, name: 'Rubens Hojj', tel: '+55112443', birthday: '1999-1-9', notes: ''},
    {id: 6, name: 'Yum Kin', tel: '', notes: ''},
    {id: 7, name: 'Walter N. Buzz', tel: '7674323', birthday: '1955-4-18', notes: 'Never on time'}
];

var id = 1000;

angular.module('app-mock', requires).run(function ($httpBackend) {

    $httpBackend.whenGET('/services/patients').respond(function () {
        return [200, patients];
    });

    $httpBackend.whenPOST('/services/patients').respond(function (method, url, data) {
        var patient = angular.fromJson(data);
        patient.id = id++;

        if(!patient.hasOwnProperty('name')) {
            return [400, {}, {}];
        }
        if(!patient.hasOwnProperty('tel')) {
            patient.tel = '';
        }
        if(!patient.hasOwnProperty('birthday')) {
            patient.birthday = '';
        }
        if(!patient.hasOwnProperty('notes')) {
            patient.notes = '';
        }

        // always push in the end so the array is already sorted
        patients.push(patient);

        return [200, patient, {}];
    });

    // matches '/services/patients/1' (or ending with number)
    $httpBackend.whenPUT(/^\/services\/patients\/\d+$/).respond(function (method, url, data) {
        var patient = angular.fromJson(data);

        // search
        var result = patients.filter(function (pat) {
            return pat.id === patient.id;
        });
        if (result.length > 0) {
            // found!
            // remove
            patients = patients.filter(function (pat) {
                return pat.id !== patient.id;
            });
            // add
            patients.push(patient);
            return [200, patient, {}];
        } else {
            // didn't find the patient
            return [400, patient, {}];
        }
    });

    $httpBackend.whenDELETE(/^\/services\/patients\/\d+$/).respond(function (method, url) {
        var idRegex = /\/(\d+)/;
        var match = idRegex.exec(url);
        if (match == null) {
            return [400, {}, {}];
        } else {
            var id = match[1];
            // search
            var result = patients.filter(function (pat) {
                return pat.id == id;
            });
            if (result.length > 0) {
                // found!
                // remove
                patients = patients.filter(function (pat) {
                    return pat.id != id;
                });
                return [200, {}, {}];
            } else {
                return [400, {}, {}];
            }
        }
    });

}).config(function ($provide) {
    // controlled a delay
    // https://endlessindirection.wordpress.com/2013/05/18/angularjs-delay-response-from-httpbackend/
    $provide.decorator('$httpBackend', function ($delegate) {
        var proxy = function (method, url, data, callback, headers) {
            var interceptor = function () {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function () {
                    callback.apply(_this, _arguments);
                }, RESPONSE_DELAY);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for (var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
});