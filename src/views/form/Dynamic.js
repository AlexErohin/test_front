import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { CCol, CFormGroup, CFormText, CLabel, CSelect } from '@coreui/react';


function App(props) {

  const [count, setCount] = useState(0);
  const data = props.data || {};

  const onChange = (e, key) => {

    var value = e.value;

    if (!value && e.currentTarget) {
      value = e.currentTarget.value;
      value = (e.currentTarget.type == "date"
        ? value.substr(8, 2) + "." + value.substr(5, 2) + "." + value.substr(0, 4)
        : value);
    }


    props.data[key] = value;

    setCount(count + 1);

  };

  const oneCol = (model, span) => {
    var name = (Object.keys(model)[0] || '');


    var type = ("date,number,readonly".indexOf(model.type) == -1 && model.type) || "input";
    var value = data[name] || "";

    if (!model.values && model.type == "date" && value.length >= 8) {
      let arr = value.split(".");
      value = (arr[2].length == 2 ? "20" : "") + arr[2] + "-" + arr[1] + "-" + arr[0];
    }

    var el = React.createElement(type);

    if (model.values && !data[name])
      data[name] = model.values[0] || "";

    return (

      <>
        {(name != "") &&
          <CCol md={span}>
            <CLabel htmlFor={name}>{model[Object.keys(model)[0]]}</CLabel >

            {model.values ?
              <CSelect value={value} name={name}
                onChange={(e) => { onChange(e, name); }}>
                {
                  model.values.map(e => (<option value={e}>{e}</option>))
                }
              </CSelect>
              :
              <el.type className="form-control-sm form-control" value={value}
                type={model.type}
                readOnly={model.type == "readonly"}
                rows="3"
                name={name}
                onChange={(e) => {
                  onChange(e, name);
                }} >
              </el.type>
            }

          </CCol>
        }

      </>)
  }


  const renderForm = () => {
    let model = props.model;
    let formUI = model.map(m => {
      var input = null;

      if (m.length == 1)
        input = oneCol(m[0], 12);
      else
        if (m.length == 2)
          input = (<> {oneCol(m[0], 6)} {oneCol(m[1], 6)}  </>);
        else
          if (m.length == 3)
            input = (<> {oneCol(m[0], 4)} {oneCol(m[1], 4)} {oneCol(m[2], 4)} </>);
          else
            if (m.length == 4)
              input = (<> {oneCol(m[0], 3)} {oneCol(m[1], 3)} {oneCol(m[2], 3)} {oneCol(m[3], 3)} </>);
      if (m.length == 5)
        input = (<> {oneCol(m[0], 3)} {oneCol(m[1], 3)} {oneCol(m[2], 2)} {oneCol(m[3], 2)}  {oneCol(m[4], 2)}</>);

      input = (input ? (<CFormGroup style={{ width: "100%" }} row>{input}</CFormGroup>) : null);

      let html = m[0].html;

      if (html)
        html = React.cloneElement(html, { ...props }, null);

      return (
        <>{html}{input} </>
      );
    });


    return formUI;
  };

  function getError() {

    if (!data)
      return "";

    var ret = props.model.map(
      arr => {
        return arr.map(
          e => {
            var name = Object.keys(e)[0];
            return (name && (e[name] + "").indexOf("*") > -1 ? (!data[name] ? " Не заполнено поле, " + e[name] : "") : "")
          }).filter(e => (e != "")).join(";")
      }).filter(e => (e != "")).join(";");


    return ret;
  }

  var content = renderForm();

  data.error = getError();

 
  return (
    <>

      {content}
    </>
  );

}

function validPhone(str) {
  var phoneno = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return str.match(phoneno);

}

export default App;