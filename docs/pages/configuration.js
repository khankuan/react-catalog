import React from 'react'

import './react-catalog-docs-configuration.css'

const Configuration = () => (
  <div className='react-catalog-docs-configuration'>
    <p>The table below contains the list of configuration available:</p>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
          <td>Default</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>src</td>
          <td>Src folder containing all the components</td>
          <td>src</td>
        </tr>
        <tr>
          <td>pagesDir</td>
          <td>Folder containing an <code>index.js</code>. Check guide for more details</td>
          <td>src/pages</td>
        </tr>
        <tr>
          <td>outputDir</td>
          <td>Directory that will contain all files generated</td>
          <td>catalog-build</td>
        </tr>
        <tr>
          <td>testDir</td>
          <td>Directory that will contain all tests generated and snapshots</td>
          <td>catalog-tests</td>
        </tr>
        <tr>
          <td>assets</td>
          <td>Array of assets to copy, e.g, <code>{`[{ src: 'assets/fonts', dest: 'fonts' }]`}</code></td>
          <td>[]</td>
        </tr>
        <tr>
          <td>title</td>
          <td>Title of your project</td>
          <td>React Catalog</td>
        </tr>
        <tr>
          <td>componentPattern</td>
          <td>Glob pattern to find all components. Also useful to limit src with subfolders such as `components/**/*.js`.</td>
          <td>**/*.js</td>
        </tr>
        <tr>
          <td>storyPattern</td>
          <td>Glob pattern to find all stories</td>
          <td>**/*.story.js</td>
        </tr>
        <tr>
          <td>configureWebpack</td>
          <td>Function that takes in the webpack config and returns a modified config. Use this if you need to customize webpack config.</td>
          <td>null</td>
        </tr>
        <tr>
          <td>postBuild</td>
          <td>Function that will be called when build is completed.</td>
          <td>null</td>
        </tr>
        <tr>
          <td>port</td>
          <td>Port for development mode.</td>
          <td>9000</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Configuration
