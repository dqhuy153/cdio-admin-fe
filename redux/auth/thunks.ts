import {
  getUserDataFailure,
  getUserDataRequest,
  getUserDataSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from './actions'
import { AllDataUserResponse, LoginData, LoginResponse } from './types'
import { api } from '../../utils/api'
import { loginWithJwt, logout } from '../../utils/auth'
import { toast } from 'react-toastify'

//call login api
export const loginThunkAction = (data: LoginData) => async (dispatch: any) => {
  dispatch(loginRequest())

  try {
    const response = (await api({
      data,
      tokenRequired: false,
      path: '/auth/login',
      method: 'POST',
    })) as LoginResponse

    const token = response.token
    loginWithJwt(token)
    toast.success('Login successfully!')
    dispatch(loginSuccess(response))
    dispatch(getAllDataUserThunkAction())
  } catch (error: any) {
    toast.error(error.message || error || 'Login failed!')
    dispatch(loginFailure(error))
  }
}

export const logoutThunkAction = () => (dispatch: any) => {
  dispatch(logoutRequest())

  try {
    logout()
    toast.info('You have been logout of the system!')
    dispatch(logoutSuccess())
  } catch (error: any) {
    toast.error('Logout failed!')
    dispatch(logoutFailure(error))
  }
}

export const getAllDataUserThunkAction = () => async (dispatch: any) => {
  dispatch(getUserDataRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: '/users/all-info',
      method: 'GET',
    })) as AllDataUserResponse

    dispatch(getUserDataSuccess(response))
  } catch (error: any) {
    toast.error("Something went wrong! Can't not get user data!")
    dispatch(logoutThunkAction())
    dispatch(getUserDataFailure(error))
  }
}
