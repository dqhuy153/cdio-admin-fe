import {
  ACCOUNT_ACTIONS,
  AccountManagementResponse,
  AccountDetailsResponse,
} from './types'

//-------------------getAccountManagement-------------------
export const getAccountManagementRequest = () => {
  return {
    type: ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_REQUEST,
  }
}
export const getAccountManagementSuccess = (
  payload: AccountManagementResponse
) => {
  return {
    payload,
    type: ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_SUCCESS,
  }
}
export const getAccountManagementFailure = (error: string) => {
  return {
    error,
    type: ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_FAILURE,
  }
}
//-------------------updateAccount-------------------
export const updateAccountRequest = () => {
  return {
    type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_REQUEST,
  }
}
export const updateAccountSuccess = (payload: AccountDetailsResponse) => {
  return {
    payload,
    type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_SUCCESS,
  }
}
export const updateAccountFailure = (error: string) => {
  return {
    error,
    type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT_FAILURE,
  }
}
//-------------------changePasswordAccount-------------------
export const changePasswordAccountRequest = () => {
  return {
    type: ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_REQUEST,
  }
}
export const changePasswordAccountSuccess = (
  payload: AccountDetailsResponse
) => {
  return {
    payload,
    type: ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_SUCCESS,
  }
}
export const changePasswordAccountFailure = (error: string) => {
  return {
    error,
    type: ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_FAILURE,
  }
}
//-------------------createAccount-------------------
export const createAccountRequest = () => {
  return {
    type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_REQUEST,
  }
}
export const createAccountSuccess = (payload: AccountDetailsResponse) => {
  return {
    payload,
    type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_SUCCESS,
  }
}
export const createAccountFailure = (error: string) => {
  return {
    error,
    type: ACCOUNT_ACTIONS.CREATE_ACCOUNT_FAILURE,
  }
}
//-------------------deleteAccount-------------------
export const deleteAccountRequest = () => {
  return {
    type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_REQUEST,
  }
}
export const deleteAccountSuccess = (payload: AccountDetailsResponse) => {
  return {
    payload,
    type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_SUCCESS,
  }
}
export const deleteAccountFailure = (error: string) => {
  return {
    error,
    type: ACCOUNT_ACTIONS.DELETE_ACCOUNT_FAILURE,
  }
}
