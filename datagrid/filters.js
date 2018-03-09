import React from 'react'
import {observer} from 'mobx-react'
import {
  DropdownButton, MenuItem, Button, InputGroup, Tooltip, OverlayTrigger
} from 'react-bootstrap'
import FilterBases from 'react-mobx-admin/components/datagrid/filters'

// dropdown with available filters
const Dropdown = ({store, filters}) => {
  return (
    <DropdownButton title='filters' pullRight id='bg-nested-dropdown'>
      {
        filters.map((i, idx) => (
          <MenuItem key={i.attr} eventKey={idx} onClick={() => store.showFilter()}>
            {i.title()}
          </MenuItem>
        ))
      }
    </DropdownButton>
  )
}

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

// controls to set filter values
const Controls = ({filters, store}) => {
  return null
  return (
    <ul>
      {
        filters().map((i, idx) => {
          const {Component, title, ...rest} = i
          return (
            <div key={idx}>
              <span>{title()}</span>
              <Component record={store.filters} store={store} {...rest} />
            </div>
          )
        })
      }
    </ul>
  )
  // return (
  //   <div className={`form-field form-group filter-${name}`} style={styles.chip} key={name}>
  //     <OverlayTrigger placement="right" overlay={toolTip}>
  //       <strong>{filter.title || name}</strong>
  //     </OverlayTrigger>
  //     <InputGroup>
  //       <Button onClick={onHide} style={{float: 'left'}}>x</Button>
  //       <div style={{float: 'right'}}>
  //         <filter.component record={state.filters} attr={name} onChange={onUpdateValue}
  //           onKeyPress={(e) => {
  //             if (e.charCode === 13) {
  //               e.preventDefault()
  //               state.applyFilters()
  //             }
  //           }} />
  //       </div>
  //     </InputGroup>
  //   </div>
  // )
}

const Apply = observer(({ apply, label, state }) => {
  const show = state.filters.size > 0 && ! state.filtersApplied
  return show && (<Button onClick={apply}>{label}</Button>)
})


const FilterRow = (filterCreator, store) => {
  return store.attrs.map(attr => {
    const filter = filterCreator(attr)
    if (!filter) return null
    const {typ, Component, ...rest} = filter
    const filtername = typ ? attr + typ : attr
    return (
      <Component store={store} attr={filtername} isTableFilter {...rest} />
    )
  })
}

export default { Dropdown, Controls, Apply, FilterRow }
