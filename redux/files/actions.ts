import { UploadFile } from './types'

export const uploadFileRequest = () => {
  return {
    type: UploadFile.UPLOAD_REQUEST,
  }
}
export const uploadFileProgress = (payload: {
  uploadProgress: number
  uploadState: string
}) => {
  return {
    payload,
    type: UploadFile.UPLOAD_PROGRESS,
  }
}
export const uploadFileSuccess = (payload: { uploadedUrl: string }) => {
  return {
    payload,
    type: UploadFile.UPLOAD_SUCCESS,
  }
}
export const uploadFileFailure = (error: string) => {
  return {
    error,
    type: UploadFile.UPLOAD_FAILURE,
  }
}
