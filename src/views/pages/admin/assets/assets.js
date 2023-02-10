import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { getAllCategory } from 'src/axios/axiosCategory'
import { getAllDetail } from 'src/axios/axiosDetail'
import { getAllBranch } from 'src/axios/axiosBranch'
import { getAllVendor } from 'src/axios/axiosVendor'
import { getAllDivision } from 'src/axios/axiosDivision'

import { cilCalendar, cilFilter, cilPencil, cilPlus, cilQrCode, cilTrash } from '@coreui/icons'

const Assets = () => {
  // Get Category Data
  const [category, setCategory] = useState([])
  useEffect(() => {
    getAllCategory((res) => setCategory(res))
  }, [])
  const [modalNewAsset, setModalNewAsset] = useState(false)

  // Get Detail Data
  const [detail, setDetail] = useState([])
  useEffect(() => {
    getAllDetail((res) => setDetail(res))
  }, [])

  // Get Branch Data
  const [branch, setBranch] = useState([])
  useEffect(() => {
    getAllBranch((res) => setBranch(res))
  }, [])

  // Get All Vendor
  const [vendor, setVendor] = useState([])
  useEffect(() => {
    getAllVendor((res) => setVendor(res))
  }, [])

  // Get All Division
  const [division, setDivision] = useState([])
  useEffect(() => {
    getAllDivision((res) => setDivision(res))
  }, [])

  // Date Picker
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Assets</CCardHeader>
            <CCardBody>
              {/* + NEW ASSET */}
              <CButton
                color="primary"
                onClick={() => setModalNewAsset(!modalNewAsset)}
                className="mb-3 mt-1"
              >
                <CIcon icon={cilPlus} className="me-2" />
                New Asset by Admin
              </CButton>

              {/* ---------------------------- FILTER ---------------------------- */}
              <CButtonToolbar
                className="mt-2 float-end"
                role="group"
                aria-label="Toolbar with button groups"
              >
                <CButtonGroup role="group" aria-label="Button group with nested dropdown" size="sm">
                  {/* Reset */}
                  <CTooltip content="Reset Filter" placement="left">
                    <CButton color="dark" variant="outline" className="me-1">
                      <CIcon icon={cilFilter} />
                    </CButton>
                  </CTooltip>
                  {/* Filter Category */}

                  <CDropdown variant="btn-group">
                    <CDropdownToggle size="sm" color="dark" className="text-light me-1">
                      Category :
                      <CBadge color="light" className="ms-2 text-dark">
                        All
                      </CBadge>
                    </CDropdownToggle>

                    <CDropdownMenu>
                      <CDropdownItem href="#">Monitor</CDropdownItem>
                      <CDropdownItem href="#">CPU</CDropdownItem>
                      <CDropdownItem href="#">Printer</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>

                  {/* Filter Branch */}

                  <CDropdown variant="btn-group">
                    <CDropdownToggle color="dark" size="sm" className="text-light me-1">
                      Branch :
                      <CBadge color="light" className="ms-2 text-dark">
                        All
                      </CBadge>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Jakarta</CDropdownItem>
                      <CDropdownItem>Bandung</CDropdownItem>
                      <CDropdownItem>Semarang</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>

                  {/* Filter Conditions */}
                  <CDropdown variant="btn-group" className="me-5">
                    <CDropdownToggle color="dark" size="sm" className="text-light">
                      Conditions :
                      <CBadge color="white" className="ms-2 text-dark">
                        All
                      </CBadge>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Good</CDropdownItem>
                      <CDropdownItem>Damaged</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CButtonGroup>
              </CButtonToolbar>

              {/* -------------------------------  TABLE ------------------------------- */}
              <CTable align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Assets</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Conditions</CTableHeaderCell>

                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  <CTableRow v-for="item in tableItems">
                    {/* No */}
                    <CTableDataCell className="text-start">
                      <div>1.</div>
                    </CTableDataCell>
                    {/* Assets */}
                    <CTableDataCell className="text-start">
                      <div>Samsung A123</div>
                      <div>Monitor</div>
                      <div className="small text-medium-emphasis">
                        <div>2021</div>
                      </div>
                    </CTableDataCell>
                    {/* Code */}
                    <CTableDataCell className="text-start">
                      {/* Code asset */}
                      <div>
                        <div>
                          <div className="small text-medium-emphasis ">
                            <span>Asset :</span>
                          </div>
                          <div>MNT/IT/001/ADM/AMB/BPF</div>
                        </div>

                        <div>
                          <div className="small text-medium-emphasis ">
                            <span>Invoice :</span>
                          </div>
                          <div>INV/123/321</div>
                        </div>

                        <div>
                          <div className="small text-medium-emphasis ">
                            <span>Submission :</span>
                          </div>
                          <div>Input by: Admin</div>
                        </div>
                      </div>
                    </CTableDataCell>
                    {/* User */}
                    <CTableDataCell className="text-center">
                      <div>Jakarta</div>
                    </CTableDataCell>
                    {/* User */}
                    <CTableDataCell className="text-center">
                      <div>
                        <div>
                          <div>Mr. Jhon</div>
                          <div className="small text-medium-emphasis ">
                            <span>Marketing</span>
                          </div>
                        </div>
                      </div>
                    </CTableDataCell>
                    {/* Condition */}
                    <CTableDataCell className="text-end">
                      <div>
                        <div>
                          <div className="small text-medium-emphasis ">
                            <span>Conditions :</span>
                          </div>
                          <div>Good</div>
                        </div>

                        <div>
                          <div className="small text-medium-emphasis ">
                            <span>Detail :</span>
                          </div>
                          <div>Used</div>
                        </div>
                      </div>
                    </CTableDataCell>
                    {/* Actions */}
                    <CTableDataCell className="text-center">
                      <CContainer>
                        <CButton color="danger" size="sm" className="me-1 text-light">
                          <CIcon icon={cilTrash} />
                        </CButton>

                        <CButton color="info" size="sm" className="me-1 text-light">
                          <CIcon icon={cilPencil} />
                        </CButton>

                        <CButton color="success" size="sm" className="me-1 text-light">
                          <CIcon icon={cilQrCode} />
                        </CButton>
                      </CContainer>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ###################################-  End -############################################## */}

      {/* ###################################-  MODAL -############################################## */}

      {/* ###################################-  MODAL + NEW ASSET by ADMIN -############################################## */}

      <CModal
        size="xl"
        backdrop="static"
        visible={modalNewAsset}
        onClose={() => setModalNewAsset(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilPlus} className="me-2" />
            New Asset by Admin
          </CModalTitle>
        </CModalHeader>
        {/* Modal Body */}
        <CModalBody>
          {/* Form */}
          <CForm className="row g-3">
            {/* Category */}
            <CCol md={6} className="fw-bold">
              <CFormSelect label="Category">
                <option hidden>Choose...</option>
                {category.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Brand */}
            <CCol md={6} className="fw-bold">
              <CFormInput id="inputBrand" label="Brand" placeholder="Example: Samsung A1234" />
            </CCol>

            {/* Years */}
            <CCol md={3} className="fw-bold">
              <CFormLabel>Years Purchase</CFormLabel>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <CIcon icon={cilCalendar} />
                </span>
                <span>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="input-group-text bg-white text-start"
                  />
                </span>
              </div>
            </CCol>

            {/* Detail */}
            <CCol md={3} className="fw-bold">
              <CFormSelect label="Detail">
                <option hidden>Choose...</option>
                {detail.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Condition */}
            <CCol md={2}>
              <CFormLabel className="fw-bold">Condition</CFormLabel>
              <br />

              <CFormCheck
                className="py-2 me-4 text-success"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox1"
                value="option1"
                label="Good"
              />

              <CFormCheck
                className="text-danger"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox2"
                value="option2"
                label="Broke"
              />
            </CCol>

            {/* No Submission */}
            <CCol md={4} className="fw-bold">
              <CFormInput
                id="inputYears"
                label="No. Submission"
                disabled
                placeholder="Input by: Admin"
              />
            </CCol>

            {/* Vendor */}
            <CCol md={3} className="fw-bold">
              <CFormSelect label="Vendor">
                <option hidden>Choose...</option>

                {vendor.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Branch */}
            <CCol md={3} className="fw-bold">
              <CFormSelect label="Branch">
                <option hidden>Choose...</option>
                {branch.map((item, index) => (
                  <option key={item.BranchName} value={index}>
                    {item.BranchName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Division */}
            <CCol md={3} className="fw-bold">
              <CFormSelect id="inputState" label="Divison">
                <option hidden>Choose...</option>
                {division.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* User */}
            <CCol md={3} className="fw-bold">
              <CFormInput placeholder="Example: Mr. Jhon" id="inputUser" label="User" />
            </CCol>

            {/* Code Asset*/}
            <CCol md={6} className="fw-bold ">
              <CFormInput
                id="inputCode"
                label="Code Asset"
                placeholder="001/MNT/AMB/I/23"
                disabled
              />
            </CCol>

            {/* Invoice */}
            <CCol md={6} className="fw-bold">
              <CFormInput id="inputInvoice" label="No. Invoice" placeholder="Text Here..." />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalNewAsset(false)}>
            Close
          </CButton>
          <CButton color="primary">Create Asset</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Assets
