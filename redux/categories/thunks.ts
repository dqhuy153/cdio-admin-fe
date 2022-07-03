import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from './actions'
import { CategoriesResponse } from './types'

//call login api
export const getCategoriesThunkAction = () => async (dispatch: any) => {
  dispatch(getCategoriesRequest())

  try {
    const response = (await api({
      tokenRequired: true,
      path: '/course-categories',
      method: 'GET',
    })) as CategoriesResponse

    dispatch(getCategoriesSuccess(response))
  } catch (error: any) {
    toast.error(error?.message || error || 'Fetch data failed!')
    dispatch(getCategoriesFailure(error))
  }
}
