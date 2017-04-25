import React from 'react'
import { render } from 'react-dom'
import { startRouter } from './router'

// use it to create the app state
import StateStore from 'react-mobx-admin/examples/blog/js/state'
const state = new StateStore()
startRouter(state)

// init react components part using the only prop: the store
import { App } from './components/app'
const mount = document.getElementById("app")  // mountpoint
render(<App state={state} />, mount)  // and final render
