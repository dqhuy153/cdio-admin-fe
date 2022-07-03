import { CategoriesManagementState } from './../types'
import { CATEGORIES_ACTIONS } from './types'

const initialState: CategoriesManagementState = {
  categories: [],
  error: '',
  loading: false,
}

// tslint:disable-next-line: cyclomatic-complexity
export const categoriesManagement = (
  state = initialState,
  action: any
): CategoriesManagementState => {
  switch (action.type) {
    //-----------get courses management-----------------
    case CATEGORIES_ACTIONS.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CATEGORIES_ACTIONS.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.courseCategories,
        loading: false,
        error: '',
      }
    case CATEGORIES_ACTIONS.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
