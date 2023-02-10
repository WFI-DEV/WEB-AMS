import axios from 'axios'

const URL = `https://api.bpfi.co.id:4416/api/bpfibranch/3DAAD6A46582BAFB0E00FFB45C4259A3EE0C61AB3C6758D7BC8E8A690FEC7685`

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

export { getAllData }
