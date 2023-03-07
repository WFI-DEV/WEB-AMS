import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:4409'
const URL = `${baseUrl}/admin/request/`

const getAllRequest = async (callback) => {
  try {
    let allData = await axios({
      method: 'GET',
      url: URL,
    })
    callback(allData.data.data)
    // console.log(allData)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getAllPurchaseRequest = async (callback) => {
  try {
    let allData = await axios({
      method: 'GET',
      url: `${URL}purchase`,
    })
    callback(allData.data.data)
    // console.log(allData)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getAllRepairRequest = async (callback) => {
  try {
    let allData = await axios({
      method: 'GET',
      url: `${URL}repair`,
    })
    callback(allData.data.data)
    // console.log(allData)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getDataById = async (id, cb) => {
  try {
    let dataById = await axios({
      method: 'GET',
      url: `${URL}/${id}`,
    })
    cb(dataById.data.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const getDataByReqNo = async (id, cb) => {
  try {
    let dataById = await axios({
      method: 'GET',
      url: `${URL}reqno/${id}`,
    })
    cb(dataById.data.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addData = async (form) => {
  try {
    await axios({
      method: 'POST',
      url: URL,
      data: form,
    })
    // Swal.fire('Create', 'Create Success', 'success')
  } catch (err) {
    console.log(err.response.data)
  }
}

const deleteData = async (id) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${URL}/${id}`,
    })
    Swal.fire('Deleted!', 'Your data has been deleted.', 'success').then((res) => {
      if (res.isConfirmed) {
        window.location.reload(true)
      } else {
        window.location.reload(true)
      }
    })
  } catch (err) {
    console.log(err.response.data)
  }
}

const updateDataRequest = async (id, form) => {
  try {
    await axios({
      method: 'PUT',
      url: `${URL}${id}`,
      data: form,
    })
    return Swal.fire('Update', 'Update Success', 'success')
  } catch (err) {
    console.log(err.response.data)
  }
}

export {
  getAllRequest,
  getDataById,
  addData,
  deleteData,
  updateDataRequest,
  getDataByReqNo,
  getAllPurchaseRequest,
  getAllRepairRequest,
}
