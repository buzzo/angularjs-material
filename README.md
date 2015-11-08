# angularjs-material
An angularJS + browserify + gulp project using material-ui

Goal:
- NKOTB: gulp as builder
- no requirejs or AMD = browserify
- after some research I choose the most used structural framework = angularjs
- modular and scalable project = features app folder. Each feature has it's own html/css/js
- project should be easy to code = watchify + browserify
- using material as UI

TODO:

- implement virtual scrolling
- implement UNDO for operations
- implement change language (needs user session and server side)
- implement change password (needs user session and server side)
- implement server side validation errors (like unique name for patient)
- how handle input form with spaces only?
- show message (inside list div) or picture when get an error to load list
- fix and improve tests (they are just examples today)
- improve login screen
- research + add security (login, logout)

### Commands

```
npm install
npm install -g gulp
gulp dev (development - open browser http://localhost:3000 and change the code)
gulp prod (build for production, output goes to 'build' folder)
gulp test (run unit and e2e tests with coverage report)
npm run test (run unit test and keeps watching for changes. Great for development. No coverage report)
npm run protractor (run e2e test only. No coverage report)
```

### Troubleshooting

Error:
```
➜  angularjs-material git:(master) gulp dev
/home/projects/angularjs-material/node_modules/gulp-sass/node_modules/node-sass/lib/index.js:22
    throw new Error('`libsass` bindings not found. Try reinstalling `node-sass`?');
    ^

Error: `libsass` bindings not found. Try reinstalling `node-sass`?
```

Solution:
```
sudo npm install gulp-sass
```
