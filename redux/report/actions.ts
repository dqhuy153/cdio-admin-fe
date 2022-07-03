import { REPORT_ACTIONS, DashboardReportResponse } from './types'

//-------------------getDashboardReport-------------------
export const getDashboardReportRequest = () => {
  return {
    type: REPORT_ACTIONS.GET_DASHBOARD_REPORT_REQUEST,
  }
}
export const getDashboardReportSuccess = (payload: DashboardReportResponse) => {
  return {
    payload,
    type: REPORT_ACTIONS.GET_DASHBOARD_REPORT_SUCCESS,
  }
}
export const getDashboardReportFailure = (error: string) => {
  return {
    error,
    type: REPORT_ACTIONS.GET_DASHBOARD_REPORT_FAILURE,
  }
}
