export enum CATEGORIES_ACTIONS {
  GET_CATEGORIES_REQUEST = 'categories/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = 'categories/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = 'categories/GET_CATEGORIES_FAILURE',
}

export interface CategoryOverviewData {
  _id: string
  title: string
  topic: string[]
  status: number
  discountPercent: number
  slug: string
  __v: number
}

export type CategoryManagementResponse = {
  categories: CategoryOverviewData[]
  totalCategories: number
}

export interface CategoriesResponse {
  courseCategories: CategoryDetailData[]
}

export type CategoryDetailData = {
  _id: string
  title: string
  topics: TopicDetailData[]
  status: number
  discountPercent: number
  slug: string
  __v: number
}

export type TopicDetailData = {
  _id: string
  title: string
  courseCategoryId: string
  courses: string[]
  status: number
  discountPercent: number
  slug: string
  __v: number
}
