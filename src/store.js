//import { createStore, combineReducers } from 'redux'
import { createStore, applyMiddleware, compose , combineReducers} from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';


const tabsGrid = localStorage.getItem("tabsGrid");


const initialState = {
  sidebarShow: 'responsive',
  tabsGrid: eval(tabsGrid) || [{ grid: null }]
  
  

}

export const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}



//export const store = createStore(changeState);

const reducers = {

  toastr: toastrReducer,
  global: changeState
}

const reducer = combineReducers(reducers)

export const storeToastr = createStore(reducer,/* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


/*
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
    
    const enhancer = composeEnhancers(
//      applyMiddleware(...middleware),
      // other store enhancers if any
    );


export const storeToastr = createStore(reducer, composeEnhancers);*/
//const store = createStore(reducer, enhancer);
