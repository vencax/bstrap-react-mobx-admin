import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

function paginationRange (page, perPage, total) {
  const input = []
  const nbPages = Math.ceil(total / perPage) || 1

  // display page links around the current page
  if (page > 2) {
    input.push('1')
  }
  if (page === 4) {
    input.push('2')
  }
  if (page > 4) {
    input.push('.')
  }
  if (page > 1) {
    input.push(page - 1)
  }
  input.push(page)
  if (page < nbPages) {
    input.push(page + 1)
  }
  if (page === (nbPages - 3)) {
    input.push(nbPages - 1)
  }
  if (page < (nbPages - 3)) {
    input.push('.')
  }
  if (page < (nbPages - 1)) {
    input.push(nbPages)
  }

  return input
}

const Pagination = observer(({ store, onChange }) => {
  //
  const totalItems = store.totalItems
  const qpars = store.routerStore.queryParams
  const page = qpars ? parseInt(qpars._page) : 1
  const perPage = parseInt(qpars._perPage) || 1
  const nbPages = Math.ceil(totalItems / perPage) || 1
  const offsetEnd = Math.min(page * perPage, totalItems)
  const offsetBegin = Math.min((page - 1) * perPage + 1, offsetEnd)
  const displayPagination = perPage < totalItems

  const pageRange = paginationRange(page, perPage, totalItems)
    .map(pageNum => pageNum === '.' ? '' : (
      <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
        <a className='page-link' href='javascript:void(0)' onClick={() => onChange(pageNum)}>{pageNum}</a>
      </li>
    ))

  return (nbPages > 1) ? (
    <ul className='pagination'>
      {page > 1 &&
        <li key='prev' className='page-item'>
          <a className='page-link' href='javascript:void(0)' aria-label='Previous' onClick={() => onChange(page - 1)}>
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </a>
        </li>
      }
      {pageRange}
      {page !== nbPages &&
        <li key='next' className='page-item'>
          <a className='page-link' href='javascript:void(0)' aria-label='Previous' onClick={() => onChange(page + 1)}>
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Previous</span>
          </a>
        </li>
      }
    </ul>
  ) : null
})
Pagination.propTypes = {
  store: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

const PageInfo = observer(({ info, query }) => {
  const totalItems = info.totalItems
  const page = query ? parseInt(query._page) : 1
  const perPage = parseInt(query._perPage) || 1
  const offsetEnd = Math.min(page * perPage, totalItems)
  const offsetBegin = Math.min((page - 1) * perPage + 1, offsetEnd)

  return (<p className='pagination'>{offsetBegin}-{offsetEnd} of {totalItems}</p>)
})

export default { Pagination, PageInfo }
