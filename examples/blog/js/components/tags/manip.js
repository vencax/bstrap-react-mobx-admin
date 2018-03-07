import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import TextInput from 'bstrap-react-mobx-admin/input/text'
import BoolInput from 'bstrap-react-mobx-admin/input/bool'
import CHBoxSelect from 'bstrap-react-mobx-admin/input/chbox_multiselect'
import OptionSelect from 'bstrap-react-mobx-admin/input/option_select'
import EditView from 'bstrap-react-mobx-admin/view/edit'
import ManipStore from 'react-mobx-admin/store/manip'

const ValueVisualizer = observer(({record, attr}) => {
  return <span>{JSON.stringify(record.get(attr))}</span>
})

const TagEditForm = ({store, __}) => {
  const record = store.record
  const errors = store.errors
  const updateField = store.updateData.bind(store)
  const disabled = Number(record.get('id')) % 2 === 0
  const opts = [{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}]
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={__('name')} attr={'name'} record={record} onChange={updateField}
          errors={errors} disabled={disabled} />
        <BoolInput label={__('Published')} attr={'published'} record={record}
          disabled={disabled} onChange={updateField} />
        <OptionSelect label={__('Test option based selection')}
          attr={'optselect'} record={record}
          disabled={disabled} onChange={updateField} errors={errors}
          options={opts} />
        <CHBoxSelect label={__('Test comma separated multival')}
          attr={'chbox'} record={record}
          disabled={disabled} onChange={updateField} errors={errors}
          options={opts} />
        <span>
          Current val: <ValueVisualizer record={record} attr='chbox' />
        </span>
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: PropTypes.instanceOf(ManipStore).isRequired,
  __: PropTypes.func.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store.cv}
    onReturn2list={store.onReturn2list.bind(store)}
    buttonOnTop={false}>
    <TagEditForm store={store.cv} __={store.__.bind(store)} />
  </EditView>
)
export default TagsEditView
