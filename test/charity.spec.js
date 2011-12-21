/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var zombie = require("zombie");
var assert = require("assert");

describe("Given I am user", function () {
    beforeEach(function () {
        this.server = require('../server.js');
    });


    describe("When I visit the register a charity", function () {
        it("Should return 200 OK", function (done) {
            zombie.visit("http://localhost:3000/charity/register", function (e, browser, status) {
                status.should.equal(200);
                done();
            });
        });
    });

    describe("When I attempt to register a charity", function () {
        it("Should tell me that I have successfully registered my charity", function (done) {
            zombie.visit("http://localhost:3000/charity/register", function (e, browser, status) {
                browser.fill("#CharityName", "A Charity");
                browser.fill("#CharityWebsite", "www.charity.com");
                browser.fill("#DirectDonateLink", "www.donate.com");
                browser.fill("#DonationInstructions", "donate!");
                browser.pressButton("#submit", function (e, browser, status) {
                    // TODO: there must be a better way to validate this
                    browser.location.should.contain("/charity");
                    browser.location.should.not.contain("/register");
                    status.should.equal(200);
                    done();
                });
            });
        });
    });
});