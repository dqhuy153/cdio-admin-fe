import { FEEDBACK_ACTIONS, FeedbackResponse } from './types'

//-------------------getFeedback-------------------
export const getFeedbackRequest = () => {
  return {
    type: FEEDBACK_ACTIONS.GET_FEEDBACK_REQUEST,
  }
}
export const getFeedbackSuccess = (payload: FeedbackResponse) => {
  return {
    payload,
    type: FEEDBACK_ACTIONS.GET_FEEDBACK_SUCCESS,
  }
}
export const getFeedbackFailure = (error: string) => {
  return {
    error,
    type: FEEDBACK_ACTIONS.GET_FEEDBACK_FAILURE,
  }
}
//-------------------updateFeedback-------------------
export const updateFeedbackRequest = () => {
  return {
    type: FEEDBACK_ACTIONS.UPDATE_FEEDBACK_REQUEST,
  }
}
export const updateFeedbackSuccess = (payload: FeedbackResponse) => {
  return {
    payload,
    type: FEEDBACK_ACTIONS.UPDATE_FEEDBACK_SUCCESS,
  }
}
export const updateFeedbackFailure = (error: string) => {
  return {
    error,
    type: FEEDBACK_ACTIONS.UPDATE_FEEDBACK_FAILURE,
  }
}
//-------------------deleteFeedback-------------------
export const deleteFeedbackRequest = () => {
  return {
    type: FEEDBACK_ACTIONS.DELETE_FEEDBACK_REQUEST,
  }
}
export const deleteFeedbackSuccess = (payload: FeedbackResponse) => {
  return {
    payload,
    type: FEEDBACK_ACTIONS.DELETE_FEEDBACK_SUCCESS,
  }
}
export const deleteFeedbackFailure = (error: string) => {
  return {
    error,
    type: FEEDBACK_ACTIONS.DELETE_FEEDBACK_FAILURE,
  }
}
