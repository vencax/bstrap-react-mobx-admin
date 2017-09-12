import React from 'react'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

const BStrapDateInput = ({attr, label, record, onChange, errors, validationSuccess}) => {
  function handleChange (value) {
    onChange(attr, value)
  }

  const errorText = errors ? errors.get(attr) : undefined
  const validationState = errorText ? 'error' : (validationSuccess ? 'success' : null)

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <DatePicker
        dateFormat='YYYY-MM-DD'
        dropdownMode='select'
        locale='en-gb'
        onChange={handleChange}
        peekNextMonth
        placeholderText='Enter date'
        selected={moment(record.get(attr)).isValid() ? moment(record.get(attr)) : ''}
        showMonthDropdown
        showWeekNumbers
        showYearDropdown
        />
      {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
    </FormGroup>
  )
}

BStrapDateInput.propTypes = {
  attr: React.PropTypes.string.isRequired,
  record: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
}

export default observer(BStrapDateInput)
