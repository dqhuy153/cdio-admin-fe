import { STREAM_ACTIONS, StreamResponse } from './types'

//-------------------getStream-------------------
export const getStreamRequest = () => {
  return {
    type: STREAM_ACTIONS.GET_STREAM_REQUEST,
  }
}
export const getStreamSuccess = (payload: StreamResponse) => {
  return {
    payload,
    type: STREAM_ACTIONS.GET_STREAM_SUCCESS,
  }
}
export const getStreamFailure = (error: string) => {
  return {
    error,
    type: STREAM_ACTIONS.GET_STREAM_FAILURE,
  }
}
//-------------------updateStream-------------------
export const updateStreamRequest = () => {
  return {
    type: STREAM_ACTIONS.UPDATE_STREAM_REQUEST,
  }
}
export const updateStreamSuccess = (payload: StreamResponse) => {
  return {
    payload,
    type: STREAM_ACTIONS.UPDATE_STREAM_SUCCESS,
  }
}
export const updateStreamFailure = (error: string) => {
  return {
    error,
    type: STREAM_ACTIONS.UPDATE_STREAM_FAILURE,
  }
}
//-------------------deleteStream-------------------
export const deleteStreamRequest = () => {
  return {
    type: STREAM_ACTIONS.DELETE_STREAM_REQUEST,
  }
}
export const deleteStreamSuccess = (payload: StreamResponse) => {
  return {
    payload,
    type: STREAM_ACTIONS.DELETE_STREAM_SUCCESS,
  }
}
export const deleteStreamFailure = (error: string) => {
  return {
    error,
    type: STREAM_ACTIONS.DELETE_STREAM_FAILURE,
  }
}
