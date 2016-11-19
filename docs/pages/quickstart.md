# Installation
```
npm install --save-dev react-library
```

# Run
Create a `library.config.js` in the root directory of your project. Use the basic configuration below and replace `PATH_TO_COMPONENTS` with the directory path that contains all your components, such as `src/components`
```
export default {
  src: PATH_TO_COMPONENTS,
}
```
Add the following under scripts in `package.json`:
```
  ..,
  "scripts": {
    ..,
    "docs": "react-library"
  },
  ..
```

Visit the [Configuration](/#/configuration) page for more details on configuration options.
