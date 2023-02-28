import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
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
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import {
  getAllStatusRequest,
  deleteData,
  addData,
  getDataById,
  updateData,
} from 'src/axios/admin/master/axiosStatusRequest'
import { inputNotComp } from 'src/utils/sweetAlert'

const StatusRequest = () => {
  // Get All Data
  const [statusRequest, setStatusRequest] = useState([])
  useEffect(() => {
    getAllStatusRequest((res) => setStatusRequest(res))
  }, [])

  // Add Data
  const [formAdd, setFormAdd] = useState({
    name: null,
    seqNo: null,
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
      setFormEdit({ name: res.name, seqNo: res.seqNo })
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

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Status Request</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              {newButton ? (
                <CButton color="primary" className="mb-3 " onClick={() => setNewButton(!newButton)}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New Status Request
                </CButton>
              ) : (
                <CContainer>
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormInput
                      id="input SR Name"
                      label="Status Request Name"
                      placeholder="Text Here..."
                      onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                    />
                  </CCol>

                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormInput
                      type="number"
                      id="input SR SeqNo"
                      label="Sequence No"
                      placeholder="
                      Type Numbers Here..."
                      onChange={(e) => setFormAdd({ ...formAdd, seqNo: e.target.value })}
                    />
                  </CCol>

                  <CButton
                    type="submit"
                    className="mb-3 me-2 "
                    onClick={() =>
                      formAdd.name === null || formAdd.name === '' || formAdd.seqNo === null
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
                      })
                    }}
                  >
                    Cancel
                  </CButton>
                </CContainer>
              )}

              {/* Table */}
              <CTable align="middle" className="mb-0 border" striped small>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status Request</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Sequence No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {statusRequest.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>

                      {/* Status Request */}
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item.seqNo}</div>
                      </CTableDataCell>

                      {/* ID */}
                      {/* <CTableDataCell className="text-center">
                        <div>{item.id}</div>
                      </CTableDataCell> */}

                      {/* Actions */}
                      <CTableDataCell className="text-center ">
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
                          // eslint-disable-next-line
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
          <CModalTitle>Edit Status Request</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="inputEditSubmission"
            className="form-control"
            value={formEdit.name}
            onChange={(e) => setFormEdit({ name: e.target.value })}
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

export default StatusRequest
