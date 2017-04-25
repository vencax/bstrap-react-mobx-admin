import React from 'react'
import { observer } from 'mobx-react'
import MessagesView from './messages'
import Menu from './menu'
import DevTools from 'mobx-react-devtools'


export const App = observer( ({ state }) => {
  return (
    <div className='view-wrapper container-fluid'>
      <div className='row' style={{width: '100%'}}>
        <Menu state={state} />
        <MessagesView state={state} />
        <div style={{padding: '65px 0 65px 18px'}} className='main'>
          { renderCurrentView(state) }
        </div>
      </div>
      {Conf.debug ? (<DevTools />) : null}
    </div>
  )
})

import PostEditPage from './posts/manip'
import PostListPage from './posts/list'
import TagsEditPage from './tags/manip'
import TagsListPage from './tags/list'

function renderCurrentView(state) {
  switch (state.currentView.name) {
    case 'post_list': return <PostListPage state={state} />
    case 'post_detail': return <PostEditPage state={state} />
    case 'tag_list': return <TagsListPage state={state} />
    case 'tag_detail': return <TagsEditPage state={state} />
  }
}
