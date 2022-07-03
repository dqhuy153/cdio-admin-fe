export const API_URL = 'https://guru-academy-api.herokuapp.com/'
export const API_URL_V1 = 'https://guru-academy-api.herokuapp.com/api/v1'

export const COUNT_PER_PAGE = 20

export enum UserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
  BANNED = 10,
}

export enum CommonStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum CourseStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
  DRAFT = 20,
}

export enum AllStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2,
  BANNED = 10,
  DRAFT = 20,
}

export enum StatusColor {
  INACTIVE = '#d45333',
  ACTIVE = '#33d44b',
  PENDING = '#ffc107',
  BANNED = '#db0700',
  DRAFT = '#ffc107',
}

export const UserRole = {
  ROOT: {
    id: 0,
    name: 'root',
  },
  ADMIN: {
    id: 1,
    name: 'admin',
  },
  LEARNER: {
    id: 2,
    name: 'learner',
  },
  TEACHER: {
    id: 3,
    name: 'teacher',
  },
}

export const UploadFileType = {
  IMAGE: {
    accept: 'image/jpg, image/jpeg, image/png, image/webp',
    maxSize: 5 * 1024 * 1024, //5MB
  },
  VIDEO: {
    accept:
      'video/gif, video/mp4, video/ogg, video/wmv, video/webm, video/avi, video/mkv, video/x-flv, video/flv, video/quicktime, video/mov',
    maxSize: 500 * 1024 * 1024, //500MB
  },
  FILE: {
    accept:
      'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/zip, text/plain,application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint,application/gzip,application/vnd.rar',
    maxSize: 50 * 1024 * 1024, //500MB
  },
}
