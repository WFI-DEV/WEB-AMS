import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import { cilPlus, cilMinus, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CModalFooter,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { AdvReadMoreMore } from 'read-more-more'
import { getDataBranchByCode } from 'src/axios/admin/master/axiosBranch'
import { getAllBrand } from 'src/axios/admin/master/axiosBrand'
import { getAllCategory } from 'src/axios/admin/master/axiosCategory'
import { getAllDivision } from 'src/axios/admin/master/axiosDivision'
import { getSearchVendor } from 'src/axios/admin/master/axiosVendor'
import { getDataByReqNo } from 'src/axios/admin/request/axiosRequest'
import {
  getDataByReqNoDetail,
  addData,
  deleteData,
  getDataById,
  updateData,
} from 'src/axios/admin/request/axiosRequestDetail'
import { generateCodeAssets } from 'src/utils/generateCodeAssets'

const RequestByIdPurchase = () => {
  // Get All CATEGORy
  const [category, setCategory] = useState([])
  useEffect(() => {
    getAllCategory((res) => setCategory(res))
  }, [])

  // Get All BRAND
  const [brand, setBrand] = useState([])
  useEffect(() => {
    getAllBrand((res) => setBrand(res))
  }, [])

  // Get All Division
  const [division, setDivision] = useState([])
  useEffect(() => {
    getAllDivision((res) => setDivision(res))
  }, [])

  // Get REQUEST by REQNO
  let { no, branchCode, typeReq, month, year } = useParams()
  const [reqNo, setReqNo] = useState({
    no: no,
    branchCode: branchCode,
    typeReq: typeReq,
    month: month,
    year: year,
  })
  const generateReqNo = generateCodeAssets(reqNo)

  const [dataReqNo, setDataReqNo] = useState([])
  useEffect(() => {
    getDataByReqNo(generateReqNo, (res) => setDataReqNo(res))
  }, [])
  //   console.log(dataReqNo)

  const codeBranch = reqNo.branchCode
  const [branchByCode, setBranchByCode] = useState({})
  useEffect(() => {
    getDataBranchByCode(codeBranch, (res) => setBranchByCode(res))
  }, [])
  // console.log(branchByCode)

  // Get REQUEST by REQNO DETAIL
  const [dataReqNoDetail, setDataReqNoDetail] = useState([])
  useEffect(() => {
    getDataByReqNoDetail(generateReqNo, (res) => setDataReqNoDetail(res))
  }, [])
  // console.log(dataReqNoDetail)

  //   GET VENDOR BY BRANCH ID
  const [vendorSearch, setVendorSearch] = useState([])
  // console.log(vendorSearch)

  const branchId = branchByCode.BranchId
  // console.log(branchId)
  const btnGetVendor = (id) => {
    getSearchVendor(id, (res) => setVendorSearch(res))
  }

  // useEffect(() => {
  //   getSearchVendor(branchId, (res) => setVendorSearch(res))
  // }, [])

  //   QUANTITY + -
  const [quantity, setQuantity] = useState(0)

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

  // ADD NEW ASSET (REQUEST DETAIL )
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

  // console.log(formAddAsset)

  // Button CREATE ASSET
  const createAsset = () => {
    addData({ ...formAddAsset, Quantity: quantity, BranchId: branchId })
    console.log({ ...formAddAsset, Quantity: quantity, BranchId: branchId })
  }

  // Edit Data
  // Id Edit
  const [createAssetId, setCreateAssetsId] = useState()
  // Form Edit
  const [formEditCreateAsset, setFormEditCreateAsset] = useState({})
  const [quantityEdit, setQuantityEdit] = useState(0)

  const btnEditCreateAsset = (id) => {
    getDataById(id, (res) => {
      setCreateAssetsId(id)
      setFormEditCreateAsset({
        RequestNo: res.requestNo,
        CategoryId: res.categoryId,
        CategoryName: res.categoryName,
        BrandId: res.brandId,
        BrandName: res.brandName,
        Type: res.type,
        BranchId: res.branchId,
        BranchName: res.branchName,
        DivisionId: res.divisionId,
        DivisionName: res.divisionName,
        UserAsset: res.userAsset,
        VendorId: res.vendorId,
        VendorName: res.vendorName,
        Descriptions: res.descriptions,
        DamageId: res.damageId,
        Quantity: res.quantity,
        Price: res.price,
      })
      setQuantityEdit(res.quantity)
    })
  }
  console.log(formEditCreateAsset)

  const btnQuantityEditPlus = () => {
    setQuantityEdit(quantityEdit + 1)
  }

  const btnQuantityEditMinus = () => {
    if (quantityEdit === 0) {
      setQuantityEdit(quantityEdit)
    } else {
      setQuantityEdit(quantityEdit - 1)
    }
  }

  const submitEdit = () => {
    updateData(createAssetId, { ...formEditCreateAsset, Quantity: quantityEdit })
    // console.log({ ...formEditCreateAsset, Quantity: quantityEdit })
  }

  // Modal New Asset Request
  const [newAR, setNewAR] = useState(false)
  const [editAR, setEditAR] = useState(false)

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Request Purchase</CCardHeader>
            <CCardBody>
              <CRow>
                {/* <CCol sm={8}></CCol> */}
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
                      <span className="fw-bold me-1">Request :</span>
                      <span>{dataReqNo.requestType}</span>
                    </div>

                    <div>
                      <span className="fw-bold me-1">Status :</span>
                      <span>{dataReqNo.reqStatus === null ? '-' : dataReqNo.reqStatus}</span>
                    </div>
                  </CCallout>
                </CCol>
              </CRow>

              <CCard>
                <CCardHeader className="fw-bold">Asset Request Purchase</CCardHeader>
                <CCardBody>
                  <div>
                    <CButton
                      color="info"
                      className="mb-1 mt-1 text-light "
                      onClick={() => {
                        setNewAR(!newAR)
                        btnGetVendor(branchId)
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
                      {dataReqNoDetail.map((item, index) => (
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
                              onClick={() => (
                                setEditAR(!editAR),
                                btnEditCreateAsset(item.id),
                                btnGetVendor(branchId)
                              )}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
                <CCardFooter className="text-end">
                  <CButton>
                    <CIcon icon={cilPlus} className="me-2 " />
                    Submit Request
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCardBody>
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
          setQuantity(0)
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
                value={generateCodeAssets(reqNo)}
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
            onClick={() => {
              setNewAR(false)
              setQuantity(0)
              // setFormAdd({
              //   category_id: null,
              //   brand_id: null,
              //   type: null,
              //   purchase_date: null,
              //   code_asset: null,
              //   branch_id: null,
              //   division_id: null,
              //   condition: null,
              //   vendor_id: null,
              //   user_asset: null,
              //   no_invoice: null,
              //   statusAssets_id: null,
              //   request_no: 'Input by: Admin Pusat',
              //   descriptions: '-',
              // })
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            // onClick={() =>
            //   formAdd.category_id === null ||
            //   formAdd.brand_id === null ||
            //   formAdd.type === null ||
            //   formAdd.type === '' ||
            //   formAdd.branch_id === null ||
            //   formAdd.purchase_date === null ||
            //   formAdd.condition === null ||
            //   formAdd.statusAssets_id === null ||
            //   formAdd.vendor_id === null ||
            //   formAdd.division_id === null ||
            //   formAdd.user_asset === null ||
            //   formAdd.user_asset === '' ||
            //   formAdd.no_invoice === null ||
            //   formAdd.no_invoice === ''
            //     ? inputNotComp()
            //     : submitAdd()
            // }
            onClick={() => createAsset()}
          >
            Create Asset
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ------------------------ MODAL EDIT ASSET EREQUEST ------------- */}

      <CModal
        size="xl"
        backdrop="static"
        visible={editAR}
        onClose={() => {
          setEditAR(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilPencil} className="me-2" />
            Edit Asset Request
          </CModalTitle>
        </CModalHeader>
        {/* Modal Body */}
        <CModalBody>
          {/* Form */}
          <CForm className="row g-3 needs-validation">
            {/* Code Asset*/}
            <CFormLabel></CFormLabel>
            {/* Category */}
            <CCol md={3} className="">
              <CFormSelect
                label={
                  <div>
                    <span className="fw-bold">Category</span> <span>*</span>
                  </div>
                }
                onChange={(e) => {
                  setFormEditCreateAsset({
                    ...formEditCreateAsset,
                    CategoryId: JSON.parse(e.target.value).id,
                  })
                }}
              >
                <option hidden>{formEditCreateAsset.CategoryName}</option>
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
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, BrandId: e.target.value })
                }
              >
                <option hidden>{formEditCreateAsset.BrandName}</option>
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
                placeholder={formEditCreateAsset.Type}
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, Type: e.target.value })
                }
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
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, VendorId: e.target.value })
                }
              >
                <option hidden>{formEditCreateAsset.VendorName}</option>

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
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, DivisionId: e.target.value })
                }
              >
                <option hidden>{formEditCreateAsset.DivisionName}</option>
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
                placeholder={formEditCreateAsset.UserAsset}
                id="inputUser"
                label={
                  <div>
                    <span className="fw-bold">User</span> <span>*</span>
                  </div>
                }
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, UserAsset: e.target.value })
                }
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
                value={generateCodeAssets(reqNo)}
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
                  onClick={() => btnQuantityEditMinus()}
                >
                  <CIcon icon={cilMinus} />
                </CButton>
                {/* VALUE */}
                <CFormInput
                  value={quantityEdit}
                  className="text-center"
                  onChange={(e) =>
                    setFormEditCreateAsset({ ...formEditCreateAsset, Quantity: e.target.value })
                  }
                />
                {/* PLUS */}
                <CButton type="button" color="primary" onClick={() => btnQuantityEditPlus()}>
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
                  placeholder={formEditCreateAsset.Price}
                  onChange={(e) => {
                    setFormEditCreateAsset({ ...formEditCreateAsset, Price: e.target.value })
                  }}
                />
              </CInputGroup>
            </CCol>

            {/* DESCRIPTIOn */}
            <CCol md={6} className="fw-bold">
              <CFormTextarea
                label="Description"
                placeholder={formEditCreateAsset.Descriptions}
                onChange={(e) =>
                  setFormEditCreateAsset({ ...formEditCreateAsset, Descriptions: e.target.value })
                }
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setEditAR(false)

              // setFormAdd({
              //   category_id: null,
              //   brand_id: null,
              //   type: null,
              //   purchase_date: null,
              //   code_asset: null,
              //   branch_id: null,
              //   division_id: null,
              //   condition: null,
              //   vendor_id: null,
              //   user_asset: null,
              //   no_invoice: null,
              //   statusAssets_id: null,
              //   request_no: 'Input by: Admin Pusat',
              //   descriptions: '-',
              // })
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            // onClick={() =>
            //   formAdd.category_id === null ||
            //   formAdd.brand_id === null ||
            //   formAdd.type === null ||
            //   formAdd.type === '' ||
            //   formAdd.branch_id === null ||
            //   formAdd.purchase_date === null ||
            //   formAdd.condition === null ||
            //   formAdd.statusAssets_id === null ||
            //   formAdd.vendor_id === null ||
            //   formAdd.division_id === null ||
            //   formAdd.user_asset === null ||
            //   formAdd.user_asset === '' ||
            //   formAdd.no_invoice === null ||
            //   formAdd.no_invoice === ''
            //     ? inputNotComp()
            //     : submitAdd()
            // }
            onClick={() => submitEdit()}
          >
            Edit Asset
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default RequestByIdPurchase
