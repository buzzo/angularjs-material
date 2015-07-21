'use strict';

var classUnderTest = require('../../../app/js/modules/dashboard/dashboard.js');

describe('Dashboard Class', function () {

    var instanceUnderTest, scope;

    beforeEach(function () {
        scope = {};
        instanceUnderTest = new classUnderTest(scope);
    });

    it('title should be defined', function () {
        expect(scope.title).toBeDefined();
        expect(scope.title).toEqual('Dashboard');
    });

});