import React from 'react'
import PropTypes from 'prop-types'

const BStrapTextField = ({record, attr, onClick}) => {

  const val = (<span>{record[attr]}</span>)

  return val && (onClick ? (<a href="javascript:void(0)" onClick={onClick}>{val}</a>) : val)
}

BStrapTextField.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired
}

export default BStrapTextField
