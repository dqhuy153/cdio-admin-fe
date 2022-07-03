import { StreamManagementState } from './../types'
import { STREAM_ACTIONS } from './types'

const initialState: StreamManagementState = {
  currentStream: null,
  error: '',
  loading: false,
}

// tslint:disable-next-line: cyclomatic-complexity
export const categoriesManagement = (
  state = initialState,
  action: any
): StreamManagementState => {
  switch (action.type) {
    //-----------get stream-----------------
    case STREAM_ACTIONS.GET_STREAM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case STREAM_ACTIONS.GET_STREAM_SUCCESS:
      return {
        ...state,
        currentStream: action.payload.stream,
        loading: false,
        error: '',
      }
    case STREAM_ACTIONS.GET_STREAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------update stream-----------------
    case STREAM_ACTIONS.UPDATE_STREAM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case STREAM_ACTIONS.UPDATE_STREAM_SUCCESS:
      return {
        ...state,
        currentStream: action.payload.stream,
        loading: false,
        error: '',
      }
    case STREAM_ACTIONS.UPDATE_STREAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------delete stream-----------------
    case STREAM_ACTIONS.DELETE_STREAM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case STREAM_ACTIONS.DELETE_STREAM_SUCCESS:
      return {
        ...state,
        currentStream: null,
        loading: false,
        error: '',
      }
    case STREAM_ACTIONS.DELETE_STREAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
