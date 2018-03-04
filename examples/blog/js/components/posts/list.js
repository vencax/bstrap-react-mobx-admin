/* global alert, confirm */
import React from 'react'
// import { observer } from 'mobx-react'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import OptionsField from 'react-mobx-admin/components/field/opts'
import MultivalueField from 'react-mobx-admin/components/field/multivalue'
import TextField from 'react-mobx-admin/components/field/text'
import DateField from 'react-mobx-admin/components/field/date'

import TextInput from 'bstrap-react-mobx-admin/input/text'  // for filters
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

  // const _tagComponent = ({value, ...rest}) => {
  //   return <TagField key={value.id} attr={'a'} val={value.name}
  //     optionsrecord={store.options} optionsattr={'tags'}
  //     labelattr={'name'} valueattr={'id'} />
  // }

  const fields = [
    (attr, row) => (<TextField attr={attr} val={row[attr]} />),
    (attr, row) => {
      const DetailLink = ({text}) => (
        <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{text}</a>
      )
      return <TextField attr={attr} val={row[attr]} Component={DetailLink} />
    },
    (attr, row) => (
      <OptionsField attr={attr} val={row[attr]} options={store.options.get('categories')} />
    ),
    (attr, row) => (<DateField attr={attr} val={row[attr]} />),
    (attr, row) => (<DateField attr={attr} val={row[attr]} />),
    (attr, row) => (<div><MultivalueField val={row[attr]} Item={_tagOptionComponent} /></div>)
  ]

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

  return (
    <ListView store={store.cv} fields={fields}
      filters={filters}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />
  )
}

export default PostListView
