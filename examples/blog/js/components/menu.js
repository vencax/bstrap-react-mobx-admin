import React from 'react'
import { observer } from 'mobx-react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import views from '../routeconfig'


const AppMenu = ({store}) => (
  <Navbar fixedTop fluid inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="https://github.com/blueskydigital/bstrap-react-mobx-admin">BStrap React Mobx Admin</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} onClick={() => {
          store.router.goTo(views.entity_list, {entityname: 'posts'}, store, {_page: 1})
        }}>posts</NavItem>
        <NavItem eventKey={2} onClick={() => {
          store.router.goTo(views.entity_list, {entityname: 'posts'}, store, {_page: 1, category: 'tech'})
        }}>tech posts</NavItem>
        <NavItem eventKey={3} onClick={() => {
          store.router.goTo(views.entity_list, {entityname: 'tags'}, store, {_page: 1})
        }}>tags</NavItem>
        <NavItem eventKey={4} onClick={() => store.changeLang()}>change language</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default observer(AppMenu)
