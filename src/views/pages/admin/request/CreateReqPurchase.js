import React, { useState, useEffect } from 'react'

import { cilMinus, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
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
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  getAllBranch,
  getDataBranchById,
  updateDataBranch,
  updateDataBranchCreateReq,
} from 'src/axios/admin/master/axiosBranch'
import { generateCodeAssets } from 'src/utils/generateCodeAssets'
import { convertToRoman } from 'src/utils/convertToRoman'
import { getAllRequestType } from 'src/axios/admin/master/axiosRequestType'
import {
  getUserApprove1ByBranchId,
  getUserApprove2ByBranchId,
  getUserApprove3ByBranchId,
} from 'src/axios/admin/master/axiosUserApprove'
import {
  addData,
  getDataByReqNo,
  updateDataRequest,
  updateDataRequestNoReload,
} from 'src/axios/admin/request/axiosRequest'
import { inputNotComp } from 'src/utils/sweetAlert'
import { useNavigate } from 'react-router-dom'
import { AdvReadMoreMore } from 'read-more-more'
import Swal from 'sweetalert2'
import { getDataByReqNoDetail } from 'src/axios/admin/request/axiosRequestDetail'
import { getAllCategory } from 'src/axios/admin/master/axiosCategory'
import { getAllBrand } from 'src/axios/admin/master/axiosBrand'
import { getAllDivision } from 'src/axios/admin/master/axiosDivision'
import { getSearchVendor } from 'src/axios/admin/master/axiosVendor'

