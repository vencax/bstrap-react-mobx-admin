/* global marked */
import React from 'react'
import { observer } from 'mobx-react'
import DateInput from 'bstrap-react-mobx-admin/input/date'
import TextInput from 'bstrap-react-mobx-admin/input/text'
import SelectInput from 'bstrap-react-mobx-admin/input/select'
import EditView from 'bstrap-react-mobx-admin/view/edit'

const MDPreview = observer(({state}) => {
  const value = state.record.get('content')
  return value ? <div dangerouslySetInnerHTML={{__html: marked(value)}} /> : null
})

const PostEditForm = ({store, options, __}) => {
  const record = store.record
  const errors = store.errors
  const updateField = store.updateData.bind(store)
  const disabled = Number(record.get('id')) % 2 === 0
  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
        <TextInput label={__('title')} attr={'title'} record={record}
          onChange={updateField} errors={errors} disabled={disabled}
          showError={false} />
        <SelectInput label={__('Category')} attr={'category'} record={record}
          optionsrecord={options}
          optionsattr={'categories'}
          onChange={updateField}
          errors={errors} disabled={disabled} />
        <DateInput label={__('published')} attr={'published_at'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
        <DateInput label={__('unpublished')} attr={'unpublished_at'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
        <TextInput componentClass='textarea'
          label={__('content')} attr={'content'} record={record}
          onChange={updateField} errors={errors} disabled={disabled} />
      </div>
      <div className='col-xs-12 col-md-6 col-lg-6'>
        <MDPreview state={store} />
      </div>
    </div>
  )
}

const PostEditView = ({store}) => (
  <EditView store={store.cv} onReturn2list={store.onReturn2list.bind(store)}>
    <PostEditForm store={store.cv}
      __={store.__.bind(store)} options={store.options} />
  </EditView>
)
export default PostEditView
