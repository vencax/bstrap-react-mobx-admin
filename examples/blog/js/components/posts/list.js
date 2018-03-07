/* global alert, confirm */
import React from 'react'
// import { observer } from 'mobx-react'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import DateField from 'react-mobx-admin/components/field/date'

import TextInput from 'bstrap-react-mobx-admin/input/text'
import SelectInput from 'bstrap-react-mobx-admin/input/select'
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
      options={store.options.get('tags')}
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
        <OptionsField attr={attr} val={row[attr]}
          options={store.options.get('categories')} />
      )
      case ['published_at', 'unpublished_at']: return <DateField attr={attr} val={val} />
      case 'tags': return (
        <div><MultivalueField val={row[attr]} Item={_tagOptionComponent} /></div>
      )
      default: return val
    }
  }

  const filters = {
    'category': {
      title: 'Category',
      icon: null,
      component: (props) => (
        <SelectInput {...props} optionsrecord={store.options} optionsattr={'categories'} />
      )
    },
    'title_like': {
      title: 'Title',
      icon: null,
      component: (props) => (<TextInput {...props} />)
    }
  }

  function headerCreator (attr) {
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
