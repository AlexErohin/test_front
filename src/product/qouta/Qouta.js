import React, { useState, useRef, useEffect } from 'react';
import Dialog from "../../views/form/Dialog";
import FormDefault from "../../views/form/FormDefault";


import Grid from '../../views/grid/Grid'

import { CInput, CSelect } from '@coreui/react';
import {
  CButton

} from '@coreui/react'




import CIcon from '@coreui/icons-react'
import * as utils from "../../Utils";

const App = (props) => {

  const ref = useRef();
  const [data, setData] = useState();

  const model1 = [
    [{ year: "Год* ", values: ["2020", "2021", "2022", "2023", "2024", "2025"] },
    { dev_code: "Владелец*", values: ["РРПК","Магаданрыба","ТОР"] }],
    [{ rayon_code: "Район*", values: ["ЗАО","Камчатка"] },
    { fish_code: "Ресурс*", values: ["краб синий", "минтай"] },
    { qouta_type: "Тип", values: ["", "инвест"] }],
    [{ val: "Всего*" }, { val_spend: "Освоенно" }, { val_end: "Остаток" }]
  ];

  useEffect(() => {
    async function fetchData() {


    }

    fetchData();

  }, []);


  return (


    <Dialog {...props} title={"Квота"}
      saveButton={

        <>

          <CButton color="success" size="sm" onClick={() => ref.current.save()}>Сохранить</CButton>
          <CButton color="success" size="sm" onClick={() => { ref.current.data.code = ""; ref.current.save() }}>Копировать</CButton>
        </>
      }
    >



      <FormDefault scroll={false} id={props.id} path={props.path} model={model1}
        
        ref={ref}

      />


      {data && <Grid title="Разрешения" path="permit" />}

      {data && <Grid title="Изменения разрешений" path="permit_change" />}

    </Dialog>


  )

}


export default App;