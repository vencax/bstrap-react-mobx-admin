import React from 'react'

const BStrapDateField = ({record, attr, onClick}) => {
  const d = record[attr] instanceof Date ? d : new Date(record[attr])
  const val = (<span>{d.toLocaleDateString()}</span>)

  return val && (onClick ?
    (<a href="javascript:void(0)" onClick={onClick}>{val}</a>) : val)
}

BStrapDateField.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired
}

export default BStrapDateField
