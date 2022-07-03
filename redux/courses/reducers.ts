import { CoursesManagementState } from './../types'
import { COURSE_ACTIONS } from './types'

const initialState: CoursesManagementState = {
  courses: [],
  error: '',
  loading: false,
  updateLoading: false,
  totalCourses: 0,
  currentCourse: null,
}

// tslint:disable-next-line: cyclomatic-complexity
export const coursesManagement = (
  state = initialState,
  action: any
): CoursesManagementState => {
  switch (action.type) {
    //-----------get courses management-----------------
    case COURSE_ACTIONS.GET_COURSES_MANAGEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COURSE_ACTIONS.GET_COURSES_MANAGEMENT_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        totalCourses: action.payload.totalCourses,
        loading: false,
        error: '',
      }
    case COURSE_ACTIONS.GET_COURSES_MANAGEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------get course-----------------
    case COURSE_ACTIONS.GET_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COURSE_ACTIONS.GET_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        currentCourse: action.payload.course,
      }
    case COURSE_ACTIONS.GET_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------update course-----------------
    case COURSE_ACTIONS.UPDATE_COURSE_REQUEST:
      return {
        ...state,
        updateLoading: true,
      }
    case COURSE_ACTIONS.UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        error: '',
      }
    case COURSE_ACTIONS.UPDATE_COURSE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.error,
      }
    //-----------delete course-----------------
    case COURSE_ACTIONS.DELETE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COURSE_ACTIONS.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case COURSE_ACTIONS.DELETE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
