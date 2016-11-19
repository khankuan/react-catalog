# React Library
React Library is a UI Component development tool. It aims to support both developers and designers in development, documentation and testing of ui components.

# Docs
Currently, docs can be found by running it locally (it will be available on gh-pages once the library is public). To run docs:
```
npm install
npm run docs
```

# Examples
The best example of usage is to look at the `docs` folder. The documentation is built with React Library and will be a good example of how a user's repo might look like. Refer to `library.config.js` for configuration. After starting docs, the built files are located in `library-build`.

## Commands
```
//  Run docs
npm run docs
//  Build docs for production (output at library-build/public)   
npm run build-docs

//  Snapshot test for ui components in docs repo (docs/src)
npm run test-docs
//  Override snapshots
npm run test -- --update

//  Lint ui components
npm run lint-docs
//  Lint and fix source (with standardjs)
npm run lint-docs -- --fix
```

# Roadmap
The library is in it's earliest phase. Currently, I am testing it with different projects to surface as much issues as possible. The hope is to only release the lib when it is stable enough to reduce entry barrier.
