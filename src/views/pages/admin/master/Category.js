import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
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

const Category = () => {
  const tableExample = [
    {
      no: 1,
      name: 'Monitor',
    },
    {
      no: 2,
      name: 'Printer',
    },
    {
      no: 3,
      name: 'Laptop',
    },
  ]

  const [newButton, setNewButton] = useState(true)

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Category</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              {newButton ? (
                <CButton color="primary" className="mb-3 " onClick={() => setNewButton(!newButton)}>
                  <CIcon icon={cilPlus} className="me-2" />
                  New Category
                </CButton>
              ) : (
                <CContainer>
                  <CCol md={3} className="mb-2 fw-bold">
                    <CFormInput
                      id="inputYears"
                      label=" Create New Category"
                      placeholder="Text Here..."
                    />
                  </CCol>

                  <CButton type="submit" className="mb-3 me-2 ">
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
              <CTable align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Category Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{item.no}.</div>
                      </CTableDataCell>

                      {/* Category */}
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
                      </CTableDataCell>

                      {/* Actions */}
                      <CTableDataCell className="text-center ">
                        <CButton color="danger" size="sm" className="me-1 text-light">
                          <CIcon icon={cilTrash} />
                        </CButton>

                        <CButton color="info" size="sm" className="text-light">
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
    </>
  )
}

export default Category
