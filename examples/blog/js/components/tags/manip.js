import React from 'react'
import { observer } from 'mobx-react'
import TextInput from 'bstrap-react-mobx-admin/input/text'
import BoolInput from 'bstrap-react-mobx-admin/input/bool'
import EditView from 'bstrap-react-mobx-admin/view/edit'


const TagEditForm = ({store}) => {

  const entity = store.cv.entity
  const errors = store.cv.errors
  const updateField = store.updateData.bind(store)

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <TextInput label={store.__('name')} attr={'name'} record={entity} onChange={updateField}
          errors={errors} /><br/>
        <BoolInput label={store.__('Published')} attr={'published'} record={entity} onChange={updateField} />
      </div>
    </div>
  )
}
TagEditForm.propTypes = {
  store: React.PropTypes.object.isRequired
}

const TagsEditView = ({store}) => (
  <EditView store={store} onReturn2list={store.onReturn2list.bind(store)} onSave={store.saveEntity.bind(store)}>
    <TagEditForm store={store} />
  </EditView>
)
export default TagsEditView
