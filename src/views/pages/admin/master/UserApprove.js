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
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import {
  getAllData,
  deleteData,
  addData,
  getDataById,
  updateData,
} from 'src/axios/admin/master/axiosUserApprove'
import { getAllBranch } from 'src/axios/admin/master/axiosBranch'
import { inputNotComp } from 'src/utils/sweetAlert'

const UserApprove = () => {
  // Get All Data
  const [userApprove, setUserApprove] = useState([])
  useEffect(() => {
    getAllData((res) => setUserApprove(res))
  }, [])

  // Add Data
  const [formAdd, setFormAdd] = useState({
    name: null,
    BranchId: null,
    SeqNo: null,
  })
  // console.log(formAdd)
  // Button Submit Add Data
  const submitAdd = () => {
    addData(formAdd)
  }

  // Edit Data
  // Id Edit
  const [dataId, setDataId] = useState()
  // Form Edit
  const [formEdit, setFormEdit] = useState({})
  const btnEdit = (id) => {
    getDataById(id, (res) => {
      setDataId(id)
      setFormEdit({
        name: res.name,
        BranchId: res.BranchId,
        BranchName: res.BranchName,
        SeqNo: res.SeqNo,
      })
    })
  }
  // console.log(formEdit)

  const submitEdit = () => {
    updateData(dataId, formEdit)
  }

  // Button Open Input New Data
  const [newButton, setNewButton] = useState(true)
  // Button Open Modal Edit Data
  const [editButton, setEditButton] = useState(false)

  // Get All Data Branch
  const [branch, setbranch] = useState([])
  useEffect(() => {
    getAllBranch((res) => setbranch(res))
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">User Approve</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              {newButton ? (
                <CButton color="primary" className="mb-3 " onClick={() => setNewButton(!newButton)}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New User Approve
                </CButton>
              ) : (
                <CForm className="row g-3">
                  <CCol md={3} className="mb-2 fw-bold">
                    {/* USER APRRONVE NAME */}
                    <CFormInput
                      id="inputYears"
                      label="User Approve Name"
                      placeholder="Text Here..."
                      onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                    />
                  </CCol>

                  {/* BranchName */}
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormSelect
                      label="Branch"
                      onChange={(e) =>
                        setFormAdd({ ...formAdd, BranchId: JSON.parse(e.target.value).BranchId })
                      }
                    >
                      <option hidden>Choose...</option>
                      {branch.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.BranchName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  {/* Sequence No */}
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormSelect
                      label="Sequence No"
                      onChange={(e) => setFormAdd({ ...formAdd, SeqNo: e.target.value })}
                    >
                      <option hidden>Choose...</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12}>
                    <CButton
                      className="mb-3 me-2 "
                      onClick={() =>
                        formAdd.name === null ||
                        formAdd.name === '' ||
                        formAdd.BranchId === '' ||
                        formAdd.BranchId === null ||
                        formAdd.SeqNo === null ||
                        formAdd.SeqNo === ''
                          ? inputNotComp()
                          : submitAdd()
                      }
                    >
                      Add
                    </CButton>

                    <CButton
                      type="submit"
                      className="mb-3 text-light"
                      color="danger"
                      onClick={() => {
                        setNewButton(!newButton)
                        setFormAdd({
                          name: null,
                          BranchId: null,
                          SeqNo: null,
                        })
                      }}
                    >
                      Cancel
                    </CButton>
                  </CCol>
                </CForm>
              )}

              {/* Table */}
              <CTable align="middle" className="mb-0 border" striped small>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">User Approve Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Sequence No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {userApprove.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>

                      {/* User Approve */}
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
                      </CTableDataCell>

                      {/* Branch */}
                      <CTableDataCell className="text-center">
                        <div>{item.BranchName}</div>
                      </CTableDataCell>

                      {/* User Approve */}
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
      {/* ##########---------- EDIT MODAL ----------########## */}
      <CModal
        alignment="center"
        visible={editButton}
        backdrop="static"
        onClose={() => setEditButton(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit User Approve</CModalTitle>
        </CModalHeader>
        <CModalBody className="fw-bold">
          {/* User Approve Name */}
          <CFormInput
            label="User Approve Name"
            type="text"
            id="inputEditUserApprove"
            className="form-control mb-1"
            value={formEdit.name}
            onChange={(e) => setFormEdit({ ...formEdit, name: e.target.value })}
          />

          {/* Branch */}
          <CFormSelect
            label="Branch"
            onChange={(e) =>
              setFormEdit({ ...formEdit, BranchId: JSON.parse(e.target.value).BranchId })
            }
          >
            <option hidden>{formEdit.BranchName}</option>
            {branch.map((item, index) => (
              <option key={index} value={JSON.stringify(item)}>
                {item.BranchName}
              </option>
            ))}
          </CFormSelect>

          {/* SEQUENCE NO */}
          <CFormSelect
            label="Sequence No"
            onChange={(e) => setFormEdit({ ...formEdit, SeqNo: e.target.value })}
          >
            <option hidden>{formEdit.SeqNo}</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </CFormSelect>
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

export default UserApprove
