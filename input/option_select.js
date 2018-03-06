import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {Radio, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'

const OptionSelect = ({attr, record, onChange, errors, label, disabled}) => {
  const val = record.get(attr)
  const errorText = errors.has(attr) ? errors.get(attr) : undefined
  const validationState = errorText ? 'error' : null

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <div>
        <Radio name={attr} checked={val === 1} disabled={disabled} inline
          onClick={() => onChange(attr, 1)}>
          ANO
        </Radio>{' '}
        <Radio name={attr} checked={val === 0} disabled={disabled} inline
          onClick={() => onChange(attr, 0)}>
          NE
        </Radio>
      </div>
      {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
    </FormGroup>
  )
}
OptionSelect.propTypes = {
  attr: PropTypes.string.isRequired,
  errors: PropTypes.object,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
}
export default observer(OptionSelect)
