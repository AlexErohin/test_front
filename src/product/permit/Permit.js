import React, { useState, useRef, useEffect } from 'react';
import Dialog from "../../views/form/Dialog";
import FormDefault from "../../views/form/FormDefault";

import Grid from '../../views/grid/Grid'


import * as utils from "../../Utils";

const App = (props) => {


  const [data, setData] = useState({});
  const ref = useRef();
  const model = [
    [{ num: "Номер*" }, { ship_code: "Судно*", values: ["","qqq","eeee","rrrr"] }],
    [{ date_in: "Дата начала*", type: "date" }, { date_end: "Завершения", type: "date" }],
    [{ val: "Всего*" }, { val_spend: "Освоенно" }, { val_end: "Остаток" }]
  ];


  useEffect(() => {
    async function fetchData() {


    }

    fetchData();

  }, []);


  return (


    <Dialog {...props} title={"Разрешение"}
      save={() => ref.current.save()}
      copy={()=>{  }}
    >

      <FormDefault model={model} ref={ref}  id={props.id}  path={props.path}  />
          
      <Grid title="История изменений" path="permit"  />

    </Dialog>


  )

}


export default App;