import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInputCheckbox,
  CFormGroup,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as utils from "../../Utils";



const Login = () => {

  


  const handleChange = event => {
   
  };

  const login = async () => {

    
    window.location.href = "#";
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Авторизация</h1>
                    <p className="text-muted">Укажите ваши учетные данные</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Логин" name="login"  onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Пароль" name="pass" onChange={handleChange} />
                    </CInputGroup>




                    <CRow>
                      <CCol xs="6">
                        <CFormGroup variant="custom-checkbox" inline>
                          <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3"
                            checked />
                          <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Сохранить</CLabel>
                        </CFormGroup>

                      </CCol>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" style={{ float: "right" }} onClick={login}>Войти</CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Мониторинг</h2>
                    <p>Автоматизированная система сбора данных
                      </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" ></CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
