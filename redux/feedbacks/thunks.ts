import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  deleteFeedbackFailure,
  deleteFeedbackRequest,
  deleteFeedbackSuccess,
  getFeedbackFailure,
  getFeedbackRequest,
  getFeedbackSuccess,
  updateFeedbackFailure,
  updateFeedbackRequest,
  updateFeedbackSuccess
} from './actions'
import { FeedbackResponse, UpdateFeedbackPayload } from './types'

export const getFeedbackThunkAction = (id: string) => async (dispatch: any) => {
  dispatch(getFeedbackRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/feedbacks/${id}`,
      method: 'GET',
    })) as FeedbackResponse

    dispatch(getFeedbackSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Fetch data failed!')
    dispatch(getFeedbackFailure(error))
  }
}

export const updateFeedbackThunkAction = (payload: UpdateFeedbackPayload) => async (dispatch: any) => {
  dispatch(updateFeedbackRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/feedback/${payload.id}`,
      method: 'PUT',
      data: payload
    })) as FeedbackResponse

    dispatch(updateFeedbackSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Update Feedback failed!')
    dispatch(updateFeedbackFailure(error))
  }
}

export const deleteFeedbackThunkAction = (id: string) => async (dispatch: any) => {
  dispatch(deleteFeedbackRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: `/feedback/${id}`,
      method: 'DELETE',
    })) as any

    dispatch(deleteFeedbackSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Delete Feedback failed!')
    dispatch(deleteFeedbackFailure(error))
  }
}
