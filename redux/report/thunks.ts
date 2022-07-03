import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  getDashboardReportFailure,
  getDashboardReportRequest,
  getDashboardReportSuccess,
} from './actions'
import { DashboardReportResponse } from './types'

//call login api
export const getDashboardReportThunkAction = () => async (dispatch: any) => {
  dispatch(getDashboardReportRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: '/report/admin/dashboard',
      method: 'GET',
    })) as DashboardReportResponse

    dispatch(getDashboardReportSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Fetch data failed!')
    dispatch(getDashboardReportFailure(error))
  }
}
