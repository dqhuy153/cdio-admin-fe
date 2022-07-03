import { CourseDetailData } from '../courses/types'
import { AccountDetails } from '../accounts/types'

export enum FEEDBACK_ACTIONS {
  GET_FEEDBACK_REQUEST = 'feedback-management/GET_FEEDBACK_REQUEST',
  GET_FEEDBACK_SUCCESS = 'feedback-management/GET_FEEDBACK_SUCCESS',
  GET_FEEDBACK_FAILURE = 'feedback-management/GET_FEEDBACK_FAILURE',
  UPDATE_FEEDBACK_REQUEST = 'feedback-management/UPDATE_FEEDBACK_REQUEST',
  UPDATE_FEEDBACK_SUCCESS = 'feedback-management/UPDATE_FEEDBACK_SUCCESS',
  UPDATE_FEEDBACK_FAILURE = 'feedback-management/UPDATE_FEEDBACK_FAILURE',
  DELETE_FEEDBACK_REQUEST = 'feedback-management/DELETE_FEEDBACK_REQUEST',
  DELETE_FEEDBACK_SUCCESS = 'feedback-management/DELETE_FEEDBACK_SUCCESS',
  DELETE_FEEDBACK_FAILURE = 'feedback-management/DELETE_FEEDBACK_FAILURE',
}

export interface FeedbackResponse {
  feedback: FeedbackDetailData[]
}

export type FeedbackDetailData = {
  _id: string
  userId: AccountDetails
  courseId: CourseDetailData
  content: string
  status: number
  rating: number
  createdAt: string
  updatedAt: string
  __v: number
}

export type UpdateFeedbackPayload = {
  id: string
  content: string
  status: number
  rating: number
}
