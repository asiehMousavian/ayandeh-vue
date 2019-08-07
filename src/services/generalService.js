import axios from 'axios'

axios.defaults.baseURL = process.env.SERVER_URL

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {'X-Session': localStorage.getItem('session')}
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default {
  // ============== General Get method
  getMethod (url, data = {params: {}}) {
    return axios.get(url, data)
      .then(response => {
        return response.data
      })
  },
  // ============== General Put method
  putMethod (url, data) {
    return axios.put(url, data)
      .then(response => {
        return response.data
      })
  },
  // ============== General Delete method
  deleteMethod (url) {
    return axios.delete(url)
      .then(response => {
        return response.data
      })
  },
  // ============== General Post method
  postMethod (url, data = {}) {
    return axios.post(url, data)
      .then(response => {
        return response.data
      })
  },
  // ============== General Upload method
  uploadFile (formData) {
    return axios.post('/medias',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response => {
      return response.data
    })
      .catch(error => {
        return error
      })
  },
  setSession () {
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.headers = {'X-Session': localStorage.getItem('session')}
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
  }
}
