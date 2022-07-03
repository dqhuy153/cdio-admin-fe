import { AllDataUserResponse, AUTH_ACTIONS, LoginResponse } from './types'

export const loginRequest = () => {
  return {
    type: AUTH_ACTIONS.LOGIN_REQUEST,
  }
}

export const loginSuccess = (data: LoginResponse) => {
  return {
    data,
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
  }
}

export const loginFailure = (error: string) => {
  return {
    error,
    type: AUTH_ACTIONS.LOGIN_FAILURE,
  }
}

export const logoutRequest = () => {
  return {
    type: AUTH_ACTIONS.LOGOUT_REQUEST,
  }
}

export const logoutSuccess = () => {
  return {
    type: AUTH_ACTIONS.LOGOUT_SUCCESS,
  }
}

export const logoutFailure = (error: string) => {
  return {
    error,
    type: AUTH_ACTIONS.LOGOUT_FAILURE,
  }
}

export const getUserDataRequest = () => {
  return {
    type: AUTH_ACTIONS.GET_USER_DATA_REQUEST,
  }
}

export const getUserDataSuccess = (data: AllDataUserResponse) => {
  return {
    data,
    type: AUTH_ACTIONS.GET_USER_DATA_SUCCESS,
  }
}

export const getUserDataFailure = (error: string) => {
  return {
    error,
    type: AUTH_ACTIONS.GET_USER_DATA_FAILURE,
  }
}