const CreateReqPurchase = () => {
  const navigate = useNavigate()

  const [branch, setBranch] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [division, setDivision] = useState([])
  const [formReqNo, setFormReqNo] = useState({
    no: '',
    branchCode: '',
    type: '',
    month: '',
    years: '',
  })
  const [dataReqNoDetail, setDataReqNoDetail] = useState([])
  const [userApprove1, setUserApprove1] = useState({})
  const [userApprove2, setUserApprove2] = useState({})
  const [userApprove3, setUserApprove3] = useState({})
  const [tanggal, setTanggal] = useState({
    hari: null,
    bulan: null,
    tahun: null,
  })
  const [formAddRequestSubmit, setFormAddRequestSubmit] = useState({
    BranchId: null,
    RequestNo: null,
    RequestTypeId: 5,
    CreatedDate: null,
    FinishDate: null,
    RequestStatusId: 2,
    UserApprove1Id: null,
    UserApprove2Id: null,
    UserApprove3Id: null,
    IsApprove1: null,
    IsApprove2: null,
    IsApprove3: null,
    Descriptions: null,
  })
  const [dataReqNo, setDataReqNo] = useState({})
  const [formEditDescReqNo, setFormEditDescReqNo] = useState({})
  const [idEditDesc, setIdEditDesc] = useState()
  const [quantity, setQuantity] = useState(0)
  const [formAddRequestDraft, setFormAddRequestDraft] = useState({
    BranchId: null,
    RequestNo: null,
    RequestTypeId: 5,
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

  const [branchId, setBranchId] = useState()
  const [formBranch, setFormBranch] = useState({})
  const [formEditSRBranch, setFormEditSRBranch] = useState('')
  const [vendorSearch, setVendorSearch] = useState([])
  const generateReqNo = generateCodeAssets(formReqNo)
  const [formAddAsset, setFormAddAsset] = useState({
    RequestNo: generateReqNo,
    CategoryId: null,
    BrandId: null,
    Type: null,
    BranchId: null,
    DivisionId: null,
    UserAsset: null,
    VendorId: null,
    Descriptions: null,
    DamageId: null,
    Quantity: null,
    Price: 0,
  })
  // Modal New Assets Request
  const [newAR, setNewAR] = useState(false)
  const [editDesc, setEditDesc] = useState(false)

  // Initial HIT API

  const getDataReqNo = (requestNo) => {
    getDataByReqNo(requestNo, (res) => {
      setDataReqNo(res)
      setFormEditDescReqNo({
        BranchId: res.BranchId,
        RequestNo: res.requestNo,
        RequestTypeId: res.requestTypeId,
        CreatedDate: res.createdDate,
        FinishDate: res.finishDate,
        RequestStatusId: res.requestStatusId,
        UserApprove1Id: res.userApprove1Id,
        UserApprove2Id: res.userApprove2Id,
        UserApprove3Id: res.userApprove3Id,
        IsApprove1: res.isApprove1,
        IsApprove2: res.isApprove2,
        IsApprove3: res.isApprove3,
        Descriptions: res.descriptions,
      })
      setIdEditDesc(res.id)
    })
  }

  const get = () => {
    getAllBranch((res) => setBranch(res))
    getAllCategory((res) => setCategory(res))
    getAllBrand((res) => setBrand(res))
    getAllDivision((res) => setDivision(res))

    if (localStorage.getItem('requestNo')) {
      getDataReqNo(localStorage.getItem('requestNo'))
    }
  }

  useEffect(() => {
    get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get REQUEST by REQNO DETAIL

  const btnGetReqNoDetail = () => {
    getDataByReqNoDetail(generateReqNo, (res) => {
      setDataReqNoDetail(res)
    })
  }

  const btnUserApprove = (id) => {
    // console.log(id)
    getUserApprove1ByBranchId(id, (res) => setUserApprove1(res))
    getUserApprove2ByBranchId(id, (res) => setUserApprove2(res))
    getUserApprove3ByBranchId(id, (res) => setUserApprove3(res))
  }

  const btnEditdesc = () => {
    updateDataRequest(idEditDesc, formEditDescReqNo).then((res) => {
      setEditDesc(false)
      getDataReqNo(dataReqNo?.requestNo)
    })
  }

  // Edit Seq No REQUEST

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

  //   GET VENDOR BY BRANCH ID

  // console.log(vendorSearch)

  // const branchId = branchByCode.BranchId
  // console.log(branchId)
  const btnGetVendor = (id) => {
    getSearchVendor(id, (res) => setVendorSearch(res))
  }

  const btnQuantityPlus = () => {
    setQuantity(quantity + 1)
  }

  const btnQuantityMinus = () => {
    if (quantity === 0) {
      setQuantity(quantity)
    } else {
      setQuantity(quantity - 1)
    }
  }

  // Button Submit Data
  const submitAdd = () => {
    updateDataBranch(branchId, { ...formBranch, SeqNoReq: formEditSRBranch })
    addData({
      ...formAddRequestSubmit,
      RequestNo: generateCodeAssets(formReqNo),
      UserApprove1Id: userApprove1 ? userApprove1.id : null,
      UserApprove2Id: userApprove2 ? userApprove2.id : null,
      UserApprove3Id: userApprove3 ? userApprove3.id : null,
      IsApprove1: userApprove1 ? 0 : null,
      IsApprove2: userApprove2 ? 0 : null,
      IsApprove3: userApprove3 ? 0 : null,
    })
  }

  const draftAdd = () => {
    updateDataBranchCreateReq(branchId, { ...formBranch, SeqNoReq: formEditSRBranch })
    addData({
      ...formAddRequestDraft,
      RequestNo: generateCodeAssets(formReqNo),
      UserApprove1Id: userApprove1 ? userApprove1.id : null,
      UserApprove2Id: userApprove2 ? userApprove2.id : null,
      UserApprove3Id: userApprove3 ? userApprove3.id : null,
      IsApprove1: userApprove1 ? 0 : null,
      IsApprove2: userApprove2 ? 0 : null,
      IsApprove3: userApprove3 ? 0 : null,
    }).then(() => {
      localStorage.setItem('requestNo', generateCodeAssets(formReqNo))
      getDataReqNo(generateCodeAssets(formReqNo))
    })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold ">Create Request</CCardHeader>
            <CCardBody>
              {!localStorage.getItem('requestNo') ? (
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
                                btnGetReqNoDetail()
                              }}
                              onChange={(e) => {
                                const bulan = (new Date().getMonth() + 1)
                                  .toString()
                                  .padStart(2, '0')
                                const tahun = new Date().getFullYear()
                                const tanggal = new Date().getDate()
                                setFormAddRequestSubmit({
                                  ...formAddRequestSubmit,
                                  BranchId: JSON.parse(e.target.value).BranchId,
                                  CreatedDate: new Date(),
                                })
                                setFormAddRequestDraft({
                                  ...formAddRequestDraft,
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
                                disabled
                                label={
                                  <div>
                                    <span className="fw-bold">Request Type</span>
                                    <span>*</span>
                                  </div>
                                }
                              >
                                <option>Purchase</option>
                              </CFormSelect>
                            </div>

                            {/* DESCRIPTION */}

                            <CFormTextarea
                              label={<div className="fw-bold">Description</div>}
                              placeholder="Text Here..."
                              onChange={(e) => (
                                setFormAddRequestSubmit({
                                  ...formAddRequestSubmit,
                                  Descriptions: e.target.value,
                                }),
                                setFormAddRequestDraft({
                                  ...formAddRequestDraft,
                                  Descriptions: e.target.value,
                                })
                              )}
                            />

                            <CButton
                              className="mt-2 "
                              size="sm"
                              onClick={() =>
                                formAddRequestDraft.BranchId === null ||
                                formAddRequestDraft.RequestTypeId === null
                                  ? inputNotComp()
                                  : (draftAdd(),
                                    Swal.fire({
                                      // position: 'top-end',
                                      icon: 'success',
                                      title: 'Drafted',
                                      showConfirmButton: false,
                                      timer: 1000,
                                    }))
                              }
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
                        <span>Purchase</span>
                      </div>
                    </CCallout>
                  </CCol>
                </CRow>
              ) : (
                <CRow>
                  <CCol sm={4}>
                    <CCallout color="dark">
                      <div>
                        <span className="fw-bold me-1">Request No :</span>
                        <span>{dataReqNo.requestNo}</span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">Date : </span>
                        <span>{dataReqNo.createdDate}</span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">Request Type :</span>
                        <span>{dataReqNo.requestType}</span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">Status :</span>
                        <span>{dataReqNo.reqStatus === null ? '-' : dataReqNo.reqStatus}</span>
                      </div>
                    </CCallout>
                  </CCol>
                  <CCol sm={4} />

                  <CCol sm={4}>
                    <CCallout color="dark">
                      <div>
                        <span className="fw-bold me-1">User Approve 1 :</span>
                        <span>
                          {dataReqNo.userApproveName1 === null ? '-' : dataReqNo.userApproveName1}
                        </span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">User Approve 2 :</span>
                        {dataReqNo.userApproveName2 === null ? '-' : dataReqNo.userApproveName2}
                        <span></span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">User Approve 3 :</span>
                        {dataReqNo.userApproveName3 === null ? '-' : dataReqNo.userApproveName3}
                        <span></span>
                      </div>

                      <div>
                        <span className="fw-bold me-1">Descriptions :</span>
                        <span>
                          <AdvReadMoreMore
                            linesToShow={1}
                            text={dataReqNo.descriptions}
                            checkFor={40}
                            readMoreText="read more.."
                            readLessText="read less.."
                          />
                        </span>
                        {/* Edit Desc */}

                        <div className="text-end ">
                          <CButton
                            size="sm"
                            color="body"
                            className="text-dark"
                            onClick={() => setEditDesc(!editDesc)}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </div>
                      </div>
                    </CCallout>
                  </CCol>
                </CRow>
              )}

              {/* COLLAPSE */}

              <CCard className="mt-2">
                <CCardHeader className="fw-bold">Purchase Detail</CCardHeader>
                <CCardBody>
                  <div>
                    {/* BUTTON ADD ASSETS */}
                    <CButton
                      color="info"
                      className="mb-1 mt-1 text-light "
                      disabled={!localStorage.getItem('requestNo')}
                      onClick={() => {
                        setNewAR(!newAR)
                        // btnGetVendor(branchId)
                      }}
                    >
                      <CIcon icon={cilPlus} className="me-2 " />
                      New Assets Request
                    </CButton>
                  </div>

                  <CTable align="middle" className=" mt-2 mb-0 border" striped small>
                    {/* Table Header */}
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Assets</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Detail</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">User</CTableHeaderCell>

                        <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>

                    {/* Table Body */}

                    <CTableBody>
                      {dataReqNoDetail.length === 0 ? (
                        <div>No Data!</div>
                      ) : (
                        dataReqNoDetail.map((item, index) => (
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
                                  checkFor={100}
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
                                  <div className="font-monospace text-muted small ">
                                    Request No.:
                                  </div>

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
                            {/* ACTIONS */}
                            <CTableDataCell className="text-center">
                              {/* Delete */}
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
                                      // deleteData(item.id)
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
                                // onClick={() => (
                                //   setEditAR(!editAR),
                                //   btnEditCreateAsset(item.id),
                                //   btnGetVendor(branchId)
                                // )}
                              >
                                <CIcon icon={cilPencil} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      )}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCardBody>

            <CCardFooter className="text-end">
              {/* Draft */}
              <CButton
                className="text-light me-2 "
                color="info"
                onClick={() => {
                  if (
                    formAddRequestDraft.BranchId === null ||
                    formAddRequestDraft.RequestTypeId === null
                  ) {
                    inputNotComp()
                  } else {
                    draftAdd()
                  }
                }}
              >
                Draft
              </CButton>

              {/* SUBMIT */}
              <CButton
                className="text-light "
                color="primary"
                onClick={() => {
                  if (
                    formAddRequestSubmit.BranchId === null ||
                    formAddRequestSubmit.RequestTypeId === null
                  ) {
                    inputNotComp()
                  } else {
                    submitAdd()
                  }
                }}
              >
                Submit
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      {/* ############################# MODAL ######################### */}
      {/* ------------------------ MODAL NEW ASSET EREQUEST ------------- */}

      <CModal
        size="xl"
        backdrop="static"
        visible={newAR}
        onClose={() => {
          setNewAR(false)
          // setQuantity(0)
        }}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilPlus} className="me-2" />
            New Asset Request
          </CModalTitle>
        </CModalHeader>
        {/* Modal Body */}
        <CModalBody>
          {/* Form */}
          <CForm className="row g-3 needs-validation">
            {/* Code Asset*/}
            <CFormLabel>
              {/* <CCol md={3} className="float-end border-bottom border-dark">
                <div>
                  <span className="me-2 fw-bold">Request No. :</span>
                  <span>001/IT/RQ/AMB/II/23</span>
                </div>
              </CCol> */}
            </CFormLabel>
            {/* Category */}
            <CCol md={3} className="">
              <CFormSelect
                label={
                  <div>
                    <span className="fw-bold">Category</span> <span>*</span>
                  </div>
                }
                onChange={(e) => {
                  setFormAddAsset({ ...formAddAsset, CategoryId: JSON.parse(e.target.value).id })
                }}
              >
                <option hidden>Choose...</option>
                {category.map((item, index) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Brand */}
            <CCol md={3}>
              <CFormSelect
                label={
                  <div>
                    <span className="fw-bold">Brand</span> <span>*</span>
                  </div>
                }
                onChange={(e) => setFormAddAsset({ ...formAddAsset, BrandId: e.target.value })}
              >
                <option hidden>Choose...</option>
                {brand.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* TYPE */}
            <CCol md={6}>
              <CFormInput
                id="inputType"
                label={
                  <div>
                    <span className="fw-bold">Type</span> <span>*</span>
                  </div>
                }
                placeholder="Text here..."
                onChange={(e) => setFormAddAsset({ ...formAddAsset, Type: e.target.value })}
              />
            </CCol>

            {/* Vendor */}
            <CCol md={3}>
              <CFormSelect
                label={
                  <div>
                    <span className="fw-bold">Vendor</span> <span>*</span>
                  </div>
                }
                onChange={(e) => setFormAddAsset({ ...formAddAsset, VendorId: e.target.value })}
              >
                <option hidden>Choose...</option>

                {vendorSearch.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Division */}
            <CCol md={3}>
              <CFormSelect
                id="inputState"
                label={
                  <div>
                    <span className="fw-bold">Division</span> <span>*</span>
                  </div>
                }
                onChange={(e) => setFormAddAsset({ ...formAddAsset, DivisionId: e.target.value })}
              >
                <option hidden>Choose...</option>
                {division.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* User */}
            <CCol md={3}>
              <CFormInput
                placeholder="Example: Mr. Jhon"
                id="inputUser"
                label={
                  <div>
                    <span className="fw-bold">User</span> <span>*</span>
                  </div>
                }
                onChange={(e) => setFormAddAsset({ ...formAddAsset, UserAsset: e.target.value })}
              />
            </CCol>

            {/* REQ NO */}
            <CCol md={3}>
              <CFormInput
                id="inputYears"
                label={
                  <div>
                    <span className="fw-bold">Request No.</span> <span>*</span>
                  </div>
                }
                disabled
                value={generateCodeAssets(generateReqNo)}
              />
            </CCol>

            {/* QUANTITY */}
            <CCol md={2}>
              <CFormLabel>
                <div>
                  <span className="fw-bold">Quantity</span> <span>*</span>
                </div>
              </CFormLabel>
              <CInputGroup className="mb-3">
                {/* MINUS */}
                <CButton
                  type="button"
                  color="danger"
                  className="text-light"
                  onClick={() => btnQuantityMinus()}
                >
                  <CIcon icon={cilMinus} />
                </CButton>
                {/* VALUE */}
                <CFormInput
                  value={quantity}
                  className="text-center"
                  onChange={(e) => setFormAddAsset({ ...formAddAsset, Quantity: e.target.value })}
                />
                {/* PLUS */}
                <CButton type="button" color="primary" onClick={() => btnQuantityPlus()}>
                  <CIcon icon={cilPlus} />
                </CButton>
              </CInputGroup>
            </CCol>

            {/* PRICE */}
            <CCol md={4}>
              <CFormLabel>
                <div>
                  <span className="fw-bold">Price</span> <span>*</span>
                </div>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CInputGroupText>Rp.</CInputGroupText>

                <CFormInput
                  placeholder="-"
                  onChange={(e) => {
                    setFormAddAsset({ ...formAddAsset, Price: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>

            {/* DESCRIPTIOn */}
            <CCol md={6} className="fw-bold">
              <CFormTextarea
                label="Description"
                placeholder="Text here..."
                onChange={(e) => setFormAddAsset({ ...formAddAsset, Descriptions: e.target.value })}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            // onClick={() => {
            //   setNewAR(false)
            //   setQuantity(0)
            //   setFormAddAsset({
            //     RequestNo: generateReqNo,
            //     CategoryId: null,
            //     BrandId: null,
            //     Type: null,
            //     BranchId: null,
            //     DivisionId: null,
            //     UserAsset: null,
            //     VendorId: null,
            //     Descriptions: null,
            //     DamageId: null,
            //     Quantity: null,
            //     Price: 0,
            //   })
            // }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            // onClick={() =>
            //   branchId === null ||
            //   formAddAsset.BrandId === null ||
            //   formAddAsset.CategoryId === null ||
            //   formAddAsset.DivisionId === null ||
            //   formAddAsset.Price === 0 ||
            //   quantity === 0 ||
            //   formAddAsset.Type === null ||
            //   formAddAsset.UserAsset === null ||
            //   formAddAsset.VendorId === null
            //     ? inputNotComp()
            //     : createAsset()
            // }
          >
            Create Asset
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ############################## MODAL EDIT DESCRIPTION ################################### */}

      <CModal visible={editDesc} backdrop="static" onClose={() => setEditDesc(false)}>
        <CModalHeader className="fw-bold">Edit Description</CModalHeader>
        <CModalBody>
          <CFormTextarea
            value={formEditDescReqNo.Descriptions}
            onChange={(e) =>
              setFormEditDescReqNo({ ...formEditDescReqNo, Descriptions: e.target.value })
            }
          />
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => btnEditdesc()}>Edit</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CreateReqPurchase
