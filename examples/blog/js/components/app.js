import React from 'react'
import { observer, Provider } from 'mobx-react'
import { MobxRouter } from 'mobx-router'
import MessagesView from './messages'
import Menu from './menu'


export const App = observer( ({ store }) => {
  return (
    <div className='row' style={{width: '100%'}}>
      <Menu store={store} />
      <MessagesView state={store} />
      <div style={{padding: '65px 0 65px 18px'}} className='main'>
        <Provider store={store}>
          <MobxRouter />
        </Provider>
      </div>
    </div>
  )
})
