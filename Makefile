TESTS = test/*.js
ACCEPT_TESTS = test/acceptance/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--slow 20 \
		--growl \
		--globals name \
		$(TESTS)

accept_test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--slow 20 \
		--growl \
		--globals name \
		$(ACCEPT_TESTS)

.PHONY: test