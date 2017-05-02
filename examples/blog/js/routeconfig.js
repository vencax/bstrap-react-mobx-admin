import React from 'react'
import { Route } from 'mobx-router'

//components
import EntityList from './components/entity_list'
import EntityEdit from './components/entity_edit'


const views = {
  entity_list: new Route({
    path: '/entity/:entityname',
    component: <EntityList />,
    beforeExit: (route, params, store, queryParams) => {
      store.beforeListViewExit(route, params, store, queryParams)
    },
    beforeEnter: (route, params, store, queryParams) => {
      store.beforeListViewEnter(route, params, store, queryParams)
    },
    onEnter: (route, params, store) => {
      store.showEntityListView(params.entityname)
    },
    onParamsChange: (route, nextParams, store, nextQueryParams) => {
      store.onListParamsChange(nextParams, nextQueryParams)
    }
  }),
  entity_detail: new Route({
    path: '/entity/:entityname/:id',
    component: <EntityEdit />,
    onEnter: (route, params, store) => {
      store.showEntityUpdateView(params.entityname, params.id)
    },
    onParamsChange: (route, nextParams, store) => {
      store.showEntityUpdateView(nextParams.entityname, nextParams.id)
    }
  })
}

export default views
