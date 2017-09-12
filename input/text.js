import React from 'react'
import { observer } from 'mobx-react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const TextInput = ({attr, record, label, onChange, errors, validationSuccess, dateFormat, ...rest}) => {
  function handleChange (event) {
    onChange(attr, event.target.value)
  }

  function formateDate ({ date = new Date(), separator = '-', order = ['year', 'month', 'day'] }) {
    let obj = {
      'year': date.getFullYear(),
      'month': (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1),
      'day': (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate()
    }
    return `${obj[order[0]]}${separator}${obj[order[1]]}${separator}${obj[order[2]]}`
  }

  const errorText = errors ? errors.get(attr) : undefined
  const validationState = errorText ? 'error' : (validationSuccess ? 'success' : null)
  let value = record.get(attr)

  if (dateFormat) {
    var date = new Date(value)
    if ((Object.prototype.toString.call(date) !== '[object Date]') || isNaN(date.getTime())) {
      // console.log('Invalid date format!')
    } else {
      value = formateDate({date})
    }
  }

  return (
    <FormGroup controlId={attr} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass='input' name={attr}
        value={typeof value === 'undefined' || value === null ? '' : value}
        onChange={handleChange} {...rest} />
      <FormControl.Feedback />
      {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
    </FormGroup>
  )
}

TextInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}

export default observer(TextInput)
