import React, { Suspense, useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade, CSidebar } from '@coreui/react'
import { useHistory, withRouter } from "react-router-dom";

import TabManager from "./TheTabManager";


// routes config

import * as utils from "../Utils";


const loading = (


  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const TheContent = ({ history }) => {

  let name = history.location.pathname.replace("/", "") || "permit";



  return (
    <Suspense fallback={loading}>
      <main className="c-main">

        <CContainer fluid>
          <CFade>
            <TabManager path={name} />
          </CFade>
        </CContainer>
      </main>
    </Suspense>
  )
}



export default withRouter(TheContent)
