import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Checkbox, Button } from 'react-bootstrap'
import {
  buildHeaders, buildCells
} from 'react-mobx-admin/components/datagrid/table'

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
  onRowSelection, onSort, sortstate, listActions, listActionDelete, allSelected,
  filters
}) => {
  //
  function _renderHeader (name, label, sort, onSort) {
    return (
      <th key={`th_${name}`}>
        <BStrapHeader
          sort={sort} name={name} label={label}
          onSort={noSort && noSort.some(n => n === name) ? null : onSort} />
      </th>
    )
  }

  function _renderCell (row, name, creatorFn, rowId) {
    return (
      <td key={`td_${rowId}_${name}`}>
        {creatorFn(name, row)}
      </td>
    )
  }

  function _onSelectAll (e) {
    e.target.checked ? onRowSelection('all') : onRowSelection([])
  }

  const selectable = onRowSelection !== undefined && isSelected !== undefined

  let tableChildren = state.loading ? (
    <tr><td><span className='glyphicon glyphicon-refresh glyphicon-refresh-animate' /> Loading...</td></tr>
  ) : state.items.length === 0 ? (
    <tr><td>EMPTY</td></tr>
  ) : state.items.map((r, i) => {
    const selected = selectable && isSelected(i)
    return (
      <tr selected={selected} key={i}>
        {
          selectable ? (
            <td key='chbox'>
              <Checkbox checked={selected} inline onChange={() => onRowSelection(i)} />
            </td>
          ) : null
        }
        {
          buildCells(attrs, fields, r, rowId, _renderCell)
        }
        {
          listActions ? (<td key={'lst-acts'}>{listActions(r)}</td>) : null
        }
      </tr>
    )
  })

  return (
    <table className='table table-sm'>
      {titles ? (
        <thead>
          <tr>
            {
              selectable ? (
                <th key='chbox'>
                  <Checkbox checked={allSelected} inline bsClass='btn'
                    onChange={_onSelectAll} />
                </th>
              ) : null
            }
            {
              listActionDelete ? (
                <th key={'_actions-delete'}>{ listActionDelete() }</th>
              ) : null
            }
            {
              buildHeaders(attrs, titles, _renderHeader, onSort, sortstate, noSort)
            }
            {
              listActions ? (<th key={'_actions'}>{ listActions() }</th>) : null
            }
          </tr>
          {
            filters ? (
              <tr className='filter-row'>
                {
                  selectable ? <th key='s' /> : null
                }
                {
                  listActionDelete ? <th key='lid' /> : null
                }
                {
                  filters.map((i, idx) => <th key={idx}>{i}</th>)
                }
                {
                  listActions ? <th key='li' /> : null
                }
              </tr>
            ) : null
          }
        </thead>
      ) : null}
      <tbody>{tableChildren}</tbody>
    </table>
  )
}
export default observer(BStrapDatagrid)
