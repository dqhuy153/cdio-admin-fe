import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  deleteStreamFailure,
  deleteStreamRequest,
  deleteStreamSuccess,
  getStreamFailure,
  getStreamRequest,
  getStreamSuccess,
  updateStreamFailure,
  updateStreamRequest,
  updateStreamSuccess
} from './actions'
import { StreamResponse, UpdateStreamPayload } from './types'

export const getStreamThunkAction = (id: string) => async (dispatch: any) => {
  dispatch(getStreamRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/streams/${id}`,
      method: 'GET',
    })) as StreamResponse

    dispatch(getStreamSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Fetch data failed!')
    dispatch(getStreamFailure(error))
  }
}

export const updateStreamThunkAction = (payload: UpdateStreamPayload) => async (dispatch: any) => {
  dispatch(updateStreamRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/streams/${payload.id}`,
      method: 'PUT',
      data: payload
    })) as StreamResponse

    dispatch(updateStreamSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Update stream failed!')
    dispatch(updateStreamFailure(error))
  }
}

export const deleteStreamThunkAction = (id: string) => async (dispatch: any) => {
  dispatch(deleteStreamRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/stream/${id}`,
      method: 'DELETE',
    })) as any

    dispatch(deleteStreamSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Delete stream failed!')
    dispatch(deleteStreamFailure(error))
  }
}
