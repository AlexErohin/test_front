import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import TheDialogManager from './containers/TheDialogManager';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)




// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));



class App extends Component {

  render() {
    return (
      <>

        <HashRouter>
          <React.Suspense fallback={loading}>

            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login  />} />
              <Route path="/" name="Home" render={props =>
                <><TheDialogManager /><TheLayout  /></>
              } />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    );
  }
}

export default App;
