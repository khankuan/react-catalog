# Installation
```
npm install --save-dev react-gallery
```

# Run
Add the following under scripts in `package.json`:
```
  ..,
  "scripts": {
    ..,
    "docs": "react-gallery"
  },
  ..
```
Run docs:
```
npm run docs
```

# Optional config
Create a `gallery.config.js` in the root directory of your project. Use the basic configuration below and replace `PATH_TO_COMPONENTS` with the directory path that contains all your components, such as `src/components` (defaults to src)
```
export default {
  src: PATH_TO_COMPONENTS,
}
```

Visit the [Configuration](/#/configuration) page for more details on configuration options.
