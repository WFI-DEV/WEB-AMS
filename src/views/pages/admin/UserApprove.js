import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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

const UserApprove = () => {
  const tableExample = [
    {
      no: 1,
      name: 'Mr. Smith',
    },
    {
      no: 2,
      name: 'Mr. Fredy',
    },
    {
      no: 2,
      name: 'Mr. Justin',
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>User Approve</CCardHeader>
            <CCardBody>
              <CButton color="primary" className="mb-3 ">
                <CIcon icon={cilPlus} className="me-2" />
                New User Approve
              </CButton>

              {/* Table */}
              <CTable align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">User Approve Name</CTableHeaderCell>
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
                      <CTableDataCell className="text-center">
                        <CButton color="danger" size="sm" className="me-1">
                          <CIcon icon={cilTrash} />
                        </CButton>

                        <CButton color="info" size="sm">
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

export default UserApprove
