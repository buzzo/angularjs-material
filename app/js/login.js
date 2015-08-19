'use strict';

var angular = require('angular');
require('angular-material'); // ngMaterial
require('angular-translate'); // pascalprecht.translate

var requires = [
    'ngMaterial',
    'pascalprecht.translate'
];

// mount on window for testing
angular.module('login', requires);


