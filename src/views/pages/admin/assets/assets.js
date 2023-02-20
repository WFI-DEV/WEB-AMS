import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { getAllCategory } from 'src/axios/admin/master/axiosCategory'
import { getAllDetail } from 'src/axios/admin/master/axiosDetail'
import {
  getAllBranch,
  updateDataBranch,
  getDataBranchById,
} from 'src/axios/admin/master/axiosBranch'
import { getAllBrand } from 'src/axios/admin/master/axiosBrand'
import { getAllVendor } from 'src/axios/admin/master/axiosVendor'
import { getAllDivision } from 'src/axios/admin/master/axiosDivision'
import { getAllAssets, addData, getDataById, deleteData } from 'src/axios/admin/assets/assetsAxios'

import { cilCalendar, cilFilter, cilPencil, cilPlus, cilQrCode, cilTrash } from '@coreui/icons'
import { generateCodeAssets } from 'src/utils/generateCodeAssets'
import { convertToRoman } from 'src/utils/convertToRoman'
import { AdvReadMoreMore } from 'read-more-more'
import { addAssetsAlert } from 'src/utils/sweetAlert'

const Assets = () => {
  // Get Category Data
  const [category, setCategory] = useState([])
  useEffect(() => {
    getAllCategory((res) => setCategory(res))
  }, [])
  // Modal Add
  const [modalNewAsset, setModalNewAsset] = useState(false)

  // Get Detail Data
  const [detail, setDetail] = useState([])
  useEffect(() => {
    getAllDetail((res) => setDetail(res))
  }, [])

  // Get Branch Data
  const [branch, setBranch] = useState([])
  useEffect(() => {
    getAllBranch((res) => setBranch(res))
  }, [])

  // Get Branch Data
  const [brand, setBrand] = useState([])
  useEffect(() => {
    getAllBrand((res) => setBrand(res))
  }, [])

  // Get All Vendor
  const [vendor, setVendor] = useState([])
  useEffect(() => {
    getAllVendor((res) => setVendor(res))
  }, [])

  // Get All Division
  const [division, setDivision] = useState([])
  useEffect(() => {
    getAllDivision((res) => setDivision(res))
  }, [])

  // Get All Assets
  const [assets, setAssets] = useState([])
  useEffect(() => {
    getAllAssets((res) => setAssets(res))
  }, [])

  // Form new code asset
  const [formNewCode, setFormNewCode] = useState({
    no: '',
    categoryCode: '',
    branchCode: '',
    month: '',
    years: '',
  })

  // FORM NEW ASSET
  const [formAdd, setFormAdd] = useState({
    category_id: null,
    brand_id: null,
    type: null,
    purchase_date: null,
    code_asset: null,
    branch_id: null,
    division_id: null,
    condition: null,
    vendor_id: null,
    user_asset: null,
    no_invoice: null,
    detail_id: null,
    no_submission: 'Input by: Admin Pusat',
    descriptions: '-',
  })
  // console.log(formAdd)

  const [branchId, setBranchId] = useState()

  // Edit Seq No Branch
  const [formBranch, setFormBranch] = useState({})

  const [formEditSNBranch, setFormEditSNBranch] = useState('')
  // console.log(formEditSNBranch)

  const btnEditBranch = (id) => {
    // console.log(id)
    getDataBranchById(id, (res) => {
      // console.log(res)
      setBranchId(id)
      setFormBranch({
        BranchName: res.BranchName,
        BranchId: res.BranchId,
        CodeBranch: res.CodeBranch,
        SeqNo: res.SeqNo,
      })
    })
  }

  // Button Submit Add New Asset
  const submitAdd = () => {
    addData({ ...formAdd, code_asset: generateCodeAssets(formNewCode) })
    updateDataBranch(branchId, { ...formBranch, SeqNo: formEditSNBranch })
    // console.log(generateCodeAssets(formNewCode))
    // console.log(formBranch({ ...formBranch, SeqNo: formEditSNBranch }))
  }

  // FORM EDIT ASSET
  const [formEdit, setFormEdit] = useState({})
  // console.log(formEdit)
  // Id Edit
  const [dataId, setDataId] = useState()

  // Button Submit Edit Asset
  const btnEdit = (id) => {
    getDataById(id, (res) => {
      const x = res.code_asset
      const y = x.split('/')
      console.log(y)
      setDataId(id)
      setFormEdit({
        category_id: res.category_id,
        brand_id: res.brand_id,
        type: res.type,
        purchase_date: res.purchase_date.slice(0, 10),
        code_asset: res.code_asset,
        branch_id: res.branch_id,
        division_id: res.division_id,
        condition: res.condition,
        vendor_id: res.vendor_id,
        user_asset: res.user_asset,
        no_invoice: res.no_invoice,
        detail_id: res.detail_id,
        no_submission: 'Edited by: Admin Pusat',
        descriptions: '-',
        brandName: res.brandName,
        categoryName: res.categoryName,
        BranchName: res.BranchName,
        detailName: res.detailName,
        vendorName: res.vendorName,
        divisionName: res.divisionName,
      })
    })
  }

  const submitEdit = () => {}

  // Modal Edit
  const [editButton, setEditButton] = useState(false)

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold">Assets</CCardHeader>
            <CCardBody>
              {/* + NEW ASSET */}
              <CButton
                color="primary"
                onClick={() => {
                  setModalNewAsset(!modalNewAsset)
                }}
                className="mb-3 mt-1"
              >
                <CIcon icon={cilPlus} className="me-2" />
                New Asset by Admin
              </CButton>

              {/* ---------------------------- FILTER ---------------------------- */}

              <CForm small className="row gy-2 gx-3 align-items-center  mb-2">
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
                      {category.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      ;
                    </CFormSelect>
                    {/* Branch */}
                    <CInputGroupText className="ms-1 text-white bg-dark">Branch :</CInputGroupText>
                    <CFormSelect>
                      <option>All</option>
                      {branch.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.BranchName}
                        </option>
                      ))}
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

              {/* -------------------------------  TABLE ------------------------------- */}
              <CTable small responsive align="middle" className="mb-0 border" striped>
                {/* Table Header */}
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-start">No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Assets</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Branch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Conditions</CTableHeaderCell>

                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                {/* Table Body */}
                <CTableBody>
                  {assets.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* No */}
                      <CTableDataCell className="text-start">
                        <div>{index + 1}.</div>
                      </CTableDataCell>
                      {/* Assets */}

                      <CTableDataCell align="vertical" className="text-start w-25">
                        {/* BRAND */}
                        <div className="fw-bold ">
                          {item.brandName} |{/* TYPE */}
                          <span className="ms-1">{item.type}</span>
                        </div>
                        {/* CATEGORY */}
                        <div>{item.categoryName}</div>
                        {/* PURCHASE DATE */}
                        <div className="mb-2">
                          <div>
                            <CIcon icon={cilCalendar} className="me-1" />
                            {item.purchase_date.substring(0, 10)}
                          </div>
                        </div>
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

                      {/* Code */}
                      <CTableDataCell className="text-start">
                        {/* Code asset */}
                        <div>
                          <div>
                            <div className="font-monospace text-muted small ">Asset:</div>

                            <div>{item.code_asset}</div>
                          </div>

                          <div>
                            <div className="font-monospace text-muted small ">Invoice:</div>

                            <div>{item.no_invoice}</div>
                          </div>

                          <div>
                            <div className="font-monospace text-muted small ">Submission:</div>

                            <div>{item.no_submission}</div>
                          </div>
                        </div>
                      </CTableDataCell>
                      {/* Branch */}
                      <CTableDataCell className="text-start">
                        <div className="font-monospace text-muted small ">Branch:</div>
                        <div>{item.BranchName}</div>

                        <div className="font-monospace text-muted small ">Vendor:</div>
                        <div>{item.vendorName}</div>
                      </CTableDataCell>
                      {/* User */}
                      <CTableDataCell className="text-start">
                        <div>
                          <div>
                            <div className="font-monospace text-muted small ">User:</div>

                            <div>{item.user_asset}</div>
                            <div className="font-monospace text-muted small ">Division:</div>
                            <div>{item.divisionName}</div>
                          </div>
                        </div>
                      </CTableDataCell>
                      {/* Condition */}
                      <CTableDataCell className="text-end">
                        <div>
                          <div>
                            <div className="font-monospace text-muted small ">Condition:</div>

                            <div>
                              {item.condition === true ? (
                                <span className="text-success">Good</span>
                              ) : (
                                <span className="text-danger">Damaged</span>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="font-monospace text-muted small ">Detail:</div>

                            <div>{item.detailName}</div>
                          </div>
                        </div>
                      </CTableDataCell>
                      {/* Actions */}
                      <CTableDataCell className="text-center">
                        {/* DELETE */}
                        <CContainer>
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

                          {/* EDIT */}
                          <CButton
                            color="info"
                            size="sm"
                            className="me-1 text-light"
                            onClick={() => {
                              setEditButton(!editButton)
                              btnEdit(item.id)
                            }}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>

                          {/* QR */}
                          <CButton color="success" size="sm" className="me-1 text-light">
                            <CIcon icon={cilQrCode} />
                          </CButton>
                        </CContainer>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ###################################-  End -############################################## */}

      {/* ###################################-  MODAL -############################################## */}

      {/* ###################################-  MODAL + NEW ASSET by ADMIN -####################### */}

      <CModal
        size="xl"
        backdrop="static"
        visible={modalNewAsset}
        onClose={() => setModalNewAsset(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilPlus} className="me-2" />
            New Asset by Admin
          </CModalTitle>
        </CModalHeader>
        {/* Modal Body */}
        <CModalBody>
          {/* Form */}
          <CForm className="row g-3 needs-validation">
            {/* Code Asset*/}
            <CFormLabel>
              <CCol md={3} className="float-end border-bottom border-dark">
                <div>
                  <span className="me-2 fw-bold">Code Asset :</span>
                  <span>{generateCodeAssets(formNewCode)}</span>
                </div>
              </CCol>
            </CFormLabel>
            {/* Category */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Category"
                onChange={(e) => {
                  // console.log(JSON.parse(e.target.value).id)
                  setFormAdd({ ...formAdd, category_id: JSON.parse(e.target.value).id })
                  setFormNewCode({ ...formNewCode, categoryCode: JSON.parse(e.target.value).code })
                }}
                required
              >
                <option hidden value="">
                  Choose...
                </option>
                {category.map((item, index) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Brand */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Brand"
                onChange={(e) => setFormAdd({ ...formAdd, brand_id: e.target.value })}
              >
                <option selected="" value="" hidden>
                  Choose...
                </option>
                {brand.map((item, index) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* TYPE */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputType"
                label="Type"
                placeholder="Text here..."
                onChange={(e) => setFormAdd({ ...formAdd, type: e.target.value })}
              />
            </CCol>

            {/* Branch */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Branch"
                onClick={(e) => btnEditBranch(JSON.parse(e.target.value).id)}
                onChange={(e) => {
                  setFormAdd({ ...formAdd, branch_id: JSON.parse(e.target.value).BranchId })
                  setFormNewCode({
                    ...formNewCode,
                    branchCode: JSON.parse(e.target.value).CodeBranch,
                    no: (Number(JSON.parse(e.target.value).SeqNo) + 1).toString().padStart(3, '0'),
                  })
                  setFormEditSNBranch(
                    (Number(JSON.parse(e.target.value).SeqNo) + 1).toString().padStart(3, '0'),
                  )
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
            </CCol>

            {/* DATE PURCHASE */}
            <CCol md={3} className="fw-bold">
              <CFormLabel>Purchase Date</CFormLabel>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  const dateValue = e.target.value
                  const dateObj = new Date(dateValue)
                  const month = dateObj.getMonth() + 1
                  const monthRoman = convertToRoman(month)
                  const year = dateObj.getFullYear().toString().slice(-2)
                  console.log(monthRoman)

                  setFormAdd({ ...formAdd, purchase_date: e.target.value })
                  setFormNewCode({ ...formNewCode, month: monthRoman, years: year })
                }}
              />
            </CCol>

            {/* Condition */}
            <CCol md={2}>
              <CFormLabel className="fw-bold">Condition</CFormLabel>
              <br />

              <CFormCheck
                className="text-success"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox1"
                value="option1"
                label="Good"
                onChange={() => setFormAdd({ ...formAdd, condition: true })}
              />

              <CFormCheck
                className="text-danger"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox2"
                value="option2"
                label="Damaged"
                onChange={() => setFormAdd({ ...formAdd, condition: false })}
              />
            </CCol>

            {/* No Submission */}
            <CCol md={4} className="fw-bold">
              <CFormInput
                id="inputYears"
                label="No. Submission"
                disabled
                placeholder="Input by: Admin"
              />
            </CCol>

            {/* Detail */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Detail"
                onChange={(e) => setFormAdd({ ...formAdd, detail_id: e.target.value })}
              >
                <option hidden>Choose...</option>
                {detail.map((item, index) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Vendor */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Vendor"
                onChange={(e) => setFormAdd({ ...formAdd, vendor_id: e.target.value })}
              >
                <option hidden>Choose...</option>

                {vendor.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Division */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                id="inputState"
                label="Divison"
                onChange={(e) => setFormAdd({ ...formAdd, division_id: e.target.value })}
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
            <CCol md={3} className="fw-bold">
              <CFormInput
                placeholder="Example: Mr. Jhon"
                id="inputUser"
                label="User"
                onChange={(e) => setFormAdd({ ...formAdd, user_asset: e.target.value })}
              />
            </CCol>

            {/* Invoice */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputInvoice"
                label="No. Invoice"
                placeholder="Text Here..."
                onChange={(e) => setFormAdd({ ...formAdd, no_invoice: e.target.value })}
              />
            </CCol>

            {/* DESCRIPTIOn */}
            <CCol md={6} className="fw-bold">
              <CFormTextarea
                label="Description"
                onChange={(e) => setFormAdd({ ...formAdd, descriptions: e.target.value })}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalNewAsset(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() =>
              formAdd.category_id === null ||
              formAdd.brand_id === null ||
              formAdd.type === null ||
              formAdd.branch_id === null ||
              formAdd.purchase_date === null ||
              formAdd.condition === null ||
              formAdd.detail_id === null ||
              formAdd.vendor_id === null ||
              formAdd.division_id === null ||
              formAdd.user_asset === null ||
              formAdd.no_invoice === null
                ? addAssetsAlert()
                : submitAdd()
            }
          >
            Create Asset
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ##########------------------------- EDIT MODAL ---------------------------------########## */}
      <CModal size="xl" backdrop="static" visible={editButton} onClose={() => setEditButton(false)}>
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilPencil} className="me-2" />
            Edit Asset by Admin
          </CModalTitle>
        </CModalHeader>
        {/* Modal Body */}
        <CModalBody>
          {/* Form */}
          <CForm className="row g-3 needs-validation">
            {/* Code Asset*/}
            <CFormLabel>
              <CCol md={3} className="float-end border-bottom border-dark">
                <div>
                  <span className="me-2 fw-bold">Code Asset :</span>
                  <span>{formEdit.code_asset}</span>
                </div>
              </CCol>
            </CFormLabel>
            {/* Category */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Category"
                // onChange={(e) => {
                //   setFormAdd({ ...formAdd, category_id: JSON.parse(e.target.value).id })
                //   setFormNewCode({ ...formNewCode, categoryCode: JSON.parse(e.target.value).code })
                // }}
                required
              >
                <option hidden value="">
                  {formEdit.categoryName}
                </option>
                {category.map((item, index) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Brand */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Brand"
                // onChange={(e) => setFormAdd({ ...formAdd, brand_id: e.target.value })}
              >
                <option selected="" value="" hidden>
                  {formEdit.brandName}
                </option>
                {brand.map((item, index) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* TYPE */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputType"
                label="Type"
                value={formEdit.type}
                // onChange={(e) => setFormAdd({ ...formAdd, type: e.target.value })}
              />
            </CCol>

            {/* Branch */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Branch"
                // onClick={(e) => btnEditBranch(JSON.parse(e.target.value).id)}
                // onChange={(e) => {
                //   setFormAdd({ ...formAdd, branch_id: JSON.parse(e.target.value).BranchId })
                //   setFormNewCode({
                //     ...formNewCode,
                //     branchCode: JSON.parse(e.target.value).CodeBranch,
                //     no: (Number(JSON.parse(e.target.value).SeqNo) + 1).toString().padStart(3, '0'),
                //   })
                //   setFormEditSNBranch(
                //     (Number(JSON.parse(e.target.value).SeqNo) + 1).toString().padStart(3, '0'),
                //   )
                // }}
              >
                <option hidden>{formEdit.BranchName}</option>
                {branch.map((item, index) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.BranchName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* DATE PURCHASE */}
            <CCol md={3} className="fw-bold">
              <CFormLabel>Purchase Date</CFormLabel>
              <input
                type="date"
                className="form-control"
                value={formEdit.purchase_date}
                // onChange={(e) => {
                //   const dateValue = e.target.value
                //   const dateObj = new Date(dateValue)
                //   const month = dateObj.getMonth() + 1
                //   const monthRoman = convertToRoman(month)
                //   const year = dateObj.getFullYear().toString().slice(-2)
                //   console.log(monthRoman)

                //   setFormAdd({ ...formAdd, purchase_date: e.target.value })
                //   setFormNewCode({ ...formNewCode, month: monthRoman, years: year })
                // }}
              />
            </CCol>

            {/* Condition */}
            <CCol md={2}>
              <CFormLabel className="fw-bold">Condition</CFormLabel>
              <br />

              <CFormCheck
                className="text-success"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox1"
                value="option1"
                label="Good"
                // onChange={() => setFormAdd({ ...formAdd, condition: true })}
              />

              <CFormCheck
                className="text-danger"
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox2"
                value="option2"
                label="Damaged"
                // onChange={() => setFormAdd({ ...formAdd, condition: false })}
              />
            </CCol>

            {/* No Submission */}
            <CCol md={4} className="fw-bold">
              <CFormInput
                id="inputYears"
                label="No. Submission"
                value={formEdit.no_submission}
                disabled
              />
            </CCol>

            {/* Detail */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Detail"
                // onChange={(e) => setFormAdd({ ...formAdd, detail_id: e.target.value })}
              >
                <option hidden>{formEdit.detailName}</option>
                {detail.map((item, index) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Vendor */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                label="Vendor"
                // onChange={(e) => setFormAdd({ ...formAdd, vendor_id: e.target.value })}
              >
                <option hidden>{formEdit.vendorName}</option>

                {vendor.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* Division */}
            <CCol md={3} className="fw-bold">
              <CFormSelect
                id="inputState"
                label="Divison"
                // onChange={(e) => setFormAdd({ ...formAdd, division_id: e.target.value })}
              >
                <option hidden>{formEdit.divisionName}</option>
                {division.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            {/* User */}
            <CCol md={3} className="fw-bold">
              <CFormInput
                id="inputUser"
                value={formEdit.user_asset}
                label="User"
                // onChange={(e) => setFormAdd({ ...formAdd, user_asset: e.target.value })}
              />
            </CCol>

            {/* Invoice */}
            <CCol md={6} className="fw-bold">
              <CFormInput
                id="inputInvoice"
                label="No. Invoice"
                value={formEdit.no_invoice}
                // onChange={(e) => setFormAdd({ ...formAdd, no_invoice: e.target.value })}
              />
            </CCol>

            {/* DESCRIPTIOn */}
            <CCol md={6} className="fw-bold">
              <CFormTextarea
                label="Description"
                value={formEdit.descriptions}
                // onChange={(e) => setFormAdd({ ...formAdd, descriptions: e.target.value })}
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditButton(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            // onClick={() =>
            //   formAdd.category_id === null ||
            //   formAdd.brand_id === null ||
            //   formAdd.type === null ||
            //   formAdd.branch_id === null ||
            //   formAdd.purchase_date === null ||
            //   formAdd.condition === null ||
            //   formAdd.detail_id === null ||
            //   formAdd.vendor_id === null ||
            //   formAdd.division_id === null ||
            //   formAdd.user_asset === null ||
            //   formAdd.no_invoice === null
            //     ? addAssetsAlert()
            //     : submitAdd()
            // }
          >
            Create Asset
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Assets
