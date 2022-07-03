import { ReportManagementState } from '../types'
import { REPORT_ACTIONS } from './types'

const initialState: ReportManagementState = {
  dashboard: null,
  error: '',
  loading: false,
}

// tslint:disable-next-line: cyclomatic-complexity
export const reportManagement = (
  state = initialState,
  action: any
): ReportManagementState => {
  switch (action.type) {
    //-----------get courses management-----------------
    case REPORT_ACTIONS.GET_DASHBOARD_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REPORT_ACTIONS.GET_DASHBOARD_REPORT_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
        loading: false,
        error: '',
      }
    case REPORT_ACTIONS.GET_DASHBOARD_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
