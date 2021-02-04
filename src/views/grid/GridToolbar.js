
import React, { useState, useEffect } from 'react';

import { CButton, CModal, CModalHeader, CModalBody, CCard, CCardBody, CFormGroup, CCol, CInput, CBadge, CRow } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as utils from "../../Utils";
import Draggable, { DraggableCore } from "react-draggable";
import { saveAs } from 'file-saver';



const { useRef } = React

function Toolbar(props) {
  const [taggle, setTaggle] = useState(false);
  const [data, setData] = useState(props.data || {});
  const dispatch = utils.dispatch();


  //let arrColName = ("Код-" + props.colums.map(e => e.textOrig.replace(">>", "-")).join("-")).split("-");
 // let arrCol = ("code-" + props.colums.map(e => e.dataField.replace(">>", "-")).join("-")).split("-");;

   let arrColName = ["Поиск..." ];
   let arrCol =["filter"];

  const onKeyUp = (e) => {

    data[e.target.id] = e.target.value;
    setData({ ...data });
  }

  const onKeyPress = (event) => {

    if (event.charCode == 13) {
      
      props.onFilter(data.filter || "");

    }
  }


  return (
    <div style={{ padding: '5px' }}>

      {taggle &&

        <Draggable >
          <CFormGroup className="card card-search">
            <CRow>
              {arrCol.map((e, i) =>
                (<CCol md="12" xs="6" >
                  <CInput id={e} onKeyUp={onKeyUp} style={{ marginTop: "5px" }}
                    onKeyPress={onKeyPress} type="search"
                    onChange={onKeyUp}
                    placeholder={arrColName[i]}
                    title={arrColName[i]}
                    className="form-control-sm"
                    value={data[arrCol[i]] || ''} />

                </CCol>)
              )
              }
            </CRow>
            <CRow className="handle-filter">
              <CCol md="12" >
                <div style={{ padding: '5px' }}>
                  <CButton variant="ghost" color="primary" size="sm" onClick={() => { setData({}); props.onFilter(""); }}>
                    <CIcon name="cil-filter-x" />Отменить поиск
                  </CButton>

                  <CButton variant="ghost" color="primary" size="sm"
                    onClick={() => {
                      setTaggle(!taggle);

                    }}>
                    <CIcon name="cil-x" /> Скрыть поиск
                    </CButton>
                </div>
              </CCol>
            </CRow>

          </CFormGroup>
        </Draggable>
      }
      <CButton type="submit" size="sm" color="success" variant="outline" onClick={props.onAdd}><CIcon name="cil-scrubber" />
        {' '}Добавить</CButton>{' '}

      {!taggle &&
        <CButton variant="ghost" color="primary" size="sm" onClick={() => {

          setTaggle(!taggle)
        }}>
          {Object.keys(data).length > 0 && <CIcon name="cil-filter-square" />}
          {Object.keys(data).length == 0 && <CIcon name="cil-filter" />}
        </CButton>
      }


      <div class="float-right" style={{ paddingTop: '5px' }}>
        <small> {props.total} </small>
        <CButton variant="ghost" color="primary" size="sm" onClick={() => {
          utils.appPipe.next({ name: "REFRESH_GRID", path: props.path });
        }}>
          <CIcon name="cil-loop-circular" />
        </CButton>





      </div>


    </div>

  )
}


export default Toolbar
