import { courseIdOverviewType, LessonOverviewData } from '@redux/chapters/types'

export enum COURSE_ACTIONS {
  GET_COURSES_MANAGEMENT_REQUEST = 'courses-management/GET_COURSES_MANAGEMENT_REQUEST',
  GET_COURSES_MANAGEMENT_SUCCESS = 'courses-management/GET_COURSES_MANAGEMENT_SUCCESS',
  GET_COURSES_MANAGEMENT_FAILURE = 'courses-management/GET_COURSES_MANAGEMENT_FAILURE',
  UPDATE_COURSE_REQUEST = 'courses-management/UPDATE_COURSE_REQUEST',
  UPDATE_COURSE_SUCCESS = 'courses-management/UPDATE_COURSE_SUCCESS',
  UPDATE_COURSE_FAILURE = 'courses-management/UPDATE_COURSE_FAILURE',
  DELETE_COURSE_REQUEST = 'courses-management/DELETE_COURSE_REQUEST',
  DELETE_COURSE_SUCCESS = 'courses-management/DELETE_COURSE_SUCCESS',
  DELETE_COURSE_FAILURE = 'courses-management/DELETE_COURSE_FAILURE',
  GET_COURSE_REQUEST = 'courses-management/GET_COURSE_REQUEST',
  GET_COURSE_SUCCESS = 'courses-management/GET_COURSE_SUCCESS',
  GET_COURSE_FAILURE = 'courses-management/GET_COURSE_FAILURE',
}

export interface CourseOverviewData {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: {
    _id: string
    email: string
    firstName: string
    lastName: string
  }
  topic: {
    _id: string
    title: string
    courseCategoryId: {
      _id: string
      title: string
      status: number
      discountPercent: number
      slug: string
      __v: number
    }
    status: number
    discountPercent: number
    slug: string
    __v: number
  }
  tags: string[]
  price: number
  discount: number
  status: number
  learnersDetail: string[]
  streams: string[]
  feedbacks: string[]
  chapters: string[]
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
}

export type CoursesManagementResponse = {
  courses: CourseOverviewData[]
  totalCourses: number
}

export type learnersDetailData = {
  payment: {
    status: number
    price: number
    brandId: any
    methodId: any
    invoiceId: any
    discount: number
  }
  _id: string
  userId?: {
    _id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
  isDone: boolean
  status: number
  certificate: boolean
  testResults: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type ChapterOverviewData = {
  _id: string
  courseId?: string | courseIdOverviewType
  status: number
  lessons: LessonOverviewData[]
  number?: number
  title: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
  __v: 0
}

export type StreamOverviewData = {
  _id: string
  courseId?: string
  title: string
  participateNumber?: number
  createdAt: string
  updatedAt: string
  status: number
}

export type FeedbackOverviewData = {
  _id: string
  courseId?: string
  userId?: {
    _id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
  rating: number
  content: string
  status: number
  createdAt: string
  updatedAt: string
  __v: number
}

export type CourseDetailData = {
  _id: string
  title: string
  description: string
  author: {
    socialLinks: {
      facebook?: string
      twitter?: string
      linkedin?: string
      instagram?: string
      github?: string
    }
    _id: string
    email: string
    firstName: string
    lastName: string
    description?: string
  }
  topic: {
    _id: string
    title: string
    courseCategoryId: {
      _id: string
      title: string
      status: number
      discountPercent: number
      slug: string
      __v: number
    }
    status: number
    discountPercent: number
    slug: string
    __v: number
  }
  tags: string[]
  price: number
  discount: number
  status: number
  learnersDetail: learnersDetailData[]
  streams: StreamOverviewData[]
  feedbacks: FeedbackOverviewData[]
  chapters: ChapterOverviewData[]
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
  imageUrl: string
}

export type CourseDetailsResponse = {
  course: CourseDetailData
}

export type UpdateCoursePayload = {
  id: string
  reloadCourseDetail: boolean
  title: string
  description: string
  slug: string
  categoryId: string
  topicId: string
  tags: string[]
  price: number
  discount: number
  status: number
  imageUrl: string
}

export type UpdateChaptersOfCoursePayload = {
  id: string
  reloadCourseDetail: boolean
  chapters: string[]
}
