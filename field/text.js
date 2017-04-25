import React from 'react'

const BStrapTextField = ({record, attr, onClick}) => {

  const val = (<span>{record[attr]}</span>)

  return val && (onClick ? (<a href="javascript:void(0)" onClick={onClick}>{val}</a>) : val)
}

BStrapTextField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}

export default BStrapTextField
