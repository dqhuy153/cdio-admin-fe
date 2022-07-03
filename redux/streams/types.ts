import { CourseDetailData } from '../courses/types'

export enum STREAM_ACTIONS {
  GET_STREAM_REQUEST = 'stream-management/GET_STREAM_REQUEST',
  GET_STREAM_SUCCESS = 'stream-management/GET_STREAM_SUCCESS',
  GET_STREAM_FAILURE = 'stream-management/GET_STREAM_FAILURE',
  UPDATE_STREAM_REQUEST = 'stream-management/UPDATE_STREAM_REQUEST',
  UPDATE_STREAM_SUCCESS = 'stream-management/UPDATE_STREAM_SUCCESS',
  UPDATE_STREAM_FAILURE = 'stream-management/UPDATE_STREAM_FAILURE',
  DELETE_STREAM_REQUEST = 'stream-management/DELETE_STREAM_REQUEST',
  DELETE_STREAM_SUCCESS = 'stream-management/DELETE_STREAM_SUCCESS',
  DELETE_STREAM_FAILURE = 'stream-management/DELETE_STREAM_FAILURE',
}

export interface StreamResponse {
  stream: StreamDetailData[]
}

export type StreamDetailData = {
  _id: string
  courseId: CourseDetailData
  title: string
  status: number
  participateNumber: number
  createdAt: string
  updatedAt: string
  __v: number
}

export type UpdateStreamPayload = {
  id: string
  title: string
  status: number
  participateNumber: number
}
