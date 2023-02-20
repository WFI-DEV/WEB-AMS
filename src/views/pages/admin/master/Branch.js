import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
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

import {
  getDataMaxi,
  getAllBranch,
  deleteData,
  addData,
  getDataBranchById,
  updateDataBranch,
  importMaxi,
} from 'src/axios/admin/master/axiosBranch'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

const Branch = () => {
  // Get Data Maxiloan
  const [maxiloan, setMaxiloan] = useState([])
  useEffect(() => {
    getDataMaxi((res) => setMaxiloan(res))
  }, [])

  // Button import maxiloan
  const submitImport = () => {
    importMaxi(maxiloan)
  }

  // Get All Data Branch
  const [branch, setbranch] = useState([])
  useEffect(() => {
    getAllBranch((res) => setbranch(res))
  }, [])

  // Add Data
  const [formAdd, setFormAdd] = useState({
    BranchName: '',
    BranchId: '',
    CodeBranch: '',
  })
  // Button Add
  const submitAdd = () => {
    addData(formAdd)
  }

  // Form Edit
  // Id Edit
  const [dataId, setDataId] = useState()
  const [formEdit, setFormEdit] = useState({})
  // console.log(dataId)
  // console.log(formEdit)
  const btnEdit = (id) => {
    getDataBranchById(id, (res) => {
      setDataId(id)
      setFormEdit({
        BranchName: res.BranchName,
        BranchId: res.BranchId,
        CodeBranch: res.CodeBranch,
        SeqNo: res.SeqNo,
      })
    })
  }
  // console.log(formEdit)

  const submitEdit = () => {
    updateDataBranch(dataId, formEdit)
  }

  // + NEW DATA
  const [newButton, setNewButton] = useState(true)
  // MAXILOAN MODAL
  const [getButton, setGetButton] = useState(false)

  // Button Open Modal Edit Data
  const [editButton, setEditButton] = useState(false)

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Branch</CCardHeader>
            <CCardBody>
              {/* MAXILOAN BUTTON */}
              <div>
                <CButton
                  color="info"
                  className="mb-3 text-light "
                  onClick={() => setGetButton(!getButton)}
                >
                  Data Branch from Maxiloan
                </CButton>
              </div>

              {/* ADD BUTTON */}
              <div>
                {/* + NEW  */}
                {newButton ? (
                  <CButton
                    color="primary"
                    className="mb-3 "
                    onClick={() => setNewButton(!newButton)}
                  >
                    <CIcon icon={cilPlus} className="me-2" />
                    New Branch
                  </CButton>
                ) : (
                  <CForm className="row g-3">
                    {/* BRANCH NAME */}
                    <CCol md={3} className="fw-bold">
                      <CFormInput
                        id="inputNameCategory"
                        label="Branch Name"
                        placeholder="Text Here..."
                        onChange={(e) => setFormAdd({ ...formAdd, BranchName: e.target.value })}
                      />
                    </CCol>
                    {/* Branch ID */}
                    <CCol md={3} className="fw-bold">
                      <CFormInput
                        id="inputCodeCategory"
                        label="Branch ID"
                        placeholder="Text Here..."
                        onChange={(e) => setFormAdd({ ...formAdd, BranchId: e.target.value })}
                      />
                    </CCol>

                    {/* Code Branch */}
                    <CCol md={3} className="fw-bold">
                      <CFormInput
                        id="inputCodeCategory"
                        label="Code Branch"
                        placeholder="Text Here..."
                        onChange={(e) => setFormAdd({ ...formAdd, CodeBranch: e.target.value })}
                      />
                    </CCol>

                    <CCol xs={12}>
                      <CButton className="mb-3 me-2 " onClick={() => submitAdd()}>
                        Add
                      </CButton>
                      <CButton
                        className="mb-3 text-light"
                        color="danger"
                        onClick={() => setNewButton(!newButton)}
                      >
                        Cancel
                      </CButton>
                    </CCol>
                  </CForm>
                )}
              </div>

              {/* ---------------------------------------- TABLE ----------------------------------- */}
              {/* Table */}
              <CTable align="middle" className="mb-0 border" striped small>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Sequence No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {branch.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>

                      {/* ID */}
                      <CTableDataCell className="text-center">
                        <div>{item.BranchId}</div>
                      </CTableDataCell>

                      {/* Branch */}
                      <CTableDataCell className="text-center">
                        {/* Merubah Jakarta timur jadi 1 , utara 2 */}
                        <div>
                          {item.BranchName === 'JAKARTA TIMUR'
                            ? 'JAKARTA 1'
                            : item.BranchName === 'JAKARTA UTARA'
                            ? 'JAKARTA 2'
                            : item.BranchName}
                        </div>
                      </CTableDataCell>

                      {/* Code Branch */}
                      <CTableDataCell className="text-center">
                        <div>{item.CodeBranch}</div>
                      </CTableDataCell>

                      {/* Sequence No */}
                      <CTableDataCell className="text-center">
                        <div>{item.SeqNo}</div>
                      </CTableDataCell>

                      {/* Actions */}
                      <CTableDataCell className="text-center">
                        <CButton
                          color="danger"
                          size="sm"
                          className="me-1 text-light"
                          onClick={() =>
                            Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to delete this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                // delete from axios
                                deleteData(item.id)
                              }
                            })
                          }
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>

                        <CButton
                          color="info"
                          size="sm"
                          className="text-light"
                          onClick={() => (setEditButton(!editButton), btnEdit(item.id))}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ##########---------- MODAL ----------########## */}
      {/* ##########---------- MAXILOAN DATA MODAL ----------########## */}
      <CModal
        scrollable
        alignment="center"
        visible={getButton}
        backdrop="static"
        onClose={() => setGetButton(false)}
      >
        <CModalHeader>
          <CModalTitle>Data Branch from Maxiloan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Table */}
          <CTable align="middle" className="mb-0 border" striped>
            {/* Table Header */}
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Branch ID</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Branch Name</CTableHeaderCell>
                {/* <CTableHeaderCell className="text-center">Code Branch</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>

            {/* Table Body */}
            <CTableBody>
              {maxiloan.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* No */}
                  <CTableDataCell className="text-start">
                    <div>{index + 1}.</div>
                  </CTableDataCell>

                  {/* ID */}
                  <CTableDataCell className="text-center">
                    <div>{item.BranchID}</div>
                  </CTableDataCell>

                  {/* Branch */}
                  <CTableDataCell className="text-center">
                    {/* Merubah Jakarta timur jadi 1 , utara 2 */}
                    <div>
                      {item.BranchName === 'JAKARTA TIMUR'
                        ? 'JAKARTA 1'
                        : item.BranchName === 'JAKARTA UTARA'
                        ? 'JAKARTA 2'
                        : item.BranchName}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setGetButton(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to import this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, import it!',
              }).then((result) => {
                if (result.isConfirmed) {
                  // delete from axios
                  submitImport()
                }
              })
            }
          >
            Import All Data
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ##########---------- EDIT MODAL ----------########## */}
      <CModal
        alignment="center"
        visible={editButton}
        backdrop="static"
        onClose={() => setEditButton(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit Branch</CModalTitle>
        </CModalHeader>
        <CModalBody className="fw-bold">
          {/* Branch Name */}
          <CFormInput
            label="Branch Name"
            type="text"
            id="inputEditSubmission"
            className="form-control mb-1"
            value={formEdit.BranchName}
            onChange={(e) => setFormEdit({ ...formEdit, BranchName: e.target.value })}
          />

          {/* Branch ID */}
          <CFormInput
            label="Branch ID"
            type="text"
            id="inputEditSubmission"
            className="form-control mb-1 "
            value={formEdit.BranchId}
            onChange={(e) => setFormEdit({ ...formEdit, BranchId: e.target.value })}
          />

          {/* Branch Code */}
          <CFormInput
            label="Branch Code"
            type="text"
            id="inputEditSubmission"
            className="form-control mb-1 "
            value={formEdit.CodeBranch}
            onChange={(e) => setFormEdit({ ...formEdit, CodeBranch: e.target.value })}
          />

          {/* SeqNo */}
          <CFormInput
            label="Sequence No"
            type="text"
            id="inputEditSubmission"
            className="form-control mb-1 "
            value={formEdit.SeqNo}
            onChange={(e) => setFormEdit({ ...formEdit, SeqNo: e.target.value })}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditButton(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => submitEdit()}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Branch
