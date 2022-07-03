import { ChapterOverviewData } from '@redux/courses/types'

export enum CHAPTER_ACTIONS {
  UPDATE_CHAPTER_REQUEST = 'chapter-management/UPDATE_CHAPTER_REQUEST',
  UPDATE_CHAPTER_SUCCESS = 'chapter-management/UPDATE_CHAPTER_SUCCESS',
  UPDATE_CHAPTER_FAILURE = 'chapter-management/UPDATE_CHAPTER_FAILURE',
  DELETE_CHAPTER_REQUEST = 'chapter-management/DELETE_CHAPTER_REQUEST',
  DELETE_CHAPTER_SUCCESS = 'chapter-management/DELETE_CHAPTER_SUCCESS',
  DELETE_CHAPTER_FAILURE = 'chapter-management/DELETE_CHAPTER_FAILURE',
  GET_CHAPTER_REQUEST = 'chapter-management/GET_CHAPTER_REQUEST',
  GET_CHAPTER_SUCCESS = 'chapter-management/GET_CHAPTER_SUCCESS',
  GET_CHAPTER_FAILURE = 'chapter-management/GET_CHAPTER_FAILURE',
  UPDATE_LESSON_REQUEST = 'chapter-management/UPDATE_LESSON_REQUEST',
  UPDATE_LESSON_SUCCESS = 'chapter-management/UPDATE_LESSON_SUCCESS',
  UPDATE_LESSON_FAILURE = 'chapter-management/UPDATE_LESSON_FAILURE',
  DELETE_LESSON_REQUEST = 'chapter-management/DELETE_LESSON_REQUEST',
  DELETE_LESSON_SUCCESS = 'chapter-management/DELETE_LESSON_SUCCESS',
  DELETE_LESSON_FAILURE = 'chapter-management/DELETE_LESSON_FAILURE',
  UPDATE_TEST_REQUEST = 'chapter-management/UPDATE_TEST_REQUEST',
  UPDATE_TEST_SUCCESS = 'chapter-management/UPDATE_TEST_SUCCESS',
  UPDATE_TEST_FAILURE = 'chapter-management/UPDATE_TEST_FAILURE',
  DELETE_TEST_REQUEST = 'chapter-management/DELETE_TEST_REQUEST',
  DELETE_TEST_SUCCESS = 'chapter-management/DELETE_TEST_SUCCESS',
  DELETE_TEST_FAILURE = 'chapter-management/DELETE_TEST_FAILURE',
  UPDATE_ATTACHMENT_REQUEST = 'chapter-management/UPDATE_ATTACHMENT_REQUEST',
  UPDATE_ATTACHMENT_SUCCESS = 'chapter-management/UPDATE_ATTACHMENT_SUCCESS',
  UPDATE_ATTACHMENT_FAILURE = 'chapter-management/UPDATE_ATTACHMENT_FAILURE',
  DELETE_ATTACHMENT_REQUEST = 'chapter-management/DELETE_ATTACHMENT_REQUEST',
  DELETE_ATTACHMENT_SUCCESS = 'chapter-management/DELETE_ATTACHMENT_SUCCESS',
  DELETE_ATTACHMENT_FAILURE = 'chapter-management/DELETE_ATTACHMENT_FAILURE',
  UPDATE_COMMENT_REQUEST = 'chapter-management/UPDATE_COMMENT_REQUEST',
  UPDATE_COMMENT_SUCCESS = 'chapter-management/UPDATE_COMMENT_SUCCESS',
  UPDATE_COMMENT_FAILURE = 'chapter-management/UPDATE_COMMENT_FAILURE',
  DELETE_COMMENT_REQUEST = 'chapter-management/DELETE_COMMENT_REQUEST',
  DELETE_COMMENT_SUCCESS = 'chapter-management/DELETE_COMMENT_SUCCESS',
  DELETE_COMMENT_FAILURE = 'chapter-management/DELETE_COMMENT_FAILURE',
}

export type courseIdOverviewType = {
  _id: string
  title: string
  description: string
  author: {
    _id: string
    email: string
    firstName: string
    lastName: string
  }
}

export type ChapterDetailResponse = {
  chapter: ChapterOverviewData
}

export type LessonOverviewData = {
  _id: string
  title: string
  url?: string
  status: number
  description?: string
  attachments: AttachmentDetailData[]
  tests: TestDetailData[]
  comments: CommentDetailData[]
  createdAt: string
  updatedAt: string
  slug: string
  chapter?: string
  __v: number
}

export type AttachmentDetailData = {
  _id: string
  number?: number
  title: string
  description?: string
  url: string
  slug: string
  status: number
  lesson?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type TestDetailData = {
  _id: string
  number?: number
  title: string
  description?: string
  slug: string
  questions: TestQuestionData[]
  status: number
  lesson?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type TestQuestionData = {
  question: string
  a: string
  b: string
  c?: string
  d?: string
  e?: string
  answer: string
}

export type CommentDetailData = {
  content: string
  user?: string
  lesson?: string
  status: number
  dateTime: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type UpdateChapterPayload = {
  id: string
  reloadChapterDetails: boolean
  title?: string
  description?: string
  slug?: string
  status?: number
}

export type UpdateLessonsOfChapterPayload = {
  id: string
  reloadChapterDetails: boolean
  lessons: string[]
}

export type UpdateLessonPayload = {
  chapterId?: string
  courseId?: string
  id: string
  title?: string
  description?: string
  slug?: string
  status?: number
  tests?: string[]
  attachments?: string[]
}

export type UpdateTestPayload = {
  chapterId?: string
  courseId?: string
  id: string
  title?: string
  description?: string
  slug?: string
  status?: number
  questions?: TestQuestionData[]
}

export type UpdateAttachmentPayload = {
  chapterId?: string
  courseId?: string
  id: string
  title?: string
  description?: string
  slug?: string
  status?: number
}
