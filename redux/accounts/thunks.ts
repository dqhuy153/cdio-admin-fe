import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  changePasswordAccountFailure,
  changePasswordAccountRequest,
  changePasswordAccountSuccess,
  createAccountFailure,
  createAccountRequest,
  createAccountSuccess,
  deleteAccountFailure,
  deleteAccountRequest,
  deleteAccountSuccess,
  getAccountManagementFailure,
  getAccountManagementRequest,
  getAccountManagementSuccess,
  updateAccountFailure,
  updateAccountRequest,
  updateAccountSuccess,
} from './actions'
import {
  AccountDetailsResponse,
  AccountManagementResponse,
  CreateAccountPayload,
  UpdateAccountPayload,
} from './types'
import { Callback } from '@utils/types'

//call login api
export const getAccountsManagementThunkAction =
  (query: URLSearchParams | undefined) => async (dispatch: any) => {
    dispatch(getAccountManagementRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/admin/users${query ? `?${query}` : ''}`,
        method: 'GET',
      })) as AccountManagementResponse

      dispatch(getAccountManagementSuccess(response))
    } catch (error: any) {
      toast.error(error?.message || error || 'Fetch data failed!')
      dispatch(getAccountManagementFailure(error))
    }
  }

export const updateAccountDetailsThunkAction =
  (
    payload: UpdateAccountPayload,
    previousQueryUrl: URLSearchParams | undefined,
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(updateAccountRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: '/admin/users/profile',
        method: 'POST',
        data: payload,
      })) as AccountDetailsResponse

      dispatch(updateAccountSuccess(response))
      toast.success('Account updated successfully!')
      callback()
      dispatch(getAccountsManagementThunkAction(previousQueryUrl))
    } catch (error: any) {
      toast.error(error?.message || error || 'Update data failed!')
      dispatch(updateAccountFailure(error))
    }
  }

export const createAccountDetailsThunkAction =
  (
    payload: CreateAccountPayload,
    previousQueryUrl: URLSearchParams | undefined,
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(createAccountRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: '/admin/users/profile',
        method: 'POST',
        data: payload,
      })) as AccountDetailsResponse

      dispatch(createAccountSuccess(response))
      toast.success('Account created successfully!')
      callback()
      if (!previousQueryUrl) return
      dispatch(getAccountsManagementThunkAction(previousQueryUrl))
    } catch (error: any) {
      toast.error(error?.message || error || 'Create account failed!')
      dispatch(createAccountFailure(error))
    }
  }

export const deleteAccountThunkAction =
  (
    userId: string,
    previousQueryUrl: URLSearchParams | undefined,
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(deleteAccountRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/admin/users/${userId}`,
        method: 'DELETE',
      })) as any

      dispatch(deleteAccountSuccess(response))
      toast.success('Account deleted successfully!')
      callback()
      dispatch(getAccountsManagementThunkAction(previousQueryUrl))
    } catch (error: any) {
      toast.error(error?.message || error || 'Delete data failed!')
      dispatch(deleteAccountFailure(error))
    }
  }

export const changePasswordAccountThunkAction =
  (
    payload: { userId: string; newPassword: string },
    previousQueryUrl: URLSearchParams | undefined,
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(changePasswordAccountRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: '/admin/users/profile',
        method: 'POST',
        data: payload,
      })) as AccountDetailsResponse

      dispatch(changePasswordAccountSuccess(response))
      toast.success('Password changed successfully!')
      callback()
      dispatch(getAccountsManagementThunkAction(previousQueryUrl))
    } catch (error: any) {
      toast.error(error?.message || error || 'Change password failed!')
      dispatch(changePasswordAccountFailure(error))
    }
  }
