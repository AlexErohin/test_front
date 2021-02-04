import React, { useState, useEffect, useRef } from 'react';
import { CModalTitle, CNav, CNavItem, CNavLink, CCard, CButton, CModal, CModalHeader, CModalBody, CTabPane, CTabs, CTabContent, CLabel } from '@coreui/react';
import * as utils from "../../Utils";
import Draggable, { DraggableCore } from "react-draggable";
import CIcon from '@coreui/icons-react'


const App = (props) => {



  var content = getContent(props);
  let curTab = "";

  let button = props.saveButton;
  if (!button) {
  
    button = <div>
      {props.save && <CButton color="success" size="sm" onClick={() => props.save(curTab)}>Сохранить</CButton>}
      {" "}
      {props.copy && <CButton color="warning" size="sm" onClick={() => props.copy(curTab)}>Копировать</CButton>}
      {" "}
      {props.print && <CButton color="primary" size="sm" onClick={() => props.print(curTab)}>Excel</CButton>}

    </div>

  
  }


  let buttonClose = <CButton size="sm" color="light" variant="outline" onClick={
    () => utils.appPipe.next({ name: "CLOSE_FORM", windowId: props.windowId })
  }><CIcon name="cil-x" /></CButton>

  return <div style={{ display: props.isHide ? "none" : "" }}><DragDialog button={button} {...props} buttonClose={buttonClose}>{content}</DragDialog></div>;

}


const DragDialog = (props) => {


  const taggle = useRef(false);
  const [coord, setCoord] = useState({ x: 80 + (props.windowId * 3), y: 60 + (props.windowId * 1) });

  const title = props.title;


  const removeActive = () => {
    let active = document.querySelector('.drag-active');
    if (active)
      active = active.classList.remove("drag-active");

  }

  useEffect(() => {
    removeActive();

  }, [])

  useEffect(() => {


    var divs = document.querySelectorAll('.modal-body');
    ;
    [].forEach.call(divs, function (div) {
      // do whatever
      if (taggle.current)
        div.style.maxHeight = (window.innerHeight - 90) + "px";
      else
        div.style.maxHeight = "550px";
    });

  })

  const onStart = (e) => {
    removeActive();

    e.currentTarget.parentElement.classList.add("drag-active");
    //.drag-active 
  }

  const onStop = (e, pos) => {

    if (pos.y < 0)
      pos.y = 0;
    if (pos.y > window.innerHeight - 20)
      pos.y = window.innerHeight - 20;

    if (pos.x)
      setCoord({ x: pos.x, y: pos.y, realX: pos.x, realY: pos.y });
    else
      setCoord({ ...coord, x: pos.x, y: pos.y });

  }

  const setSize = () => {

    // refCoord.current = { x: 100 + (props.windowId * 2), y: 100 + (props.windowId * 5)  };
    taggle.current = !taggle.current;
    if (!taggle.current)
      setCoord({ x: coord.realX, y: coord.realY });
    else
      setCoord({ ...coord, x: 0, y: 0 });

  }


  var header = <CModalHeader className="handle">
    {props.button}{' '}
    <CLabel><b>{title}</b></CLabel>
    <div class="float-right">
      <CButton size="sm" color="light" variant="outline" onClick={setSize}
      ><CIcon name={!taggle.current ? "cil-fullscreen" : "cil-fullscreen-exit"} /></CButton>{" "}

      {props.buttonClose}
    </div>

  </CModalHeader>;

  return (
    <div class="dialog modal-info"  >
      <Draggable handle=".handle" onStop={onStop} onStart={onStart} bounds1={{ left: -800, top: -150 }}
        position={coord}

      >
        <CCard borderColor="primary"
          className={!taggle.current ? "" : "full-screen"}>

          {header}
          {props.children}
        </CCard>
      </Draggable >
    </div>
  )



}


const getContent = (props) => {
  let children = (props.children.length && !props.children[1] ? props.children[0] : props.children)

  if (!children.length) {

    return <CModalBody className={children.props.scroll == false ? "" : "scroll"}>{children}</CModalBody>;
  }



  return <CTabs onActiveTabChange={(i) => { }}>
    <CNav variant="tabs">
      {
        children.filter(e => e).map(e => (
          <CNavItem>
            <CNavLink>{(e.props || {}).title || 'Информация'}</CNavLink>
          </CNavItem>

        ))
      }
    </CNav>
    <CTabContent >
      {
        children.filter(e => e).map(e => (
          <CTabPane>
            <CModalBody className={(e.props || {}).scroll == false ? "" : "scroll"}>
              {e}
            </CModalBody>
          </CTabPane>
        ))
      }

    </CTabContent>


  </CTabs>;
}





export default App;