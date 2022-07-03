import {
  COURSE_ACTIONS,
  CoursesManagementResponse,
  CourseDetailsResponse,
} from './types'

//-------------------getCourseManagement-------------------
export const getCoursesManagementRequest = () => {
  return {
    type: COURSE_ACTIONS.GET_COURSES_MANAGEMENT_REQUEST,
  }
}
export const getCoursesManagementSuccess = (
  payload: CoursesManagementResponse
) => {
  return {
    payload,
    type: COURSE_ACTIONS.GET_COURSES_MANAGEMENT_SUCCESS,
  }
}
export const getCoursesManagementFailure = (error: string) => {
  return {
    error,
    type: COURSE_ACTIONS.GET_COURSES_MANAGEMENT_FAILURE,
  }
}
//-------------------getCourse-------------------
export const getCourseRequest = () => {
  return {
    type: COURSE_ACTIONS.GET_COURSE_REQUEST,
  }
}
export const getCourseSuccess = (payload: CourseDetailsResponse) => {
  return {
    payload,
    type: COURSE_ACTIONS.GET_COURSE_SUCCESS,
  }
}
export const getCourseFailure = (error: string) => {
  return {
    error,
    type: COURSE_ACTIONS.GET_COURSE_FAILURE,
  }
}
//-------------------updateCourse-------------------
export const updateCourseRequest = () => {
  return {
    type: COURSE_ACTIONS.UPDATE_COURSE_REQUEST,
  }
}
export const updateCourseSuccess = (payload: CourseDetailsResponse) => {
  return {
    payload,
    type: COURSE_ACTIONS.UPDATE_COURSE_SUCCESS,
  }
}
export const updateCourseFailure = (error: string) => {
  return {
    error,
    type: COURSE_ACTIONS.UPDATE_COURSE_FAILURE,
  }
}

//-------------------deleteCourse-------------------
export const deleteCourseRequest = () => {
  return {
    type: COURSE_ACTIONS.DELETE_COURSE_REQUEST,
  }
}
export const deleteCourseSuccess = (payload: CourseDetailsResponse) => {
  return {
    payload,
    type: COURSE_ACTIONS.DELETE_COURSE_SUCCESS,
  }
}
export const deleteCourseFailure = (error: string) => {
  return {
    error,
    type: COURSE_ACTIONS.DELETE_COURSE_FAILURE,
  }
}
