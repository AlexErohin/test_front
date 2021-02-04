import React from 'react';
import { CLink, CButton, CModal, CModalHeader, CModalBody, CCard, CCardBody, CFormGroup, CCol, CRow, CInput, CBadge, CSidebar } from '@coreui/react'
import * as utils from "../../Utils";
import { Link } from 'react-router-dom';


export function openForm(name, data) {
  utils.appPipe.next({ name: "OPEN_FORM", path: name, data: data, });
}


export function makeColumns(path, data) {

  let columns = Object.keys(data).map(e => [e, e]);
  let ret = getColumns(path, {}, columns);
  return ret;

}


export const rowStyle = (row, rowIndex) => {
  const style = {};
  if (Object.keys(row).length == 1) {
    style.backgroundColor = '#ebedef';

  } else {

    if (row.color)
      style.color = row.color;
  }



  return style;
};

export function getColumns(path, props, inColumns) {

  let model = utils.getModelByPath(path);
  if (!model)
    return [];

  let columns = inColumns || model.columns;


  let arrCol = columns.filter((e, i) => i > 0).map(e => e[0]).join("-")
  let plusGroup = 0;
  arrCol = arrCol.split("-");

  let arrColName = (columns.filter((e, i) => i > 0).map(e => e[1].replaceAll("(", "").replaceAll(")", "")).join("-")).split("-");
  columns = [columns[0]].concat(arrCol.map((e, i) => [e, arrColName[i + plusGroup]]));


  return columns.filter(e => (e.length > 1)).map((e, index, a) => {

    var key = e[0];


    return {
      text: (e[1] || '-').split("-").filter(e => e[0] != "(").join(" "),
      textOrig: e[1].replaceAll("(", "").replaceAll(")", ""),

      dataField: key,
      formatter: (cell, row) => {
        let link = null;

        // make link when its not group name
        let str = formatRow(key, row);
        if (index == 0 && Object.keys(row).length > 1) {

          if (!row.id)
            row.id = row.code;

          let msg = null;



          return <><CLink onClick={() => openForm(path, { id: row.id, ...props.data, ...row })}>
            <span style={{ fontSize1: "12px" }} dangerouslySetInnerHTML={{ __html: str }} />
          </CLink>{msg}</>;
        }



        if (Object.keys(row).length == 1 && str)
          str = "<b><span class='white-space-nowrap'>" + str + "</span></b>";



        return <>{link}<span dangerouslySetInnerHTML={{ __html: str.replace(" ", "  ") }} /></>;
      }
    }
  });



  function formatRow(key, row) {


    if (key.indexOf(">>") > -1)
      key = key.split(">>")[1];

    // it's possible if (!row.id && !row.CODE) return null;

    let arr = key.split("-").map((e, i, a) => {
      let d = row[e] || "";
      //row[a[i+1]])
      if (!d && a.length > 1 && !d && Object.keys(row).length > 1) // its group name
      {
        // только если есть значение под ним
        if (i < a.length - 1 && row[a[i + 1]])
          d = "-";
      }


      return d
    });

    return arr.filter(e => e).join("<br/>");



  }


}



