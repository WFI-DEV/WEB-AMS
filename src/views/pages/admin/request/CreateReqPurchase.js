import React, { useState, useEffect } from 'react'

import { cilMinus, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CImage,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  getAllBranch,
  getDataBranchById,
  updateDataBranch,
} from 'src/axios/admin/master/axiosBranch'
import { generateCodeAssets } from 'src/utils/generateCodeAssets'
import { convertToRoman } from 'src/utils/convertToRoman'
import { getAllRequestType } from 'src/axios/admin/master/axiosRequestType'
import {
  getUserApprove1ByBranchId,
  getUserApprove2ByBranchId,
  getUserApprove3ByBranchId,
} from 'src/axios/admin/master/axiosUserApprove'
import { addData } from 'src/axios/admin/request/axiosRequest'
import { inputNotComp } from 'src/utils/sweetAlert'
import { useNavigate } from 'react-router-dom'

const CreateReqPurchase = () => {
  // Get All Branch
  const [branch, setBranch] = useState([])
  useEffect(() => {
    getAllBranch((res) => setBranch(res))
  }, [])

  // Get All Request Type
  const [requestType, setRequestType] = useState([])
  useEffect(() => {
    getAllRequestType((res) => setRequestType(res))
  }, [])

  // Form Request No
  const [formReqNo, setFormReqNo] = useState({
    no: '',
    branchCode: '',
    type: '',
    month: '',
    years: '',
  })
  // console.log(formReqNo)
  // Req Type String
  const [reqType, setReqType] = useState('')

  const [userApprove1, setUserApprove1] = useState({})
  const [userApprove2, setUserApprove2] = useState({})
  const [userApprove3, setUserApprove3] = useState({})
  const [tanggal, setTanggal] = useState({
    hari: null,
    bulan: null,
    tahun: null,
  })

  const btnUserApprove = (id) => {
    // console.log(id)
    getUserApprove1ByBranchId(id, (res) => setUserApprove1(res))
    getUserApprove2ByBranchId(id, (res) => setUserApprove2(res))
    getUserApprove3ByBranchId(id, (res) => setUserApprove3(res))
  }

  // Add Request
  const [formAddRequest, setFormAddRequest] = useState({
    BranchId: null,
    RequestNo: null,
    RequestTypeId: null,
    CreatedDate: null,
    FinishDate: null,
    RequestStatusId: 1,
    UserApprove1Id: null,
    UserApprove2Id: null,
    UserApprove3Id: null,
    IsApprove1: null,
    IsApprove2: null,
    IsApprove3: null,
    Descriptions: null,
  })
  console.log(formAddRequest)

  // Edit Seq No REQUEST
  const [branchId, setBranchId] = useState()

  const [formBranch, setFormBranch] = useState({})

  const [formEditSRBranch, setFormEditSRBranch] = useState('')
  // console.log(formEditSRBranch)

  const btnEditBranch = (id) => {
    // console.log(id)
    getDataBranchById(id, (res) => {
      // console.log(res)
      setBranchId(id)
      setFormBranch({
        BranchName: res.BranchName,
        BranchId: res.BranchId,
        CodeBranch: res.CodeBranch,
        SeqNoReq: res.SeqNoReq,
        SeqNoAst: res.SeqNoAst,
      })
    })
  }

  const navigate = useNavigate()

  // Button Submit Add Data
  const submitAdd = () => {
    updateDataBranch(branchId, { ...formBranch, SeqNoReq: formEditSRBranch })
    addData({
      ...formAddRequest,
      RequestNo: generateCodeAssets(formReqNo),
      UserApprove1Id: userApprove1 ? userApprove1.id : null,
      UserApprove2Id: userApprove2 ? userApprove2.id : null,
      UserApprove3Id: userApprove3 ? userApprove3.id : null,
      IsApprove1: userApprove1 ? 0 : null,
      IsApprove2: userApprove2 ? 0 : null,
      IsApprove3: userApprove3 ? 0 : null,
    })
    if (formAddRequest.RequestTypeId === 5) {
      navigate(`/admin/request/purchase/${generateCodeAssets(formReqNo)}`)
    }
    if (formAddRequest.RequestTypeId === 6) {
      navigate(`/admin/request/repair/${generateCodeAssets(formReqNo)}`)
    }
  }

  // Modal New Assets Request
  const [newAR, setNewAR] = useState(false)
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold ">Create Request</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={8}>
                  {/* Choose Branch & Request Type*/}
                  <CCol sm={6}>
                    <CCard style={{ width: '30rem' }}>
                      <CCardBody>
                        <CCol className="mb-2 ">
                          {/* BRANCH */}
                          <CFormSelect
                            id="inputBranch"
                            label={
                              <div>
                                <span className="fw-bold">Branch</span>
                                <span>*</span>
                              </div>
                            }
                            placeholder="Text Here..."
                            onClick={(e) => {
                              btnEditBranch(JSON.parse(e.target.value).id)
                            }}
                            onChange={(e) => {
                              const bulan = (new Date().getMonth() + 1).toString().padStart(2, '0')
                              const tahun = new Date().getFullYear()
                              const tanggal = new Date().getDate()
                              setFormAddRequest({
                                ...formAddRequest,
                                BranchId: JSON.parse(e.target.value).BranchId,
                                CreatedDate: new Date(),
                              })
                              setTanggal({
                                ...tanggal,
                                hari: tanggal,
                                bulan: bulan,
                                tahun: tahun,
                              })
                              setFormReqNo({
                                ...formReqNo,
                                branchCode: JSON.parse(e.target.value).CodeBranch,
                                no: (Number(JSON.parse(e.target.value).SeqNoReq) + 1)
                                  .toString()
                                  .padStart(3, '0'),
                                type: 'RQ',
                                month: convertToRoman(new Date().getMonth() + 1),
                                years: new Date().getFullYear().toString().slice(-2),
                              })
                              btnUserApprove(JSON.parse(e.target.value).BranchId)
                              setFormEditSRBranch(
                                (Number(JSON.parse(e.target.value).SeqNoReq) + 1)
                                  .toString()
                                  .padStart(3, '0'),
                              )

                              // setFormEditSNBranch(
                              //   (Number(JSON.parse(e.target.value).SeqNoAst) + 1)
                              //     .toString()
                              //     .padStart(3, '0'),
                              // )
                              // console.log(
                              //   (Number(JSON.parse(e.target.value).SeqNo) + 1).toString().padStart(3, '0'),
                              // )
                            }}
                          >
                            <option hidden>Choose...</option>
                            {branch.map((item, index) => (
                              <option key={item.id} value={JSON.stringify(item)}>
                                {item.BranchName}
                              </option>
                            ))}
                          </CFormSelect>

                          {/* REQUEST TYPE */}
                          <div className="mt-1 mb-1">
                            <CFormSelect
                              label={
                                <div>
                                  <span className="fw-bold">Request Type</span>
                                  <span>*</span>
                                </div>
                              }
                              onChange={(e) => {
                                setFormAddRequest({
                                  ...formAddRequest,
                                  RequestTypeId: JSON.parse(e.target.value).id,
                                })

                                setReqType(JSON.parse(e.target.value).name)
                              }}
                            >
                              <option hidden>Choose...</option>
                              {requestType.map((item, index) => (
                                <option key={item.id} value={JSON.stringify(item)}>
                                  {item.name}
                                </option>
                              ))}
                            </CFormSelect>
                          </div>

                          {/* DESCRIPTIOn */}

                          <CFormTextarea
                            label={<div className="fw-bold">Description</div>}
                            placeholder="Text Here..."
                            onChange={(e) =>
                              setFormAddRequest({
                                ...formAddRequest,
                                Descriptions: e.target.value,
                              })
                            }
                          />

                          {/* CREATE BUTTON */}
                          <CButton
                            className="mt-2 text-light "
                            size="sm"
                            color="primary"
                            onClick={() => {
                              if (
                                formAddRequest.BranchId === null ||
                                formAddRequest.RequestTypeId === null
                              ) {
                                inputNotComp()
                              } else {
                                submitAdd()
                              }
                            }}
                          >
                            Create
                          </CButton>
                        </CCol>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CCol>
                <CCol sm={4}>
                  <CCallout color="dark">
                    <div>
                      <span className="fw-bold me-1">Request No :</span>
                      <span>{generateCodeAssets(formReqNo)}</span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">Date : </span>
                      <span>
                        {tanggal.hari}-{tanggal.bulan}-{tanggal.tahun}
                      </span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">User Approve 1 :</span>
                      <span>{userApprove1 ? userApprove1.name : '-'}</span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">User Approve 2 :</span>
                      <span>{userApprove2 ? userApprove2.name : '-'}</span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">User Approve 3 :</span>
                      <span>{userApprove3 ? userApprove3.name : '-'}</span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">Request :</span>
                      <span>{reqType}</span>
                    </div>
                  </CCallout>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateReqPurchase
