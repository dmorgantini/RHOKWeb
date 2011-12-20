/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var zombie = require("zombie");
var assert = require("assert");

describe("Given I am user", function () {
    beforeEach(function () {
        this.server = require('../server.js');
    });

    describe("When I visit the home page", function () {
        it('should return 200 OK', function () {
            zombie.visit("http://localhost:3000", function (e, browser, status) {
                status.should.equal(200);
                done();
            });
        });
    });

    describe("When I visit the home page via index", function () {
        it('should return 200 OK', function () {
            zombie.visit("http://localhost:3000/index", function (e, browser, status) {
                status.should.equal(200);
                done();
            });
        });
    });
});

