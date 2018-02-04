import React from 'react'
import { render } from 'react-dom'
import { startRouter } from 'mobx-router'
import DevTools from 'mobx-react-devtools'
import views from './routeconfig'

// use it to create the app state
import StateStore from 'react-mobx-admin/examples/blog/js/store'
const store = new StateStore(views)
startRouter(views, store)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render((
  <div className='view-wrapper container-fluid'>
    <App store={store} />
    {Conf.debug ? (<DevTools />) : null}
  </div>
), mount)  // and final render
