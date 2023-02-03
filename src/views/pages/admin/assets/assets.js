import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFindInPage, cilPencil, cilPlus, cilQrCode, cilTrash } from '@coreui/icons'

const Assets = () => {
  const [modalNewAsset, setModalNewAsset] = useState(false)
  const [modalDetail, setModalDetail] = useState(false)
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Assets</CCardHeader>
            <CCardBody>
              <CButton
                color="primary"
                className="mb-3 "
                onClick={() => setModalNewAsset(!modalNewAsset)}
              >
                <CIcon icon={cilPlus} className="me-2" />
                New Asset by Admin
              </CButton>
              {/* Table */}
              <CTable align="middle" className="mb-0 border" responsive striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Brand</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Year Purchase</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code Assets</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Division</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Condition</CTableHeaderCell> */}
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

                    {/* Category */}
                    <CTableDataCell className="text-center">
                      <div>Monitor</div>
                    </CTableDataCell>

                    {/* Amount */}
                    <CTableDataCell className="text-center">
                      <CCol>5 Unit</CCol>
                    </CTableDataCell>

                    {/* Actions */}
                    <CTableDataCell className="text-center">
                      <CContainer>
                        <CButton
                          color="info"
                          size="sm"
                          className="text-light"
                          onClick={() => setModalDetail(!modalDetail)}
                        >
                          <CIcon icon={cilFindInPage} className="me-2 text-light" />
                          Detail
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
                <option value="1">CPU</option>
                <option value="2">Printer</option>
                <option value="3">Monitor</option>
              </CFormSelect>
            </CCol>

            {/* Brand */}
            <CCol md={6} className="fw-bold">
              <CFormInput id="inputBrand" label="Brand" placeholder="Example: Samsung A1234" />
            </CCol>

            {/* Code */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputCode"
                label="Code Asset"
                placeholder="Example: MNT/IT/001/ADM/AMB/BPF"
              />
            </CCol>

            {/* Invoice */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputInvoice"
                label="No. Invoice"
                placeholder="Example: INV/JAN/001/010/2022/BPF"
              />
            </CCol>

            {/* Years */}
            <CCol md={3} className="fw-bold">
              <CFormInput id="inputYears" label="Year Purchase" />
            </CCol>

            {/* Detail */}
            <CCol md={3} className="fw-bold">
              <CFormSelect label="Detail">
                <option hidden>Choose...</option>
                <option value="Jakarta">Used</option>
                <option value="Surabaya">Unused</option>
                <option value="Bandung">Warehouse</option>
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
                <option value="Jakarta">Vendor 1</option>
                <option value="Surabaya">Vendor 2</option>
                <option value="Bandung">Vendor 3</option>
              </CFormSelect>
            </CCol>

            {/* Branch */}
            <CCol md={3} className="fw-bold">
              <CFormSelect label="Branch">
                <option hidden>Choose...</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Bandung">Bandung</option>
              </CFormSelect>
            </CCol>

            {/* Division */}
            <CCol md={3} className="fw-bold">
              <CFormSelect id="inputState" label="Divison">
                <option hidden>Choose...</option>
                <option>Marketing</option>
                <option>HRD</option>
                <option>Finance</option>
              </CFormSelect>
            </CCol>

            {/* User */}
            <CCol md={3} className="fw-bold">
              <CFormInput id="inputUser" label="User" />
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

      {/* ###################################-  MODAL DETAIL ASSET -############################################## */}

      <CModal fullscreen visible={modalDetail} onClose={() => setModalDetail(false)}>
        <CModalHeader>
          <CModalTitle>Details Assets</CModalTitle>
        </CModalHeader>

        {/* ISI MODAL ASSET */}
        <CModalBody>
          <CCard>
            <CCardHeader>Monitor</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Brand</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Years Purchase</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Invoice</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Division</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Conditions</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Detail</CTableHeaderCell>
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

                    {/* Category */}
                    <CTableDataCell className="text-center">
                      <div>Samsung A123</div>
                    </CTableDataCell>

                    {/* Year Purchase */}
                    <CTableDataCell className="text-center">
                      <div>2021</div>
                    </CTableDataCell>

                    {/* Code */}
                    <CTableDataCell className="text-center">
                      <div>MNT/IT/001/ADM/AMB/BPF</div>
                    </CTableDataCell>

                    {/* Invoice */}
                    <CTableDataCell className="text-center">
                      <div>INV/123/321</div>
                    </CTableDataCell>

                    {/* Branch */}
                    <CTableDataCell className="text-center">
                      <div>Jakarta</div>
                    </CTableDataCell>

                    {/* Branch */}
                    <CTableDataCell className="text-center">
                      <div>Marketing</div>
                    </CTableDataCell>

                    {/* User */}
                    <CTableDataCell className="text-center">
                      <div>Mr. Jhon</div>
                    </CTableDataCell>

                    {/* Conditions */}
                    <CTableDataCell className="text-center">
                      <div>Good</div>
                    </CTableDataCell>

                    {/* Detail */}
                    <CTableDataCell className="text-center">
                      <div>Used</div>
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

                        <CButton color="info" size="sm" className="me-1 text-light">
                          <CIcon icon={cilQrCode} />
                        </CButton>
                      </CContainer>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Assets
