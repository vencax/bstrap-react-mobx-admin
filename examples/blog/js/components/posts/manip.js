import React from 'react'
import { observer } from 'mobx-react'
import DateInput from 'bstrap-react-mobx-admin/input/date'
import TextInput from 'bstrap-react-mobx-admin/input/text'
import SelectInput from 'bstrap-react-mobx-admin/input/select'
import EditView from 'bstrap-react-mobx-admin/view/edit'

const MDPreview = observer( ({state}) => {
  const value = state.currentView.entity.get('content')
  return value ? <div dangerouslySetInnerHTML={{__html: marked(value)}} /> : null
})

const PostEditForm = ({state}) => {

  const entity = state.currentView.entity
  const updateField = state.updateData.bind(state)
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <TextInput label={state.__('title')} attr={'title'} record={entity}
          onChange={updateField} errors={state.currentView.errors} />
        <SelectInput label={state.__('Category')} attr={'category'} record={entity}
          optionsrecord={state.options}
          optionsattr={'categories'}
          onChange={updateField}
          errors={state.currentView.errors} />
        <DateInput label={state.__('published')} attr={'published_at'} record={entity}
          onChange={updateField} errors={state.currentView.errors} />
        <DateInput label={state.__('unpublished')} attr={'unpublished_at'} record={entity}
          onChange={updateField} errors={state.currentView.errors} />
        <TextInput componentClass="textarea"
          label={state.__('content')} attr={'content'} record={entity}
          onChange={updateField} errors={state.currentView.errors} />
      </div>
      <div className="col-xs-12 col-md-6 col-lg-6">
        <MDPreview state={state} />
      </div>
    </div>
  )
}

const PostEditView = ({state}) => (
  <EditView state={state}><PostEditForm state={state} /></EditView>
)
export default PostEditView
