'use strict';

var angular = require('angular');
var app = angular.module('app');

module.exports = app.factory('SystemConfig', function () {
    var config = {
        languages: {
            available: [
                {
                    locale: 'en-us',
                    content: require('../locales/en-us.json')
                },
                {
                    locale: 'pt-br',
                    content: require('../locales/pt-br.json')
                }
            ],
            preferred: 'en-us'
        }
    };
    return config;
});
