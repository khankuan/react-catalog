import React from 'react'
import { Page, NavHeader } from 'react-gallery'

import Introduction from './introduction'
import Quickstart from './quickstart'
import Configuration from './configuration'
import Guide from './guide'
import Backlog from './backlog'
import Api from './api'

import './index.css'

export default [
  <NavHeader header='Documentation' />,
  <Page path='intro' title='Introduction' component={Introduction} className='demo-pages' />,
  <Page path='quickstart' title='Quick Start' component={Quickstart} className='demo-pages' />,
  <Page path='configuration' title='Configuration' component={Configuration} className='demo-pages' />,
  <Page path='guide' title='Guide' component={Guide} className='demo-pages' />,
  <Page path='backlog' title='Backlog' component={Backlog} className='demo-pages' />,
  <Page path='api' title='Api' component={Api} className='demo-pages' />
]
