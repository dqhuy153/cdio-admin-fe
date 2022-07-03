import { AccountsManagementState } from './../types'
import { ACCOUNT_ACTIONS } from './types'

const initialState: AccountsManagementState = {
  users: [],
  error: '',
  loading: false,
  totalUsers: 0,
}

// tslint:disable-next-line: cyclomatic-complexity
export const accountsManagement = (
  state = initialState,
  action: any
): AccountsManagementState => {
  switch (action.type) {
    //-----------get accounts management-----------------
    case ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        totalUsers: action.payload.totalUsers,
        loading: false,
        error: '',
      }
    case ACCOUNT_ACTIONS.GET_ACCOUNTS_MANAGEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------update account-----------------
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case ACCOUNT_ACTIONS.UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------delete account-----------------
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case ACCOUNT_ACTIONS.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------create account-----------------
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case ACCOUNT_ACTIONS.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------change password account-----------------
    case ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case ACCOUNT_ACTIONS.CHANGE_PASSWORD_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
