import { FeedbackManagementState } from './../types'
import { FEEDBACK_ACTIONS } from './types'

const initialState: FeedbackManagementState = {
  currentFeedback: null,
  error: '',
  loading: false,
}

// tslint:disable-next-line: cyclomatic-complexity
export const feedbackManagement = (
  state = initialState,
  action: any
): FeedbackManagementState => {
  switch (action.type) {
    //-----------getFeedback-----------------
    case FEEDBACK_ACTIONS.GET_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FEEDBACK_ACTIONS.GET_FEEDBACK_SUCCESS:
      return {
        ...state,
        currentFeedback: action.payload.feedback,
        loading: false,
        error: '',
      }
    case FEEDBACK_ACTIONS.GET_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------updateFeedback-----------------
    case FEEDBACK_ACTIONS.UPDATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FEEDBACK_ACTIONS.UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        currentFeedback: action.payload.feedback,
        loading: false,
        error: '',
      }
    case FEEDBACK_ACTIONS.UPDATE_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------deleteFeedback-----------------
    case FEEDBACK_ACTIONS.DELETE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FEEDBACK_ACTIONS.DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        currentFeedback: null,
        loading: false,
        error: '',
      }
    case FEEDBACK_ACTIONS.DELETE_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
