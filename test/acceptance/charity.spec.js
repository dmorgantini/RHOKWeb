/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var zombie = require("zombie");
var assert = require("assert");

describe("Given I am user", function () {
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
            zombie.visit("http://localhost:3000/charity/register", function (e, page1) {
                page1.fill("#CharityName", "A Charity");
                page1.fill("#CharityWebsite", "www.charity.com");
                page1.fill("#DirectDonateLink", "www.donate.com");
                page1.fill("#DonationInstructions", "donate!");
                page1.pressButton("#submit", function (e, page2, status) {
                    page2.location._url.href.should.include("/charity");
                    page2.location._url.href.should.not.include("/register");
                    done();
                });
            });
        });
    });
});