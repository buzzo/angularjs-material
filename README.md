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
- research + add security (login, etc)
- add CRUD example
- move from css to sass

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