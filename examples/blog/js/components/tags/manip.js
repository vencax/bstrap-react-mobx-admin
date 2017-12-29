import React from 'react'
import PropTypes from 'prop-types'
// import { observer } from 'mobx-react'
import TextInput from 'bstrap-react-mobx-admin/input/text'
import BoolInput from 'bstrap-react-mobx-admin/input/bool'
import EditView from 'bstrap-react-mobx-admin/view/edit'

const TagEditForm = ({store}) => {
  const record = store.cv.record
  const errors = store.cv.errors
  const updateField = store.cv.updateData.bind(store.cv)
  const disabled = Number(record.get('id')) % 2 === 0
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={store.__('name')} attr={'name'} record={record} onChange={updateField}
          errors={errors} disabled={disabled} />
        <BoolInput label={store.__('Published')} attr={'published'} record={record}
          disabled={disabled} onChange={updateField} />
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: PropTypes.object.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store.cv} onReturn2list={store.onReturn2list.bind(store)}>
    <TagEditForm store={store} />
  </EditView>
)
export default TagsEditView
