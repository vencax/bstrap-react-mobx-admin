import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger, Tooltip } from 'react-bootstrap'

const SelectInput = ({
    attr, labelattr, valueattr, label, record, valueFilterFc,
    optionsrecord, optionsattr, errors, onChange, validationSuccess, ...rest
  }) => {
  const errorText = errors ? errors.get(attr) : undefined
  const validationState = errorText ? 'error' : (validationSuccess ? 'success' : null)
  const value = record.get(attr)
  const options = optionsrecord.get(optionsattr || attr)
  valueattr = valueattr || 'value'

  function handleChange (evt) {
    if (evt.target.value.length === 0) {
      return onChange(attr, null)
    }
    const foundOpt = options
      .find((i) => i[valueattr].toString() === evt.target.value)
    onChange(attr, foundOpt[valueattr])
  }

  function renderOptions (options, labelattr, valueattr, valueFilterFc) {
    let opts = [<option key={'_null__'} value={''} />]
    let idx, val, c
    for (idx = 0; idx < options.length; idx++) {
      val = options[idx]

      let jumpToNext = valueFilterFc && valueFilterFc(val)
      if (jumpToNext) continue

      const text = (typeof labelattr === 'function') ? labelattr(val) : val[labelattr]
      c = <option key={idx} value={val[valueattr]}>{text}</option>
      opts.push(c)
    }
    return opts
  }

  const toolTip = optionsattr && options && (
    <Tooltip id={optionsattr}>
      {options[0] && options[0].hasOwnProperty('parent') && options[0].hasOwnProperty('text')
        ? 'Enum ID: '
        : 'Entity ID: '}
      <strong>{optionsattr}</strong>
    </Tooltip>
  )
  const renderedOpts = options && options.length &&
    renderOptions(options, labelattr || 'label', valueattr, valueFilterFc)
  return (
    <FormGroup controlId={attr} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      {label && optionsattr && options &&
        <OverlayTrigger placement='right' overlay={toolTip}>
          <span className='glyphicon glyphicon-list-alt' style={{fontSize: '0.75em', marginLeft: '0.7em'}}></span>
        </OverlayTrigger>}
      <FormControl componentClass='select' placeholder='select'
        value={value || ''} onChange={handleChange} {...rest}>
        {renderedOpts}
      </FormControl>
      {errorText ? <HelpBlock>{errorText}</HelpBlock> : null}
    </FormGroup>
  )
}

SelectInput.propTypes = {
  attr: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  labelattr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  valueattr: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  optionsrecord: PropTypes.object.isRequired,
  optionsattr: PropTypes.string,
  errors: PropTypes.object
}

export default observer(SelectInput)
