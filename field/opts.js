import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const BStrapOptionsField = ({
  record, attr, onClick, optionsrecord, optionsattr, valueattr, labelattr
}) => {
  const val = record[attr]
  const options = optionsrecord.get(optionsattr || attr)
  const found = options && options.filter((i) => {
    return i[valueattr || 'value'] === val
  })
  if(found && found.length > 0) {
    const text = (typeof labelattr === "function") ?
      labelattr(found[0]) : found[0][labelattr || 'label']
    return onClick ? (
      <a href="javascript:void(0)" onClick={onClick}>{text}</a>
    ) : (<span>{text}</span>)
  }
  return null
}

BStrapOptionsField.propTypes = {
  attr: PropTypes.any.isRequired,
  record: PropTypes.object.isRequired,
  optionsrecord: PropTypes.object.isRequired,
  optionsattr: PropTypes.string,
  labelattr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  valueattr: PropTypes.string,
  onClick: PropTypes.func
}

export default observer(BStrapOptionsField)
