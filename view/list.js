import React from 'react'
import PropTypes from 'prop-types'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from 'react-mobx-admin/components/common/datagrid/actions'
import { observer } from 'mobx-react'
import { DropdownButton, MenuItem, Button, ButtonGroup } from 'react-bootstrap'

const BStrapListView = ({
  store, onAddClicked, fields, filters, listActions, batchActions, renderOuter, perPageOptions
}) => {
  //
  const nbPages = parseInt(store.totalItems)
  const perPageTitle = store.router.queryParams._perPage || ''
  perPageOptions = perPageOptions || [5, 10, 15, 20, 50, 100]

  function onSelectionChange (selection) {
    if (selection === 'all') {
      store.selectAll()
    } else if (selection.length === 0) {
      store.updateSelection([])
    } else { // we have receive index of selected item
      // so toggle the selection of da index
      store.toggleIndex(selection)
    }
  }

  function isSelected (idx) {
    return store.selection.indexOf(idx) >= 0
  }

  const allSelected = store.selection.length > 0 && store.selection.length === store.items.length

  const filtersRender = (filters && store.state === 'ready') ? (
    <Filters.Controls state={store}
      hideFilter={store.hideFilter.bind(store)} filters={filters} />
  ) : null

  const perPageRender = (
    <DropdownButton className='per-page-select' title={perPageTitle} dropup
      id='dropdown' onSelect={(num) => store.setPerPage(num)}>
      {
        perPageOptions.map((i) => {
          return <MenuItem eventKey={i} key={i}>{i}</MenuItem>
        })
      }
    </DropdownButton>
  )
  const pagination = (
    <div className='card-block'>
      <div className='pull-right'>
        <ButtonGroup>
          <Pagination.Pagination store={store} onChange={store.updatePage.bind(store)} />
        </ButtonGroup>
        {nbPages > 5 && perPageRender}
      </div>
      <div className='pull-left'>
        <div><Pagination.PageInfo info={store} query={store.router.queryParams} /></div>
      </div>
    </div>
  )

  const result = (
    <div className='card'>
      <div className='card-block'>
        <div className='pull-right'>
          <ButtonGroup>
            <Filters.Apply state={store} label={'apply filters'} apply={store.applyFilters.bind(store)} />
            {batchActions && (<DatagridActions state={store} actions={batchActions} />)}
            {filters && (
              <Filters.Dropdown state={store} title='addfilter' filters={filters}
                showFilter={store.showFilter.bind(store)} />
            )}
            {onAddClicked && <Button bsStyle='primary' onClick={() => onAddClicked(store)}>{store.addText || '+'}</Button>}
          </ButtonGroup>
        </div>
        {store.title ? <h4 className='card-title'>{store.title}</h4> : null}
      </div>
      { filtersRender }
      <div className='card-block'>
        <Datagrid state={store} attrs={store.attrs}
          titles={store.headertitles} fields={fields}
          rowId={(row) => row[store.pkName]}
          listActions={listActions}
          onSort={store.updateSort.bind(store)} sortstate={store.router.queryParams}
          noSort={store.noSort}
          onRowSelection={onSelectionChange} isSelected={isSelected}
          allSelected={allSelected} filters={filters}
          updateFilterVal={store.updateFilterValue.bind(store)}
          applyFilters={store.applyFilters.bind(store)}
          hideFilter={store.hideFilter.bind(store)}
          isFilterApplied={(filtername) => {
            return filtername in store.appliedFilters
          }} />
      </div>
      { pagination }
    </div>
  )

  return renderOuter ? renderOuter(result) : result
}

BStrapListView.propTypes = {
  store: PropTypes.object.isRequired,
  renderOuter: PropTypes.func
}
export default observer(BStrapListView)
