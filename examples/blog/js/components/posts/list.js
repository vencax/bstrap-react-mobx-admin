import React from 'react'
// import { observer } from 'mobx-react'
import { asMap } from 'mobx'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import OptionsField from 'react-mobx-admin/components/common/field/opts_observed'
import MultivalueField from 'react-mobx-admin/components/common/field/multivalue'
import TextField from 'bstrap-react-mobx-admin/field/text'
import DateField from 'bstrap-react-mobx-admin/field/date'

import TextInput from 'bstrap-react-mobx-admin/input/text'  // for filters
import SelectInput from 'bstrap-react-mobx-admin/input/select'

import ListView from 'bstrap-react-mobx-admin/view/list'


const PostListView = ({store}) => {

  const _tagOptionComponent = ({attr, record}) => {
    function onClick() {
      store.showTagDetail(record[attr])
    }
    const _tagComponent = ({text}) => (
      <Button style={{float: 'left'}} onClick={onClick}>{text}</Button>
    )
    return <OptionsField attr={attr} record={record}
      optionsrecord={store.options} optionsattr={'tags'}
      labelattr={'name'} valueattr={'id'} Component={_tagComponent} />
  }

  const batchActions = (store) => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected items?`)) {
        store.deleteSelected()
      }
    }
    return (
      <DropdownButton title="actions" id="bg-nested-dropdown">
        <MenuItem eventKey="1" onClick={() => _batchDelete()}>delete</MenuItem>
      </DropdownButton>
    )
  }

  const listActions = (row) => {
    function _deleteRow(row) {
      if(confirm(`Are you sure you want to delete ${row.title}?`)) {
        store.deleteData([row])
      }
    }
    return row ? (
      <div>
        <Button onClick={(e)=>  _deleteRow(row)}>delete</Button>
      </div>
    ) : null
  }

  const _tagComponent = ({value, ...rest}) => {
    return <TagField key={value.id} attr={'a'} record={asMap({a:value.name})}
      optionsrecord={store.options} optionsattr={'tags'}
      labelattr={'name'} valueattr={'id'} />
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} record={row} />),
    (attr, row) => {
      return (<TextField attr={attr} record={row} onClick={() => store.detailClicked(row)}/>)
    },
    (attr, row) => (
      <OptionsField attr={attr} record={row} optionsrecord={store.options} optionsattr={'categories'} />
    ),
    (attr, row) => (<DateField attr={attr} record={row} />),
    (attr, row) => (<div><MultivalueField items={row[attr]} Item={_tagOptionComponent} /></div>)
  ]

  const filters = {
    'category': {title: 'Category', icon: null, component: (props) => (<SelectInput {...props}
      optionsrecord={store.options}
      optionsattr={'categories'} />)},
    'title_like': {title: 'Title', icon: null, component: (props) => (<TextInput {...props} />)}
  }

  return (
    <ListView store={store} fields={fields} listActions={listActions} filters={filters}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />
  )

}

export default PostListView
