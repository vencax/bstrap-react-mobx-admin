/* global alert, confirm */
import React from 'react'
// import { observer } from 'mobx-react'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import DateField from 'react-mobx-admin/components/field/date'

import TextFilterControl from 'bstrap-react-mobx-admin/filtercontrols/text'
import SelectFilterControl from 'bstrap-react-mobx-admin/filtercontrols/select'
import ListView from 'bstrap-react-mobx-admin/view/list'

const PostListView = ({store}) => {
  //
  const _tagOptionComponent = ({attr, val}) => {
    function onClick () {
      alert('clicked tag ' + val)
    }
    const _tagComponent = ({text}) => (
      <Button style={{float: 'left'}} onClick={onClick}>{text}</Button>
    )
    return <OptionsField attr={attr} val={val}
      options={store.options.tags}
      labelattr={'name'} valueattr={'id'} Component={_tagComponent} />
  }

  const batchActions = (store) => {
    function _batchDelete () {
      if (confirm(`Are you sure you want to delete selected items?`)) {
        store.cv.deleteSelected()
      }
    }
    return (
      <DropdownButton title='actions' id='bg-nested-dropdown'>
        <MenuItem eventKey='1' onClick={() => _batchDelete()}>delete</MenuItem>
      </DropdownButton>
    )
  }

  const DetailLink = ({val, row}) => (
    <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{val}</a>
  )

  function fieldCreator (attr, row) {
    const val = row[attr]
    switch (attr) {
      case 'title': return <DetailLink row={row} val={val} />
      case 'category': return (
        <OptionsField attr={attr} val={val} options={store.options.categories()} />
      )
      case ['published_at', 'unpublished_at']: return <DateField attr={attr} val={val} />
      case 'tags': return (
        <div><MultivalueField val={val} Item={_tagOptionComponent} /></div>
      )
      default: return val
    }
  }

  const filters = () => [{
    title: () => 'Title',
    attr: 'title_like',
    Component: TextFilterControl
  }, {
    title: () => <i>Tags</i>,
    attr: 'tag_like',
    Component: SelectFilterControl,
    options: store.options.tags,
    extractOpt: (i) => ({value: i.id, label: i.name})
  }, {
    title: () => 'Category',
    attr: 'category',
    Component: SelectFilterControl,
    options: store.options.categories()
  }]

  function headerCreator (attr) {
    // we just use headertitles in current view and make it bold
    return <b>{store.cv.headertitles(attr)}</b>
  }

  return (
    <ListView store={store.cv}
      filters={filters}
      headerCreator={headerCreator} fieldCreator={fieldCreator}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)}
      options={{
        emptyComponent: () => <b>Nothing found :(</b>
      }} />
  )
}

export default PostListView
