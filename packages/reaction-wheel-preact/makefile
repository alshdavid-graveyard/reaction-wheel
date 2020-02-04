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
		! -name .npmignore \
		! -name node_modules \
		! -name tests \
		! -name .git \
		! -name makefile \
		! -name . \
		! -name .. \
		-exec rm -r -f '{}' +