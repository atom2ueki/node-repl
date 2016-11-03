# Node-REPL
Nodejs console debug tools base on REPL

## How it looks like
<img src="https://github.com/atom2ueki/node-repl/blob/master/sample.png" width="250">

## How to use / test
- Step1: define your .replignore file, just like .gitignore, so node-repl will ignore those path or files
- Step2: copy repl.js, build.js, register.js into your project root directory
- Step3: node build.js
- Step4: node repl.js

ctrl+c twice to exit

## Roadmap
- [ ] pack it into npm
- [x] re-register solution
- [ ] show functions registered
- [x] auto register functions
- [x] identify ignore file
- [ ] watch file changes

## Testing
put repl.js, build.js, register.js
```
npm run build
npm start
```
