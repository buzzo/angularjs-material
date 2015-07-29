'use strict';

describe('Account feature', function () {

    beforeEach(function () {
        browser.get('/#/account');
        browser.waitForAngular();
    });

    it('should show account title', function () {
        expect(element.all(by.css('.account-title')).first().getText()).toMatch('Account');
    });

});
