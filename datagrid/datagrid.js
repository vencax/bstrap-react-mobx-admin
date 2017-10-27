import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Checkbox, InputGroup, Button } from 'react-bootstrap'
import _ from 'lodash'
import * as TUtils from 'react-mobx-admin/components/common/datagrid/table'

const BStrapHeader = ({label, sort, name, onSort}) => {
  //
  function _onUpClick (e) {
    onSort(name, sort === 'ASC' ? null : 'ASC')
  }
  function _onDownClick (e) {
    onSort(name, sort === 'DESC' ? null : 'DESC')
  }
  return (
    <div>
      <div>{label}&nbsp;</div>
      {onSort && (
        <div className='sort-buttons-box'>
          <Button bsSize='xsmall' bsStyle={sort === 'ASC' ? 'primary' : 'default'} onClick={_onUpClick}>
            <span className='glyphicon glyphicon-chevron-up' />
          </Button>
          <Button bsSize='xsmall' bsStyle={sort === 'DESC' ? 'primary' : 'default'} onClick={_onDownClick}>
            <span className='glyphicon glyphicon-chevron-down' />
          </Button>
        </div>
      )}
    </div>
  )
}
BStrapHeader.propTypes = {
  label: PropTypes.string.isRequired,
  sort: PropTypes.string,
  name: PropTypes.string,
  onSort: PropTypes.func
}

const BStrapDatagrid = ({
  state, attrs, fields, titles, rowId, isSelected, noSort,
  onRowSelection, onSort, sortstate, listActions, allSelected,
  filters, updateFilterVal, applyFilters, hideFilter, isFilterApplied
}) => {
  //
  function _renderHeader (name, label, sort, onSort) {
    let filtername = null
    const filter = filters && _.find(filters, (v, k) => {
      filtername = k
      return k.indexOf(name) >= 0
    })
    return (
      <th key={`th_${name}`}>
        <BStrapHeader
          sort={sort} name={name} label={label}
          onSort={onSort && !(noSort && noSort.some(n => n === name))} />
        {filter ? (
          <InputGroup>
            {
              isFilterApplied(filtername)
              ? <Button onClick={() => hideFilter(filtername)} style={{float: 'left'}}>x</Button>
              : null
            }
            <div style={{float: 'right'}}>
              <filter.component record={state.filters}
                attr={filtername} onChange={updateFilterVal} onKeyPress={(e) => {
                  if (e.charCode === 13) {
                    e.preventDefault()
                    applyFilters()
                  }
                }} />
            </div>
          </InputGroup>
        ) : null}
      </th>
    )
  }

  const listActionsRender = listActions ? (
    <th key={'_actions'}>{ listActions() }</th>
  ) : null

  function _renderCell (row, name, creatorFn, rowId) {
    return (
      <td key={`td_${rowId}_${name}`}>
        {creatorFn(name, row)}
      </td>
    )
  }

  function _renderRowActions (row) {
    return listActions ? (
      <td key={'datagrid-actions'}>{listActions(row)}</td>
    ) : null
  }

  function _onSelectAll (e) {
    e.target.checked ? onRowSelection('all') : onRowSelection([])
  }

  const selectable = onRowSelection !== undefined && isSelected !== undefined

  let tableChildren = state.loading ? (
    <tr><td>Loading...</td></tr>
  ) : state.items.length === 0 ? (
    <tr><td>EMPTY</td></tr>
  ) : state.items.map((r, i) => {
    const id = rowId(r)
    const selected = selectable && isSelected(i)
    return (
      <tr selected={selected} key={i}>
        { selectable ? (
          <td key='chbox'>
            <Checkbox checked={selected} inline={true} onChange={() => onRowSelection(i)}></Checkbox>
          </td>
        ) : null }
        {TUtils.buildCells(attrs, fields, r, rowId, _renderCell, _renderRowActions)}
      </tr>
    )
  })

  return (
    <table className='table table-sm'>
      {titles ? (
        <thead>
          <tr>
            { selectable ? <th key='chbox'>
              <Checkbox checked={allSelected} inline={true} bsClass='btn'
                onChange={_onSelectAll}></Checkbox>
            </th> : null }
            {
              TUtils.buildHeaders(attrs, titles, _renderHeader, listActionsRender,
                onSort, sortstate, noSort)
            }
          </tr>
        </thead>
      ) : null}
      <tbody>{tableChildren}</tbody>
    </table>
  )
}
export default observer(BStrapDatagrid)
