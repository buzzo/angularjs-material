'use strict';

var RESPONSE_DELAY = 1000; // 1s
var FILTER_PARAMETER = 'filter';

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

    $httpBackend.whenGET(/^\/services\/patients/).respond(function (method, url) {
        var params = _getParmsFromURL(url);
        if (params && params[FILTER_PARAMETER]) {
            // if there is a 'filter' param then use it as filter
            return [200, _filter(patients, params[FILTER_PARAMETER])];
        } else {
            // no filter
            return [200, patients];
        }
    });

    $httpBackend.whenPOST('/services/patients').respond(function (method, url, data) {
        var patient = angular.fromJson(data);

        if (!patient.hasOwnProperty('name')) {
            return [400, {message: 'Name is required.'}];
        }

        patient.id = id++;
        patients.push(patient);

        return [200, patient];
    });

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
            // sort by ID
            patients.sort(function compare(a, b) {
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;
            });
            return [200, patient];
        } else {
            // didn't find the patient
            return [400, {message: 'No patient found with id:' + patient.id}];
        }
    });

    $httpBackend.whenDELETE(/^\/services\/patients\/\d+$/).respond(function (method, url) {
        var idRegex = /\/(\d+)/;
        var match = idRegex.exec(url);
        if (match == null) {
            // does this ever will happen?
            return [400, {message: 'Bad URL'}];
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
                return [200, {}];
            } else {
                // didn't find the patient
                return [400, {message: 'No patient found with id ' + id}];
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

// http://stackoverflow.com/questions/10624762/regex-to-extract-parameters-from-url-hash-in-javascript
function _getParmsFromURL(url) {
    var parms = {}, pieces, parts, i;
    var hash = url.lastIndexOf("#");
    if (hash !== -1) {
        // remove hash value
        url = url.slice(0, hash);
    }
    var question = url.lastIndexOf("?");
    if (question !== -1) {
        url = url.slice(question + 1);
        pieces = url.split("&");
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
    }
    return parms;
}

function _filter(entities, filter) {
    if (!filter) {
        // nothing to filter
        return entities;
    }
    return entities.filter(function (entity) {
        for (var key in entity) {
            if (new String(entity[key]).toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1) {
                return true;
            }
        }
        return false;
    });
}
