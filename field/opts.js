import React from 'react'
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
  attr: React.PropTypes.any.isRequired,
  record: React.PropTypes.object.isRequired,
  optionsrecord: React.PropTypes.object.isRequired,
  optionsattr: React.PropTypes.string,
  labelattr: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  valueattr: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default observer(BStrapOptionsField)
