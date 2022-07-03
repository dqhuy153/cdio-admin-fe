import { NotificationsData } from '@redux/types'

export enum AUTH_ACTIONS {
  LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = 'auth/LOGIN_FAILURE',
  LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS',
  LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE',
  GET_USER_DATA_REQUEST = 'auth/GET_USER_DATA_REQUEST',
  GET_USER_DATA_SUCCESS = 'auth/GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAILURE = 'auth/GET_USER_DATA_FAILURE',
}

export type LoginData = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  userId: string
}

export type AllDataUserResponse = {
  user: {
    _id: string
    address: {
      street: string
      city: string
      country: string
    }
    role: {
      id: number
      name: string
    }
    email: string
    firstName: string
    lastName: string
    dateOfBirth: string | Date
    status: number
    notifications: NotificationsData[]
    createdAt: string | Date
    updatedAt: string | Date
  }
}
