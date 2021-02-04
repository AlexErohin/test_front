import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CNav,
  CNavItem, CNavLink, CCardBody, CCard, CButton, CModal, CModalHeader, CModalBody, CTabPane, CTabs, CTabContent
} from '@coreui/react'


import * as utils from "../Utils";


// sidebar nav config
import navProduct from '../product/nav'
import logo from '../assets/logo.png';


const setMenu = (children) => {

  children.forEach((ee, i, a) => {
    if (ee && ee._children && ee._children.length > 1) {

      setMenu(ee._children);

      if (!ee._children.length)
        ee = null;

      return;

    }

    if (!ee || !ee.to)
      return;

    // значит этот элемент не доступен по правам
    // if (!utils.canView(ee.to)) {
    //  a[i] = null;
    //  return;
    // }

    var m = utils.getModelByPath(ee.to);

    m = m || {};
    if (!ee.name) {
      ee.name = m.title;
    }
    if (!ee.icon) {
      ee.icon = m.icon;
    }


  });

  for (var i = 0; i < children.length; i++) {
    if (children[i] == null
      || (children[i]._children && !children[i]._children.length)) {
      children.splice(i, 1);
      i--;
    }
  }
}

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.global.sidebarShow);
  const navigation = useSelector(state => state.global.navigation)

  let nav = navProduct;

  nav = nav.map(
    e => {

      setMenu(e.children);
      if (e.children.length < 2)
        e = null;

      return e;
    }
  ).filter(e => e);

  const tabsGrid = useSelector(state => state.global.tabsGrid);

  useEffect(() => {


    var ctrl = document.getElementsByClassName("c-sidebar-nav-link");
    for (var i = 0; i < ctrl.length; i++) {


      // обрабатываем двойное нажатие,Ж что бы открыть новый Таб
      ctrl[i].onclick = (event) => {
        let a = event.target;

        if (!a.href) {
          a = a.parentNode;
          if (!a.href)
            return false;
        }



        if (a.waitClick == 2) {
          a.waitClick = 0;
          return;
        }

        event.preventDefault();

        if (a.waitClick == 1) {

          tabsGrid.push({
            grid: null,
            title: a.innerText,
            path: a.href.split("/").lastItem
          });
          dispatch({ type: 'set', tabsGrid });


          a.waitClick = 0;

          return;

        }


        if (!a.waitClick)
          setTimeout(() => {


            if (a.waitClick == 1) {
              a.waitClick = 2;

              delete tabsGrid[0];

              tabsGrid[0] = {
                grid: null,
                title: a.innerText,
                path: a.href.split("/").lastItem
              };

              a.click();

            }
          }, 500);

        a.waitClick = 1;

      };

    }




  }, []);





  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">

      </CSidebarBrand>

      <CSidebarNav unfoldable={true}>

        <CTabs>
          <CNav variant="tabs">

            {nav.map(e =>
              <CNavItem>
                <CNavLink>{e.title}</CNavLink>
              </CNavItem>)
            }

          </CNav>
          <CTabContent >

            {nav.map(e =>
              <CTabPane>
                <CCreateElement
                  items={e.children}
                  components={{
                    CSidebarNavDivider,
                    CSidebarNavDropdown,
                    CSidebarNavItem,
                    CSidebarNavTitle
                  }}
                />

              </CTabPane>
            )
            }



          </CTabContent>
        </CTabs>


      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
