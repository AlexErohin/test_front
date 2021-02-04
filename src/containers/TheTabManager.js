
import React, { useState, useEffect, useRef } from 'react';


import { CNav, CNavItem, CNavLink, CCardBody, CCard, CButton, CModal, CModalHeader, CModalBody, CTabPane, CTabs, CTabContent, CLabel } from '@coreui/react';
import CIcon from '@coreui/icons-react'

import { Link } from 'react-router-dom';

import * as utils from "../Utils";
import Grid from '../views/grid/Grid'





function App(props) {


	
  let arrList = utils.selector(state => state.global.tabsGrid);


  const [active, setActive] = useState(0);


  let curTab = -1;

  arrList.forEach((e, i,a) => {
    if (e.grid)
      return;


    let path = i != 0 && e.path || props.path;

    let model = utils.getModelByPath(path);
    if (model==null)
    {
      a.splice(i,1);
      return;
    }
    e.title = model.title || (e.path == props.path || i > 0 ? e.title : "");
    e.path = path;
    e.icon = model.icon;
    e.state = {};
    e.grid = <Grid path={path} key={path} tabNum={i} state={e.state} /> // через state можем получить доступ к любым данным любой закладки

    if (curTab == -1)
      curTab = i;

    // это означает что это не востановление 
    //if (e.path == props.pathname)
    // setActive(i);

  });

  if (curTab > -1)
    setActive(curTab);



  localStorage.setItem("tabsGrid", JSON.stringify(arrList.map(e => {
    return { path: e.path, title: e.title }
  })));


  var content = null;

  content =
    <CTabs activeTab={active < arrList.length ? active : 0} onActiveTabChange={idx => setActive(idx)}>
      <CNav variant="tabs">
        {
          arrList.map((e, index, a) => (
            <CNavItem>
              <CNavLink><CIcon name={e.icon} /> {e.title} {(index > 0 ?
                <Link onClick={(event) => {

                  arrList.splice(index, 1);

                }}>x</Link> : null)}</CNavLink>
            </CNavItem>

          ))
        }
      </CNav>
      <CTabContent style={{ height: "calc(100% - 40px)" }}>
        {
          arrList.map((e,i) => (
            <CTabPane  className={arrList.length==1 || active==i  ? "active show" : ""}>
              {e.grid}
            </CTabPane>
          ))
        }

      </CTabContent>


    </CTabs>;



  return (


    <>
      {content}

    </>

  );



}


export default App
