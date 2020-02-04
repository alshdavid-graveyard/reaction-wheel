default:
	npx tsc

test:
	npx jest

test-watch:
	npx jest --watch

clean:
	find . \
		-maxdepth 1 \
		! -name src \
		! -name .gitignore \
		! -name package.json \
		! -name tsconfig.json \
		! -name tslint.json \
		! -name jest.config.js \
		! -name yarn.lock \
		! -name node_modules \
		! -name .npmignore \
		! -name .git \
		! -name makefile \
		! -name tests \
		! -name . \
		! -name .. \
		-exec rm -r -f '{}' +