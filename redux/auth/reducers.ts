import { UserInfoState } from '@redux/types'
import { AUTH_ACTIONS } from './types'

const initialState: UserInfoState = {
  _id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: {},
  email: '',
  role: {
    id: null,
    name: '',
  },
  teachingCourses: [],
  notifications: [],
  learningCourses: [],
  createdAt: '',
  updatedAt: '',
  error: '',
  loading: false,
  token: '',
  isLoggedIn: false,
}

export const userInfo = (state = initialState, action: any): UserInfoState => {
  switch (action.type) {
    /***** login ******/
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        token: 'null',
      }
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.data.token,
        _id: action.data.userId,
        isLoggedIn: true,
        error: '',
      }
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isLoggedIn: false,
      }
    /***** logout ******/
    case AUTH_ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...initialState,
      }
    case AUTH_ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    /***** get user data (all data) ******/
    case AUTH_ACTIONS.GET_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_ACTIONS.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.data.user,
      }
    case AUTH_ACTIONS.GET_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
