
import { Subject, Observable } from 'rxjs'
import { useSelector, useDispatch } from 'react-redux'
import { toastr as toastrExport } from 'react-redux-toastr'
import * as userModel from './product/model'



export const appPipe = new Subject();
export const selector = useSelector;
export const dispatch = useDispatch;
export const toastr = toastrExport;





export const SERVER = "https://localhost:44340/api/downtime/";
//export const SERVER = "http://109.110.56.92:5000/api/downtime/";


export const getModelByPath = path => {

  
  let ret = userModel.model.filter(e => e.path == path)[0] || {};
  if (ret.parent) {
    let parent = userModel.model.filter(e => e.path == ret.parent)[0] || {};
    ret = { ...parent, ...ret }
  }
  else
    ret = { ...ret }

  if (!ret.view) {
    ret.view = path;
  }

   return ret;
};



export const getDataServer = async (req) => {

  let url = SERVER+req;

  let response = null;

  try {
    response = await fetch(url, {
      headers: {
      //  'Authorization': `Bearer ${localStorage.token}`,

      }
    });
  } catch (err) {
    toastrExport.error("Ошибка при отправке:", err);
    return [];
  }


  var arr = [];

  if (response.ok) {
    arr = await response.json();
  } else {
    var err = await response.text();

    toastrExport.error("Ошибка сервера HTTP: " + response.status);
  }



  return arr;
}


export const setDataServer = async (table, data, isMessage) => {




  var response = await fetch(SERVER + table, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    //  'Authorization': `Bearer ${localStorage.token}`,

    },

    body:  JSON.stringify(Array.isArray(data) ? data : [data]).replaceAll("&quot;", "")
  })

 

  var arr = [];

  if (response.ok) {
    arr = await response.json();

    if (isMessage != false) {
      toastrExport.clean();
      toastr.success("Сохранение успешно, номер " + arr[0].id);
    }


  } else {
    var err = await response.text();
    toastrExport.error( "Ошибка HTTP: " + response.status + " - " + err, { timeOut: 10000 });
  }


  return arr;
}




