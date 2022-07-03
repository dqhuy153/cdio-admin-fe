import { ChapterOverviewData } from '@redux/courses/types'
import { CHAPTER_ACTIONS } from './types'

//-------------------getChapter-------------------
export const getChapterRequest = () => {
  return {
    type: CHAPTER_ACTIONS.GET_CHAPTER_REQUEST,
  }
}
export const getChapterSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.GET_CHAPTER_SUCCESS,
  }
}
export const getChapterFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.GET_CHAPTER_FAILURE,
  }
}
//-------------------updateChapter-------------------
export const updateChapterRequest = () => {
  return {
    type: CHAPTER_ACTIONS.UPDATE_CHAPTER_REQUEST,
  }
}
export const updateChapterSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.UPDATE_CHAPTER_SUCCESS,
  }
}
export const updateChapterFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.UPDATE_CHAPTER_FAILURE,
  }
}

//-------------------deleteChapter-------------------
export const deleteChapterRequest = () => {
  return {
    type: CHAPTER_ACTIONS.DELETE_CHAPTER_REQUEST,
  }
}
export const deleteChapterSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.DELETE_CHAPTER_SUCCESS,
  }
}
export const deleteChapterFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.DELETE_CHAPTER_FAILURE,
  }
}

//-------------------updateLesson-------------------
export const updateLessonRequest = () => {
  return {
    type: CHAPTER_ACTIONS.UPDATE_LESSON_REQUEST,
  }
}
export const updateLessonSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.UPDATE_LESSON_SUCCESS,
  }
}
export const updateLessonFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.UPDATE_LESSON_FAILURE,
  }
}

//-------------------deleteLesson-------------------
export const deleteLessonRequest = () => {
  return {
    type: CHAPTER_ACTIONS.DELETE_LESSON_REQUEST,
  }
}
export const deleteLessonSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.DELETE_LESSON_SUCCESS,
  }
}
export const deleteLessonFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.DELETE_LESSON_FAILURE,
  }
}
//-------------------updateTest-------------------
export const updateTestRequest = () => {
  return {
    type: CHAPTER_ACTIONS.UPDATE_TEST_REQUEST,
  }
}
export const updateTestSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.UPDATE_TEST_SUCCESS,
  }
}
export const updateTestFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.UPDATE_TEST_FAILURE,
  }
}

//-------------------deleteTest-------------------
export const deleteTestRequest = () => {
  return {
    type: CHAPTER_ACTIONS.DELETE_TEST_REQUEST,
  }
}
export const deleteTestSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.DELETE_TEST_SUCCESS,
  }
}
export const deleteTestFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.DELETE_TEST_FAILURE,
  }
}
//-------------------updateAttachment-------------------
export const updateAttachmentRequest = () => {
  return {
    type: CHAPTER_ACTIONS.UPDATE_ATTACHMENT_REQUEST,
  }
}
export const updateAttachmentSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.UPDATE_ATTACHMENT_SUCCESS,
  }
}
export const updateAttachmentFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.UPDATE_ATTACHMENT_FAILURE,
  }
}

//-------------------deleteAttachment-------------------
export const deleteAttachmentRequest = () => {
  return {
    type: CHAPTER_ACTIONS.DELETE_ATTACHMENT_REQUEST,
  }
}
export const deleteAttachmentSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.DELETE_ATTACHMENT_SUCCESS,
  }
}
export const deleteAttachmentFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.DELETE_ATTACHMENT_FAILURE,
  }
}
//-------------------updateComment-------------------
export const updateCommentRequest = () => {
  return {
    type: CHAPTER_ACTIONS.UPDATE_COMMENT_REQUEST,
  }
}
export const updateCommentSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.UPDATE_COMMENT_SUCCESS,
  }
}
export const updateCommentFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.UPDATE_COMMENT_FAILURE,
  }
}

//-------------------deleteComment-------------------
export const deleteCommentRequest = () => {
  return {
    type: CHAPTER_ACTIONS.DELETE_COMMENT_REQUEST,
  }
}
export const deleteCommentSuccess = (payload: ChapterOverviewData) => {
  return {
    payload,
    type: CHAPTER_ACTIONS.DELETE_COMMENT_SUCCESS,
  }
}
export const deleteCommentFailure = (error: string) => {
  return {
    error,
    type: CHAPTER_ACTIONS.DELETE_COMMENT_FAILURE,
  }
}
