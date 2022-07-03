import { api } from '../../utils/api'
import { toast } from 'react-toastify'
import {
  deleteAttachmentFailure,
  deleteAttachmentRequest,
  deleteAttachmentSuccess,
  deleteChapterFailure,
  deleteChapterRequest,
  deleteChapterSuccess,
  deleteLessonFailure,
  deleteLessonRequest,
  deleteLessonSuccess,
  deleteTestFailure,
  deleteTestRequest,
  deleteTestSuccess,
  getChapterFailure,
  getChapterRequest,
  getChapterSuccess,
  updateAttachmentFailure,
  updateAttachmentRequest,
  updateAttachmentSuccess,
  updateChapterFailure,
  updateChapterRequest,
  updateChapterSuccess,
  updateLessonFailure,
  updateLessonRequest,
  updateLessonSuccess,
  updateTestFailure,
  updateTestRequest,
  updateTestSuccess,
} from './actions'
import {
  ChapterDetailResponse,
  UpdateAttachmentPayload,
  UpdateChapterPayload,
  UpdateLessonPayload,
  UpdateLessonsOfChapterPayload,
  UpdateTestPayload,
} from './types'
import { Callback } from '@utils/types'
import { getCourseDetailsThunkAction } from '@redux/courses/thunks'
import { ChapterOverviewData } from '@redux/courses/types'

export const getChapterDetailsThunkAction =
  (id: string) => async (dispatch: any) => {
    dispatch(getChapterRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/chapters/${id}`,
        method: 'GET',
      })) as ChapterOverviewData

      dispatch(getChapterSuccess(response))
    } catch (error: any) {
      toast.error(error?.message || error || 'Fetch data failed!')
      dispatch(getChapterFailure(error))
    }
  }

export const updateChapterDetailsThunkAction =
  (
    payload: UpdateChapterPayload | UpdateLessonsOfChapterPayload,
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(updateChapterRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/chapters/${payload.id}`,
        method: 'PUT',
        data: payload,
      })) as ChapterDetailResponse

      dispatch(updateChapterSuccess(response.chapter))
      toast.success('Chapter updated successfully!')
      callback()
      if (payload.reloadChapterDetails) {
        dispatch(getChapterDetailsThunkAction(payload.id))
        if (
          !response?.chapter?.courseId ||
          typeof response?.chapter?.courseId !== 'string'
        ) {
          return
        }
        dispatch(
          getCourseDetailsThunkAction(response.chapter.courseId as string)
        )
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Update data failed!')
      dispatch(updateChapterFailure(error))
    }
  }

export const deleteChapterThunkAction =
  (
    payload: { chapterId: string; courseId: string | null | undefined },
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(deleteChapterRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/chapters/${payload.chapterId}`,
        method: 'DELETE',
      })) as any

      dispatch(deleteChapterSuccess(response))
      toast.success('Chapter deleted successfully!')
      callback()
      if (payload.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Delete data failed!')
      dispatch(deleteChapterFailure(error))
    }
  }

export const updateLessonDetailsThunkAction =
  (payload: UpdateLessonPayload, callback: Callback) =>
  async (dispatch: any) => {
    dispatch(updateLessonRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/lessons/${payload.id}`,
        method: 'PUT',
        data: payload,
      })) as any

      dispatch(updateLessonSuccess(response))
      toast.success('Lesson updated successfully!')
      callback()
      if (payload?.chapterId) {
        return dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
      if (payload?.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Update data failed!')
      dispatch(updateLessonFailure(error))
    }
  }

export const deleteLessonThunkAction =
  (
    payload: {
      lessonId: string
      courseId: string | null | undefined
      chapterId: string | null | undefined
    },
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(deleteLessonRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/lessons/${payload.lessonId}`,
        method: 'DELETE',
      })) as any

      dispatch(deleteLessonSuccess(response))
      toast.success('Lesson deleted successfully!')
      callback()
      if (payload.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
      if (payload.chapterId) {
        dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Delete data failed!')
      dispatch(deleteLessonFailure(error))
    }
  }

export const updateTestDetailsThunkAction =
  (payload: UpdateTestPayload, callback: Callback) => async (dispatch: any) => {
    dispatch(updateTestRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/tests/${payload.id}`,
        method: 'PUT',
        data: payload,
      })) as any

      dispatch(updateTestSuccess(response))
      toast.success('Test updated successfully!')
      callback()
      if (payload?.chapterId) {
        return dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
      if (payload?.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Update data failed!')
      dispatch(updateTestFailure(error))
    }
  }

export const deleteTestThunkAction =
  (
    payload: {
      testId: string
      courseId?: string | null
      chapterId?: string | null
    },
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(deleteTestRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/tests/${payload.testId}`,
        method: 'DELETE',
      })) as any

      dispatch(deleteTestSuccess(response))
      toast.success('Test deleted successfully!')
      callback()
      if (payload.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
      if (payload.chapterId) {
        dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Delete data failed!')
      dispatch(deleteTestFailure(error))
    }
  }

export const updateAttachmentDetailsThunkAction =
  (payload: UpdateAttachmentPayload, callback: Callback) =>
  async (dispatch: any) => {
    dispatch(updateAttachmentRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/attachments/${payload.id}`,
        method: 'PUT',
        data: payload,
      })) as any

      dispatch(updateAttachmentSuccess(response))
      toast.success('Attachment updated successfully!')
      callback()
      if (payload?.chapterId) {
        return dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
      if (payload?.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Update data failed!')
      dispatch(updateAttachmentFailure(error))
    }
  }

export const deleteAttachmentThunkAction =
  (
    payload: {
      attachmentId: string
      courseId?: string | null
      chapterId?: string | null
    },
    callback: Callback
  ) =>
  async (dispatch: any) => {
    dispatch(deleteAttachmentRequest())

    try {
      const response = (await api({
        tokenRequired: true,
        path: `/attachments/${payload.attachmentId}`,
        method: 'DELETE',
      })) as any

      dispatch(deleteAttachmentSuccess(response))
      toast.success('Attachment deleted successfully!')
      callback()
      if (payload.courseId) {
        dispatch(getCourseDetailsThunkAction(payload.courseId))
      }
      if (payload.chapterId) {
        dispatch(getChapterDetailsThunkAction(payload.chapterId))
      }
    } catch (error: any) {
      toast.error(error?.message || error || 'Delete data failed!')
      dispatch(deleteAttachmentFailure(error))
    }
  }
