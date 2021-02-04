import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';

import * as utils from "../../Utils";


import Dynamic from "./Dynamic";


const App = React.forwardRef((props, ref) => {

  const [selfData, setSelfData] = useState(!props.id ? {} : null);


  let data = props.data || selfData;

  useImperativeHandle(ref, () => {
    return {
      data: data,
      save: save,
      setData: setSelfData
    };
  });

  async function save(needRefresh) {
    if (data.error) {
      utils.toastr.error('', data.error, { timeOut: 20000 });
      return;
    }
    var ret = await utils.setDataServer(props.path, data);

    utils.appPipe.next({ name: "REFRESH_GRID", path: props.path });
  }


  useEffect(() => {


    async function fetchData() {

      var req = "[code=" + props.id +"]";

      var tmp = await utils.getDataServer(props.path + req);

      setSelfData(tmp[0]);

    }

    if (props.id)
      fetchData();

  }, []);



  return (
    <div >
      <Dynamic model={props.model} data={data} />
    </div>
  );
})


export default App;


