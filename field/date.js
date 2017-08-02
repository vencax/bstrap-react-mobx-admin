import React from 'react'
import PropTypes from 'prop-types'

const BStrapDateField = ({record, attr, onClick}) => {
  if (! record[attr]) {
    return null
  }
  const d = record[attr] instanceof Date ? d : new Date(record[attr])
  const val = (<span>{d.toLocaleDateString()}</span>)

  return val && (onClick ?
    (<a href="javascript:void(0)" onClick={onClick}>{val}</a>) : val)
}

BStrapDateField.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired
}

export default BStrapDateField
