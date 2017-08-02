import React from 'react'
import PropTypes from 'prop-types'

const BStrapBoolField = ({record, attr, valuemapping}) => {
  const val = valuemapping ? valuemapping[record[attr]] : record[attr]
  const checked = Boolean(val)
  return (
    <input className="form-check-input" name={attr} type="checkbox" checked={checked} disabled />
  )
}

BStrapBoolField.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired
}

export default BStrapBoolField
