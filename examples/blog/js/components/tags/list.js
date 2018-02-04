/* global confirm */
import React from 'react'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import TextField from 'react-mobx-admin/components/field/text'
import BoolField from 'bstrap-react-mobx-admin/field/bool'
import ListView from 'bstrap-react-mobx-admin/view/list'

const TagListView = ({store}) => {
  //
  const batchActions = () => {
    function _batchDelete () {
      if (confirm(`Are you sure you want to delete selected tags?`)) {
        store.cv.deleteSelected()
      }
    }
    return (
      <DropdownButton title='actions' id='bg-nested-dropdown'>
        <MenuItem eventKey='1' onClick={() => _batchDelete()}>delete</MenuItem>
      </DropdownButton>
    )
  }

  const listActionDelete = (row) => <Button onClick={() => alert(row)} />

  const fields = [
    (attr, row) => (<TextField attr={attr} val={row[attr]} />),
    (attr, row) => {
      const DetailLink = ({text}) => (
        <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{text}</a>
      )
      return <TextField attr={attr} val={row[attr]} Component={DetailLink} />
    },
    (attr, row) => (<BoolField attr={attr} val={row[attr]} />)
  ]

  return (
    <ListView store={store.cv} fields={fields}
      batchActions={batchActions}
      onAddClicked={store.addClicked.bind(store)}
      listActionDelete={listActionDelete} />
  )
}

export default TagListView
