import React, { useState, useEffect, useImperativeHandle } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



import * as utils from "../../Utils";

import * as gridUtils from './GridUtils'
import GridToolbar from './GridToolbar'



const { useRef } = React;

const Grid = (props) => {


  const model = utils.getModelByPath(props.path);

  const [state, setState] = useState(model && {

    page: 1,
    data: [],
    columns: gridUtils.getColumns(props.path, props),
    totalSize: 0
  });

  let subscribeObj = null;


  useEffect(() => {

    loadData();

    //мониторим команду на обновление
    subscribeObj = utils.appPipe.subscribe(event => {
      if (event.name == "REFRESH_GRID") {
        loadData();
      }
    });

    return function cleanup() {
      // отписываемся от мониторинга
      subscribeObj.unsubscribe();
    };


    



  }, []);


  function setFilter(filter) {



    state.filter = filter;
    state.page = 1;

    loadData();


  }


  async function loadData() {
 
    let filter=(!state.filter ? "" : "[filter="+state.filter+"]");

    let tmp = await utils.getDataServer(props.path+filter);

    state.data = tmp;
    state.total = tmp.length;
    
    setState({...state});



  }

  function add() {
    gridUtils.openForm(props.path, { id: "", ...props.formData });
  }

  return (
    <>


      <GridToolbar colums={state.columns} onFilter={setFilter}
        onAdd={add} total={state.total || 0} />



      <BootstrapTable wrapperClasses="table-responsive" bootstrap4

        condensed={false}
        bordered={false}
        rowStyle={gridUtils.rowStyle}

        tabIndexCell={false}
        bootstrap4={true}


        remote

        keyField={"code"}
        options={{}}
        data={state.data}
        columns={state.columns}



      />


      {!state.data &&
        <center>
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>

        </center>
      }


    </>
  );

}


export default Grid
