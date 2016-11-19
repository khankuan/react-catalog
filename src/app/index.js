import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'

import history from './history'
import { pages } from 'build/config'

import App from './components/App/App'
import PageNotFound from './PageNotFound'

render((
  <Router history={history}>
    <Route path=''>
      {pages ? pages.map((page, i) => React.cloneElement(page, { key: i, component: App, page: page.props.component })) : null}
      <Route path=':tag/browse' component={App} />
      <Route path=':tag/browse/:mode' component={App} />
      <Route path=':tag/:component' component={App} />
      <Route path=':tag/:component/:story' component={App} />
      <Route path='*' component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
