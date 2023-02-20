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
  getAllBrand,
  deleteData,
  addData,
  getDataById,
  updateData,
} from 'src/axios/admin/master/axiosBrand'

const Brand = () => {
  // Get All Data
  const [brand, setBrand] = useState([])
  useEffect(() => {
    getAllBrand((res) => setBrand(res))
  }, [])

  // Add Data
  const [formAdd, setFormAdd] = useState({
    name: '',
  })
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
      setFormEdit({ name: res.name })
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
            <CCardHeader className="fw-bold">Brand</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              {newButton ? (
                <CButton color="primary" className="mb-3 " onClick={() => setNewButton(!newButton)}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New Brand
                </CButton>
              ) : (
                <CContainer>
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormInput
                      id="inputYears"
                      label=" Create New Brand"
                      placeholder="Text Here..."
                      onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                    />
                  </CCol>

                  <CButton type="submit" className="mb-3 me-2 " onClick={() => submitAdd()}>
                    Add
                  </CButton>

                  <CButton
                    type="submit"
                    className="mb-3 text-light"
                    color="danger"
                    onClick={() => setNewButton(!newButton)}
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
                    <CTableHeaderCell className="text-center">Brand Name</CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">ID</CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {brand.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>

                      {/* Submission */}
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
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
          <CModalTitle>Edit Detail Brand</CModalTitle>
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

export default Brand
