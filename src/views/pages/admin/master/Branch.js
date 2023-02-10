import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { getAllData } from 'src/axios/axiosBranch'

const Branch = () => {
  // Get All Data
  const [branch, setBranch] = useState([])
  useEffect(() => {
    getAllData((res) => setBranch(res))
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Branch - Maxiloan</CCardHeader>
            <CCardBody>
              <CCardSubtitle className="mb-3">Maxiloan Data</CCardSubtitle>
              {/* Table */}
              <CTable align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code Branch</CTableHeaderCell>
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

                      {/* Code Branch */}
                      <CTableDataCell className="text-center">
                        <div>JKT</div>
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

export default Branch
