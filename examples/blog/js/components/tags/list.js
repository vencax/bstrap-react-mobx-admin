import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import TextField from 'react-mobx-admin/components/common/field/text'
import BoolField from 'bstrap-react-mobx-admin/field/bool'
import ListView from 'bstrap-react-mobx-admin/view/list'


const TagListView = ({store}) => {

  const batchActions = () => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected tags?`)) {
        store.deleteSelected()
      }
    }
    return (
      <DropdownButton title="actions" id="bg-nested-dropdown">
        <MenuItem eventKey="1" onClick={() => _batchDelete()}>delete</MenuItem>
      </DropdownButton>
    )
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} val={row[attr]} />),
    (attr, row) => {
      return <TextField attr={attr} val={row[attr]} onClick={() => store.detailClicked(row)} />
    },
    (attr, row) => (<BoolField attr={attr} val={row[attr]} />)
  ]

  return (
    <ListView store={store} fields={fields}
      batchActions={batchActions} onAddClicked={store.addClicked.bind(store)} />

  )

}

export default TagListView
