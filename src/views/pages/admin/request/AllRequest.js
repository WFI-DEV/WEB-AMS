import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  cilCalendar,
  cilFilter,
  cilHealing,
  cilPencil,
  cilPlus,
  cilSearch,
  cilTrash,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import { getAllRequest } from 'src/axios/admin/request/axiosRequest'
import { AdvReadMoreMore } from 'read-more-more'
import { getDataByReqNoDetail } from 'src/axios/admin/request/axiosRequestDetail'

const AllRequest = () => {
  // Get All Request
  const [request, setRequest] = useState([])
  useEffect(() => {
    getAllRequest((res) => setRequest(res))
  }, [])
  // console.log(request)

  // Get Request Detail
  const [dataReqNoDetail, setDataReqNoDetail] = useState([])
  console.log(dataReqNoDetail)

  const btnReqDetail = (code) => {
    // console.log(code)
    getDataByReqNoDetail(code, (res) => {
      setDataReqNoDetail(res)
    })
  }

  const navigate = useNavigate()

  // Button Open modal Request Detail
  const [showModal, setShowModal] = useState(false)
  // Button Create Request Purchase
  const createRPButton = () => {
    navigate('/admin/request/create')
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">All Request</CCardHeader>
            <CCardBody>
              {/* + NEW  */}
              <CRow>
                <CCol>
                  <CButton color="primary" className="" onClick={() => createRPButton()}>
                    <CIcon icon={cilPlus} className="me-2" />
                    Create Request
                  </CButton>
                </CCol>
                {/* ---------------------------- FILTER ---------------------------- */}

                <CForm className="row gy-2 gx-3 align-items-center  mb-2">
                  <CCol xs="auto">
                    <CInputGroup size="sm">
                      {/* Reset */}
                      <CTooltip content="Reset Filter" placement="left">
                        <CButton
                          type="button"
                          color="dark"
                          id="button-addon1"
                          className="text-white "
                        >
                          <CIcon icon={cilFilter} />
                        </CButton>
                      </CTooltip>
                      {/* Category */}
                      <CInputGroupText className="ms-1 text-white bg-dark">
                        Category :
                      </CInputGroupText>
                      <CFormSelect>
                        <option>All</option>
                        {/* {category.map((item, index) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                        ; */}
                      </CFormSelect>
                      {/* Branch */}
                      <CInputGroupText className="ms-1 text-white bg-dark">
                        Branch :
                      </CInputGroupText>
                      <CFormSelect>
                        <option>All</option>
                        {/* {branch.map((item, index) => (
                          <option key={item.id} value={item.id}>
                            {item.BranchName}
                          </option>
                        ))} */}
                      </CFormSelect>
                      {/* Conditions */}
                      <CInputGroupText className="ms-1 bg-dark text-white">
                        Conditions :
                      </CInputGroupText>
                      <CFormSelect>
                        <option>All</option>
                        <option value="true">Good</option>
                        <option value="false">Damaged</option>
                      </CFormSelect>
                    </CInputGroup>
                  </CCol>
                </CForm>

                {/* Table */}
                <CTable align="middle" className="mb-0 border" striped small>
                  {/* Table Header */}
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Request</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Request Type</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">User Approve</CTableHeaderCell>
                      <CTableHeaderCell className="text-start">Status</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Request Detail</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  {/* Table Body */}
                  <CTableBody>
                    {request.length === 0 ? (
                      <CSpinner className="m-2" />
                    ) : (
                      request.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={item.id}>
                          {/* No */}
                          <CTableDataCell className="text-start">
                            <div>{index + 1}.</div>
                          </CTableDataCell>

                          {/* Request */}
                          <CTableDataCell className="text-start">
                            {/* Branch */}
                            <div>
                              <div className="font-monospace text-muted small ">Branch :</div>
                              <div>
                                <div>{item.BranchName}</div>
                              </div>
                            </div>
                            {/* Request No */}
                            <div>
                              <div className="font-monospace text-muted small ">Request No.:</div>
                              <div>
                                <div>{item.requestNo}</div>
                              </div>
                            </div>
                            {/* Created Date */}
                            <div className="mb-2">
                              <div className="font-monospace text-muted small ">Created Date</div>

                              <div>
                                <CIcon icon={cilCalendar} className="me-1" />
                                {item.createdDate}
                              </div>
                            </div>
                          </CTableDataCell>

                          {/* Request Type */}

                          <CTableDataCell className="text-start w-25">
                            {/* TYPE */}
                            <div>
                              <div className="font-monospace text-muted small ">Type :</div>
                              <div>
                                <div>{item.requestType}</div>
                              </div>
                            </div>

                            {/* Descriptions */}
                            <div>
                              <div className="font-monospace text-muted small ">Description:</div>
                              <div className="small">
                                <AdvReadMoreMore
                                  linesToShow={1}
                                  text={item.descriptions}
                                  checkFor={40}
                                  readMoreText="read more.."
                                  readLessText="read less.."
                                />
                              </div>
                            </div>
                          </CTableDataCell>

                          {/* User Approve */}
                          <CTableDataCell>
                            {/* User Approve 1 */}
                            <div>
                              <div className="font-monospace text-muted small ">
                                User Approve 1:
                              </div>
                              <div>
                                <div>
                                  {item.userApproveName1 === null ? '-' : item.userApproveName1}
                                </div>
                              </div>
                            </div>

                            {/* User Approve 2 */}
                            <div>
                              <div className="font-monospace text-muted small ">
                                User Approve 2:
                              </div>
                              <div>
                                <div>
                                  {item.userApproveName2 === null ? '-' : item.userApproveName2}
                                </div>
                              </div>
                            </div>

                            {/* User Approve 3 */}
                            <div>
                              <div className="font-monospace text-muted small ">
                                User Approve 3:
                              </div>
                              <div>
                                <div>
                                  {item.userApproveName3 === null ? '-' : item.userApproveName3}
                                </div>
                              </div>
                            </div>
                          </CTableDataCell>

                          {/* STATUS */}
                          <CTableDataCell>
                            <div>{item.reqStatus}</div>
                          </CTableDataCell>

                          {/* Request Detail */}
                          <CTableDataCell className="text-center">
                            <CButton
                              color="success"
                              size="sm"
                              className="me-1 text-light"
                              onClick={() => (
                                btnReqDetail(item.requestNo), setShowModal(!showModal)
                              )}
                            >
                              <CIcon icon={cilSearch} className="me-2" />
                              Detail
                            </CButton>
                          </CTableDataCell>

                          {/* Actions */}
                          <CTableDataCell className="text-center ">
                            <CButton
                              color="info"
                              size="sm"
                              className="text-light"
                              onClick={
                                () =>
                                  item.requestTypeId === 5
                                    ? navigate(`/admin/request/purchase/${item.requestNo}`)
                                    : item.requestTypeId === 6
                                    ? navigate(`/admin/request/repair/${item.requestNo}`)
                                    : ''
                                // (if (formAddRequest.RequestTypeId === 5) {
                                //   navigate(`/admin/request/purchase/${generateCodeAssets(formReqNo)}`)
                                // }
                                // if (formAddRequest.RequestTypeId === 6) {
                                //   navigate(`/admin/request/repair/${generateCodeAssets(formReqNo)}`)
                                // })
                              }
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ############################ MODAL ############################ */}
      {/* ############################ Request Detail ############################ */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="xl" backdrop="static">
        <CModalHeader className="fw-bold">Request Detail</CModalHeader>
        <CModalBody>
          <CTable align="middle" className=" mt-2 mb-0 border" striped small>
            {/* Table Header */}
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Assets</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Detail</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                <CTableHeaderCell className="text-center">User</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            {/* Table Body */}
            <CTableBody>
              {dataReqNoDetail.length === 0
                ? 'Loading'
                : dataReqNoDetail.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={item.id}>
                      {/* NO */}
                      <CTableDataCell className="text-start">{index + 1}.</CTableDataCell>
                      {/* ASSET */}
                      <CTableDataCell>
                        {/* BRAND */}
                        <div className="fw-bold ">
                          {item.brandName} |{/* TYPE */}
                          <span className="ms-1">{item.type}</span>
                        </div>
                        {/* CATEGORY */}
                        <div>{item.categoryName}</div>

                        {/* Descriptions */}
                        <div className="font-monospace text-muted small ">Description:</div>
                        <div className="small me-5 ">
                          {/* {item.descriptions} */}
                          <AdvReadMoreMore
                            linesToShow={1}
                            text={item.descriptions}
                            checkFor={40}
                            readMoreText="read more.."
                            readLessText="read less.."
                          />
                        </div>
                      </CTableDataCell>
                      {/* Detail */}
                      <CTableDataCell>
                        <div>
                          {/* REQUEST NO */}
                          <div>
                            <div className="font-monospace text-muted small ">Request No.:</div>

                            <div>{item.requestNo}</div>
                          </div>

                          {/* Quantity - Price */}
                          <div>
                            <div className="font-monospace text-muted small ">Quantity:</div>

                            <div>
                              <span>{item.quantity} pcs</span>
                              <span> - </span>
                              <span>@</span>
                              <span>Rp. </span>
                              <span>{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </CTableDataCell>
                      {/* Branch */}
                      <CTableDataCell className="text-start">
                        <div className="font-monospace text-muted small ">Branch:</div>
                        <div className="fw-bold">{item.branchName}</div>

                        <div className="font-monospace text-muted small ">Vendor:</div>
                        <div>{item.vendorName}</div>
                      </CTableDataCell>

                      {/* User */}
                      <CTableDataCell className="text-start">
                        <div>
                          <div>
                            <div className="font-monospace text-muted small ">User:</div>

                            <div>{item.userAsset}</div>
                            <div className="font-monospace text-muted small ">Division:</div>
                            <div>{item.divisionName}</div>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" className="text-light" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AllRequest
