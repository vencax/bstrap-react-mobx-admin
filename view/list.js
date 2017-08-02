import React from 'react'
import PropTypes from 'prop-types'
import Datagrid from '../datagrid/datagrid'
import Filters from '../datagrid/filters'
import Pagination from '../datagrid/pagination'
import DatagridActions from 'react-mobx-admin/components/common/datagrid/actions'
import { observer } from 'mobx-react'
import { DropdownButton, MenuItem, Button, ButtonGroup } from 'react-bootstrap'


const BStrapListView = ({
  store, onAddClicked, fields, filters, listActions, batchActions, renderOuter
}) => {

  const cv = store.cv

  function onSelectionChange(selection) {
    if(selection === 'all') {
      store.selectAll()
    } else if(selection.length === 0) {
      store.updateSelection([])
    } else { // we have receive index of selected item
      // so toggle the selection of da index
      store.toggleIndex(selection)
    }
  }

  function isSelected(idx) {
    return cv.selection.indexOf(idx) >= 0
  }

  const allSelected = cv.selection.length > 0 && cv.selection.length === cv.items.length

  const filtersRender = (filters && ! cv.loading) ? (
    <Filters.Controls state={store}
      hideFilter={store.hideFilter.bind(store)} filters={filters} />
  ) : null
  const pagination = (
    <div className="card-block">
      <div className="pull-right">
        <Pagination.Pagination store={store} onChange={store.updatePage.bind(store)} />
      </div>
      <div className="pull-left">
        <Pagination.PageInfo info={cv} query={store.router.queryParams} />
      </div>
    </div>
  )

  const result = (
    <div className="card">
      <div className="card-block">
        <div className="pull-right">
          <ButtonGroup>
            <Filters.Apply state={store} label={'apply filters'} apply={store.applyFilters.bind(store)} />
            {batchActions && (<DatagridActions state={store} actions={batchActions} />)}
            {filters && (
              <Filters.Dropdown state={store} title="addfilter" filters={filters}
                showFilter={store.showFilter.bind(store)} />
            )}
            {onAddClicked && <Button onClick={()=>onAddClicked(store)}>{cv.addText || '+'}</Button>}
          </ButtonGroup>
        </div>
        {cv.title ? <h4 className="card-title">{cv.title}</h4> : null}
      </div>
      { filtersRender }
      <div className="card-block">
        <Datagrid state={cv} attrs={cv.attrs}
          titles={cv.headertitles} fields={fields}
          rowId={(row)=>row[cv.pkName]}
          listActions={listActions}
          onSort={store.updateSort.bind(store)} sortstate={store.router.queryParams}
          onRowSelection={onSelectionChange} isSelected={isSelected}
          allSelected={allSelected} filters={filters}
          updateFilterVal={store.updateFilterValue.bind(store)}
          applyFilters={store.applyFilters.bind(store)}
          hideFilter={store.hideFilter.bind(store)}
          isFilterApplied={(filtername)=>{
            return filtername in store.appliedFilters
          }}/>
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
