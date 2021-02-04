import React, { useState, useEffect } from 'react';

import * as utils from "../Utils";

const App = (props) => {

  const [arrList, setArrList] = useState([]);
  const [count, setCount] = useState(0);

  const [subscribe, setSubscribe] = useState(
    () =>
      utils.appPipe.subscribe(event => {
        if (event.name == "OPEN_FORM") {
          createForm({ data: event.data, path: event.path });
        }

        if (event.name == "CLOSE_FORM") {
          onClose(event.windowId );
        }
      }
      ));

  function createForm({ path, data }) {

    data = data || {};

    let model = utils.getModelByPath(path);

    let dialog = model.form ;

    var el = React.createElement(dialog,
      {
        title: model.title,
        id: data.id,
        data: data,
        onClose: onClose,
        windowId: arrList.length,
        path: path,
      }, null);

    arrList.push(el);
    localStorage.setItem("dialogs",
      JSON.stringify(arrList.filter(e => e != null).map(e => {
        return { path: e.props.path, id: e.props.id }
      })));

    setCount(count => ++count);
  }

  useEffect(() => {
    var store = localStorage.getItem("dialogs");
    if (1 == 1 || !store)
      return;

    eval(store).filter(e => {
      createForm(e);
      return true;
    });


  }, []);

  const onClose = (windowId) => {
    arrList[windowId] = null;

    localStorage.setItem("dialogs", JSON.stringify(arrList.filter(e => e != null).map(e => { return { path: e.props.path, id: e.props.id } })));

    setCount(count => --count);
  }

  let visibleList = arrList;

  return (
    <div>
      {visibleList}
    </div>
  );
}





export default App;