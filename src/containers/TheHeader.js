import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'







import {
  TheHeaderDropdown,
} from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.global.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (

    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />




      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      <CIcon name="cib-codeship" height="48" alt="Logo" />
      </CHeaderBrand>
      <div style={{ position: "absolute", right: "0px" }}>
        <CHeaderNav >
          <TheHeaderDropdown />
        </CHeaderNav>
      </div>

    </CHeader>


  )
}

/*


*/

export default TheHeader
