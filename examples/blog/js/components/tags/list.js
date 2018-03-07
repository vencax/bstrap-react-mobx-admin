/* global confirm, alert */
import React from 'react'
import { Button } from 'react-bootstrap'

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

  const DetailLink = ({val, row}) => (
    <a href='javascript:void(0)' onClick={() => store.detailClicked(row)}>{val}</a>
  )

  function fieldCreator (attr, row) {
    const val = row[attr]
    switch (attr) {
      case 'name': return <DetailLink row={row} val={val} />
      case 'published': return <BoolField attr={attr} val={val} />
      default: return val
    }
  }

  return (
    <ListView store={store.cv} fieldCreator={fieldCreator}
      onAddClicked={store.addClicked.bind(store)}
      listActionDelete={listActionDelete} listActions={listActions} />
  )
}

export default TagListView
