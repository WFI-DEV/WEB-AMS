import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:4409'
const URL = `${baseUrl}/admin/master/damage`

const getAllData = async (callback) => {
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

const updateData = async (id, form) => {
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

export { getAllData, getDataById, addData, deleteData, updateData }
