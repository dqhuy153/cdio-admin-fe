import axios, { Method, AxiosResponse } from 'axios'

import { getJwt, logout } from './auth'
import { API_URL_V1 } from '../config/constant'

interface ApiDataType {
  path?: string
  method: Method
  params?: object
  data?: object
  headers?: { [key: string]: string }
  tokenRequired?: boolean
}

export const api = async ({
  path,
  method,
  params,
  headers,
  data,
  tokenRequired = true,
}: ApiDataType) => {
  const token = getJwt()
  if (tokenRequired && token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const paramsAxios = {
    method,
    params,
    data,
    url: `${API_URL_V1}${path}`,
    headers: headers || {
      'Content-Type': 'application/json',
    },
  }

  return new Promise((resolve, reject) =>
    axios(paramsAxios)
      .then((response: AxiosResponse) => {
        if (!response) reject('Cannot send request to server!')
        if (!response.data.success) reject(response.data.message)
        if (response?.data?.name === 'TokenExpiredError') return logout()
        resolve(response.data.data)
      })
      .catch((error: any) => {
        const errorMessage =
          error.response.status === 422
            ? error.response.data.data[0].msg
            : error.response.data.message

        if (errorMessage === 'jwt expired') {
          return logout()
        }

        reject(errorMessage)
      })
  )
}
