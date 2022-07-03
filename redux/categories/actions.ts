import { CATEGORIES_ACTIONS, CategoriesResponse } from './types'

//-------------------getCategories-------------------
export const getCategoriesRequest = () => {
  return {
    type: CATEGORIES_ACTIONS.GET_CATEGORIES_REQUEST,
  }
}
export const getCategoriesSuccess = (payload: CategoriesResponse) => {
  return {
    payload,
    type: CATEGORIES_ACTIONS.GET_CATEGORIES_SUCCESS,
  }
}
export const getCategoriesFailure = (error: string) => {
  return {
    error,
    type: CATEGORIES_ACTIONS.GET_CATEGORIES_FAILURE,
  }
}
