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
  getAllVendor,
  deleteData,
  addData,
  getDataById,
  updateData,
} from 'src/axios/admin/master/axiosVendor'
import { getAllBranch } from 'src/axios/admin/master/axiosBranch'
import { inputNotComp } from 'src/utils/sweetAlert'

const Vendor = () => {
  // Get All Data
  const [vendor, setVendor] = useState([])
  useEffect(() => {
    getAllVendor((res) => setVendor(res))
  }, [])

  // Add Data
  const [formAdd, setFormAdd] = useState({
    name: null,
    BranchId: null,
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
            <CCardHeader className="fw-bold">Vendor</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              {newButton ? (
                <CButton color="primary" className="mb-3 " onClick={() => setNewButton(!newButton)}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New Vendor
                </CButton>
              ) : (
                <CForm className="row g-3">
                  {/* Vendor NAME */}
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormInput
                      id="inputNewVendow"
                      label="Vendor Name"
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
                  <CCol xs={12}>
                    <CButton
                      className="mb-3 me-2 "
                      onClick={() =>
                        formAdd.name === '' || formAdd.name === null || formAdd.BranchId === null
                          ? inputNotComp()
                          : submitAdd()
                      }
                    >
                      Add
                    </CButton>

                    <CButton
                      className="mb-3 text-light"
                      color="danger"
                      onClick={() => {
                        setNewButton(!newButton)
                        setFormAdd({
                          name: null,
                          BranchId: null,
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
                    <CTableHeaderCell className="text-center">Vendor Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {vendor.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>

                      {/* Name */}
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
                      </CTableDataCell>

                      {/* Branch */}
                      <CTableDataCell className="text-center">
                        <div>{item.BranchName}</div>
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
          <CModalTitle>Edit Vendor</CModalTitle>
        </CModalHeader>
        <CModalBody className="fw-bold">
          {/* Name */}
          <CFormInput
            label="Vendor Name"
            type="text"
            id="inputEditVendor"
            className="form-control mb-1 "
            value={formEdit.name}
            onChange={(e) => setFormEdit({ name: e.target.value })}
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

export default Vendor
