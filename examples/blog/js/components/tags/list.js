/* global confirm */
import React from 'react'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'

import TextField from 'react-mobx-admin/components/field/text'
import BoolField from 'bstrap-react-mobx-admin/field/bool'
import ListView from 'bstrap-react-mobx-admin/view/list'

const TagListView = ({store}) => {
  //
  const listActions = (row) => {
    function _deleteRow (row) {
      if (confirm(`Are you sure you want to delete ${row.title}?`)) {
        store.cv.deleteData([row])
      }
    }
    return row ? (
      <div>
        <Button onClick={(e) => _deleteRow(row)}>delete</Button>
      </div>
    ) : null
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
      onAddClicked={store.addClicked.bind(store)}
      listActionDelete={listActionDelete} listActions={listActions} />
  )
}

export default TagListView
