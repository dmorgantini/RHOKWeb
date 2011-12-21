
TESTS = test/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--slow 20 \
		--growl \
		--globals name \
		$(TESTS)


.PHONY: test