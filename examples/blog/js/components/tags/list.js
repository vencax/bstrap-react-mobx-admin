import React from 'react'
import { observer } from 'mobx-react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import TextField from 'bstrap-react-mobx-admin/field/text'
import DateField from 'bstrap-react-mobx-admin/field/date'
import MUIBoolField from 'bstrap-react-mobx-admin/field/bool'
import ListView from 'bstrap-react-mobx-admin/view/list'


const TagListView = ({state}) => {

  const batchActions = () => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected tags?`)) {
        state.deleteSelected(state.currentView)
      }
    }
    return (
      <DropdownButton title="actions" id="bg-nested-dropdown">
        <MenuItem eventKey="1" onClick={() => _batchDelete()}>delete</MenuItem>
      </DropdownButton>
    )
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} record={row} />),
    (attr, row) => {
      return <TextField attr={attr} record={row} onClick={() => state.currentView.detailClicked(row)} />
    },
    (attr, row) => (<MUIBoolField attr={attr} record={row} />)
  ]

  return (
    <ListView state={state} fields={fields}
      batchActions={batchActions} onAddClicked={state.currentView.addClicked} />

  )

}

export default observer(TagListView)
