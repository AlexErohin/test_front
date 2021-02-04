import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const TheHeaderDropdown = () => {
 
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon name="cil-user" />

        </div>
      </CDropdownToggle>

      <CDropdownMenu>


        < CDropdownItem onClick={() => {
         
        }}>
          <CIcon name="cil-line-style" className="mr-2 text-info" />
        </CDropdownItem>

        <CDropdownItem onClick={() => { }}>
          <CIcon name="cil-lock-locked" className="mr-2 text-warning" />
          Выйти 
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown >
  )
}



export default TheHeaderDropdown
