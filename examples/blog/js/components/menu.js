import React from 'react'
import { observer } from 'mobx-react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'


const AppMenu = ({state}) => (
  <Navbar fixedTop fluid inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="https://github.com/blueskydigital/bstrap-react-mobx-admin">BStrap React Mobx Admin</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} onClick={() => state.showPostList()}>posts</NavItem>
        <NavItem eventKey={2} onClick={() => state.showPostList({filters: {"category":"tech"}})}>tech posts</NavItem>
        <NavItem eventKey={3} onClick={() => state.showTagList()}>tags</NavItem>
        <NavItem eventKey={4} onClick={() => state.changeLang()}>change language</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default observer(AppMenu)
