import React, { useEffect, useState } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { withRouter } from "react-router-dom";



const TheLayout = ({ history }) => {



  return (
    <div className="c-app c-default-layout">
      

      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
    </div>
  )
}
//      <Chat />
export default withRouter(TheLayout)
