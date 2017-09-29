import React from 'react'
import {observer} from 'mobx-react'

const SubmitButton = observer(({ errors, text, onSubmit, hasChanged }) => (
  errors ? (
    <button type="button" className="btn btn-primary"
      disabled={errors.size > 0 || ! hasChanged()} onClick={onSubmit}>{text}</button>
  ) : null
))

const GlobalErrors = observer(({errors}) => {
  return errors.has('_global') ? (
    <ul>
    {
      errors.get('_global').map((e, idx) => (
        <li key={idx} style={{color: 'red'}}>{e}</li>)
      )
    }
    </ul>
  ) : null
})

@observer export default class BStrapEditView extends React.Component {

  constructor (props) {
    super(props)
    this.onKeyDownActions = this.onKeyDownActions.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDownActions, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDownActions, false)
  }

  onKeyDownActions (event) {
    const e = event || window.event
    e.onKeyDownActions = false

    if (e.keyCode === 13) {
      // enter
      e.onKeyDownActions = true
    } else if (e.keyCode === 27) {
      // esc
      e.onKeyDownActions = true
      this.props.onReturn2list()
    } else if ((e.ctrlKey || e.metaKey) && e.keyCode === 69) {
      // ctrl+e
      e.onKeyDownActions = true
      if (this.props.store.isEntityChanged) {
        this.props.store.saveEntity(this.props.onReturn2list)
      } else {
        this.props.onReturn2list()
      }
    } else if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      // ctrl+s
      e.onKeyDownActions = true
      this.props.store.isEntityChanged && this.props.store.saveEntity()
    }

    e.onKeyDownActions && e.preventDefault() && e.stopPropagation()
  }

  render({store, onSave, onReturn2list, children} = this.props) {

    const cv = store.cv
    const loading = cv.state === 'loading' || cv.state === 'saving'

    if(loading) {
      return <span className="is-loading">loading</span>
    }

    const title = cv.origRecordId ?
      (cv.edittitle || 'edit item') :
      (cv.createtitle || 'create new item')
    const saveText = cv.saveText || 'SAVE'
    const cancelText = cv.cancelText || 'cancel'

    const actionButtons = (
      <div className="btn-group" role="group">
        <SubmitButton onSubmit={onSave} errors={cv.errors} text={saveText} hasChanged={()=>(store.isEntityChanged)}/>
        <SubmitButton onSubmit={()=>onSave(onReturn2list)} errors={cv.errors}
          text={cv.saveAndReturnText || 'SAVE and return'} hasChanged={()=>(store.isEntityChanged)} />
        <button type="button" className="btn btn-default" onClick={onReturn2list}>{cancelText}</button>
      </div>
    )

    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{title}</h4>
          { actionButtons }
        </div>

        <div className="card-block">
          <form>{children}</form>
          <GlobalErrors errors={cv.errors} />
        </div>

        <div className="card-block">
          { actionButtons }
        </div>
      </div>
    )
  }
}
