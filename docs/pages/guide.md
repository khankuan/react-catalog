# Catalog Build Files
The catalog output files are generated at the `outputDir` folder, defaults to `catalog-build`. Test snapshots are stored in `testDir` folder, defaults to `catalog-tests`. You might want to include these folders in gitignore, except `catalog-tests/__snapshots__`.

# Writing of Component Docs

## Description, Categories, Keywords, Default
The documentation is powered by [react-docgen](https://github.com/reactjs/react-docgen). You can add description to a component or a particular propType:
```
/**
 *  @categories: Forms, Settings
 *  @tags: Toggle, Switch
 *  @default
 *  This is use to denote a boolean value, usually used in forms.
 */
class CheckBox extends React.Component {
  static propTypes = {
    /** Label placed beside checkbox */
    children: PropTypes.node.isRequired,
    /** Optional text that show when user hover */
    hint: PropTypes.string,
    checked: PropTypes.bool
  }
  ..
}
```
Categories and tags are used in the navigation as well as the component search. Be sure to define them so that components can be easily found.

## Defining PropTypes
PropTypes provides the reader with option to interact with the documentation. PropTypes also help to identity required fields which will help to identity stories that cannot have a default story.

## Dependencies
The catalog detects dependencies of components by inspecting the component source code. No actions are required for the dependencies to be detected.

# Stories
Stories are one of the key concept of the catalog. Stories help to define the use cases of components. Readers will be able to find out how they can use the component you've built. On the other hand, stories are great use cases to be tested, and are part of the generated testing (more details below). Stories have a `title`, `description` as well as `content`. Both `title` and `description` are also included in the component search. For components that have no `isRequired` propTypes, a `Default` story would be included when the `@default` rule is added to the description. Here is an example of a story file `CheckBox.story.js`:
```
import { Story } from 'react-catalog'
import React from 'react'
import CheckBox from './CheckBox'

const story = new Story(CheckBox)
export default story

story.add({
  title: 'Default',
  content: { checked: true, label: 'Confirm' }
})

story.add({
  title: 'With hint',
  description: 'For cases where the label is too long',
  content: {
    checked: true,
    label: 'I agree',
    hint: 'Note that this action is irreversible. Do at your own risk.'
  }
})

story.add({
  title: 'With custom label',
  description: 'If you need to customize the label to show another component',
  content: <CheckBox><Avatar src='..' /></CheckBox>
})
```

## Sequence
Sequences are more complex stories that might involve multiple steps. The first step is always the initial props. In subsequent steps, you can change the `props`, setState` or reference the component directly with refs to display the changes on each step.
```
story.sequence({
  title: 'With custom label',
  description: 'Checking a checkbox'
}, [
  {
    title: 'Before checking',
    update: { checked: false, label: 'I agree', onClick: story.handler('onClick') },
  },
  {
    title: 'After checking',
    update: (props, ref) => (props.checked = true)
  }
])
```

### Handler
Notice that the `onClick` handler is created with `story.handler(NAME)`. This automatically handles the callback by display the method and arguments to the reader. Tests generated for sequences will take snapshots of the callbacks and their arguments. Note that native events are not supported for snapshot testing, be sure to mock them.

# Custom Pages
Custom pages gives you much more flexibility of what to include in your catalog documentation. Currently, React, Html and Markdown are supported. Export your custom pages by including a `index.js` file in the `pagesDir` folder. You can use the `NavHeader` component to add a section header to the pages. The `Page` component is a wrapper on `Route` in [react-router](https://github.com/reactjs/react-router) and adds `title`, `className`. Here is an example usage:
```
import React from 'react'
import { Page, NavHeader } from 'react-catalog'

import DesignConcept from './DesignConcept'
import Guidelines from './Guidelines'

import './index.css'

export default [
  <NavHeader header='Design' />,
  <Page
    path='design'
    title='Design Concept'
    component={DesignConcept}
    className='design-page'/>,
  <NavHeader header='Code' />,
  <Page
    path='react-guidelines'
    title='React Guidelines'
    component={Guidelines} />,
]
```

# Generated Snapshot Testing
Tests are generated based on default props (if component does not have required props) and stories automatically. To learn more about jest snapshot testing, visit [here](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html). To run test add this to the scripts in `package.json`:
```
  ..,
  "scripts": {
    ..,
    "test": "react-catalog --test",
    "update-test": "react-catalog --test --update"
  },
  ..
```
`test` is used for testing if the snapshots output have changed. For the initial run, snapshots will be generated and no changes will be detected. For subsequent runs, you will see test failing if components produced a different output. After seeing test failing, you would check each of the fail cases to verify that the difference in snapshot is expected. After they are verified, run `update-test` so that the new snapshots will overwrite the old ones.

# Linting
Linting is always helpful to reduce code inconsistency and more important identify problematic code. The catalog adopted [StandardJS](http://standardjs.com). To run lint, add this to the scripts in `package.json`:
```
  ..,
  "scripts": {
    ..,
    "lint": "react-catalog --lint",
    "fix-lint": "react-catalog --lint --fix"
  },
  ..
```
`fix-lint` is provided by StandardJS to automatically fix certain errors/warnings that it knows how to fix.

# Transpile
You might want to transpile the components to es5 for exporting. The transpiled folder is at `catalog-build/lib/*` and the index file of all the components is at `catalog-build/lib.js`
```
  ..,
  "scripts": {
    ..,
    "lint": "react-catalog --transpile",
  },
  ..
```
