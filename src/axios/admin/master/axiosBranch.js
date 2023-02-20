import axios from 'axios'
import Swal from 'sweetalert2'

const URLMAXI = `https://api.bpfi.co.id:4416/api/bpfibranch/3DAAD6A46582BAFB0E00FFB45C4259A3EE0C61AB3C6758D7BC8E8A690FEC7685`

const baseUrl = 'http://localhost:4409'
const URL = `${baseUrl}/admin/master/branch`

const getDataMaxi = async (callback) => {
  try {
    let allData = await axios({
      method: 'GET',
      url: URLMAXI,
    })
    callback(allData.data.data)
    // console.log(allData)
  } catch (error) {
    console.log(error.response.data)
  }
}

const importMaxi = async (form) => {
  try {
    const payload = form.map((data) => ({
      BranchName: data.BranchName,
      BranchId: data.BranchID,
    }))
    // console.log(payload)

    await axios({
      method: 'POST',
      url: `${URL}/importmaxi`,
      data: payload,
    })
    Swal.fire('Create', 'Create Success', 'success').then((res) => {
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

const getAllBranch = async (callback) => {
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

const getDataBranchById = async (id, cb) => {
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

const addData = async (form) => {
  try {
    await axios({
      method: 'POST',
      url: URL,
      data: form,
    })
    Swal.fire('Create', 'Create Success', 'success').then((res) => {
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

const updateDataBranch = async (id, form) => {
  try {
    await axios({
      method: 'PUT',
      url: `${URL}/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success').then((res) => {
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

export {
  getDataMaxi,
  getAllBranch,
  getDataBranchById,
  addData,
  updateDataBranch,
  deleteData,
  importMaxi,
}
