export enum ACCOUNT_ACTIONS {
  GET_ACCOUNTS_MANAGEMENT_REQUEST = 'account-management/GET_ACCOUNTS_MANAGEMENT_REQUEST',
  GET_ACCOUNTS_MANAGEMENT_SUCCESS = 'account-management/GET_ACCOUNTS_MANAGEMENT_SUCCESS',
  GET_ACCOUNTS_MANAGEMENT_FAILURE = 'account-management/GET_ACCOUNTS_MANAGEMENT_FAILURE',
  UPDATE_ACCOUNT_REQUEST = 'account-management/UPDATE_ACCOUNT_REQUEST',
  UPDATE_ACCOUNT_SUCCESS = 'account-management/UPDATE_ACCOUNT_SUCCESS',
  UPDATE_ACCOUNT_FAILURE = 'account-management/UPDATE_ACCOUNT_FAILURE',
  DELETE_ACCOUNT_REQUEST = 'account-management/DELETE_ACCOUNT_REQUEST',
  DELETE_ACCOUNT_SUCCESS = 'account-management/DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_FAILURE = 'account-management/DELETE_ACCOUNT_FAILURE',
  CREATE_ACCOUNT_REQUEST = 'account-management/CREATE_ACCOUNT_REQUEST',
  CREATE_ACCOUNT_SUCCESS = 'account-management/CREATE_ACCOUNT_SUCCESS',
  CREATE_ACCOUNT_FAILURE = 'account-management/CREATE_ACCOUNT_FAILURE',
  CHANGE_PASSWORD_ACCOUNT_REQUEST = 'account-management/CHANGE_PASSWORD_ACCOUNT_REQUEST',
  CHANGE_PASSWORD_ACCOUNT_SUCCESS = 'account-management/CHANGE_PASSWORD_ACCOUNT_SUCCESS',
  CHANGE_PASSWORD_ACCOUNT_FAILURE = 'account-management/CHANGE_PASSWORD_ACCOUNT_FAILURE',
}

export interface AccountDetails {
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    github?: string
  }
  address: {
    street?: string
    city?: string
    country?: string
  }
  role: {
    id: number
    name: 'teacher' | 'learner' | 'admin' | 'root'
  }
  _id: string
  email?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  description?: string
  status?: number
  createdAt?: string
  updatedAt?: string
  learningCourses?: string[]
  teachingCourses?: string[]
  totalLearningCourses?: number
  totalTeachingCourses?: number
}

export type AccountManagementResponse = {
  users: AccountDetails[]
  totalUsers: number
}

export type AccountDetailsResponse = {
  user: AccountDetails
}

export type UpdateAccountPayload = {
  userId: string
  // email: 'abc@gmail.com'
  firstName: string
  lastName: string
  dateOfBirth: string | Date
  description: string
  status: number
  phoneNumber: string
  role: number
  socialLinks: {
    facebook: string
    instagram: string
    linkedIn: string
    github: string
    twitter: string
  }
  address: {
    street: string
    city: string
    country: string
  }
  imageUrl: string
}

export type CreateAccountPayload = {
  //  userId: string
  email: string
  newPassword: string
  firstName: string
  lastName: string
  dateOfBirth: string | Date
  description: string
  status: number
  phoneNumber: string
  role: number
  socialLinks: {
    facebook: string
    instagram: string
    linkedIn: string
    github: string
    twitter: string
  }
  address: {
    street: string
    city: string
    country: string
  }
  imageUrl: string
}
