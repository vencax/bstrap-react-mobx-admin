import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const MessagesView = ({state}) => {

  let mess = []
  state.messages.forEach((message, key) => {
    mess.push(<div key={key}>{message.text}</div>)
  })
  return (<div>{mess}</div>)
}

MessagesView.propTypes = {
  state: PropTypes.object.isRequired
}
export default observer(MessagesView)
