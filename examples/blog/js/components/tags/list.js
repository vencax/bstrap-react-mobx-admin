/* global confirm, alert */
import React from 'react'
import { Button } from 'react-bootstrap'

import TextFilterControl from 'bstrap-react-mobx-admin/filtercontrols/text'
import SelectFilterControl from 'bstrap-react-mobx-admin/filtercontrols/select'

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
  const listActionLeft = (row) => row ? (
    <Button onClick={() => alert(JSON.stringify(row))}>alert row</Button>
  ) : null

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

  function tableFilters (attr) {
    switch (attr) {
      case 'published': return {
        Component: SelectFilterControl,
        options: [
          {label: 'published', value: 'true'},
          {label: 'unpublished', value: 'false'}
        ]
      }
      case 'name': return {typ: '_like', Component: TextFilterControl}
    }
  }

  const CustomTR = ({children, ...rest}) => (
    <tr style={{background: '#fec'}} {...rest}>{children}</tr>
  )
  const CustomTD = ({children, ...rest}) => (
    <td style={{borderBottom: '1px solid brown'}} {...rest}>{children}</td>
  )
  return (
    <ListView store={store.cv} fieldCreator={fieldCreator}
      tableFilters={tableFilters}
      onAddClicked={store.addClicked.bind(store)}
      listActionLeft={listActionLeft} listActions={listActions}
      TRComponent={CustomTR} TDComponent={CustomTD} />
  )
}

export default TagListView
