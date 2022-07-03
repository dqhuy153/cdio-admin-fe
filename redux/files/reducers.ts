import { FilesState } from '../types'
import { UploadFile } from './types'

const initialState: FilesState = {
  loading: false,
  uploadedUrl: '',
  uploadProgress: 0,
  error: '',
  uploadState: '',
}

export const filesReducers = (
  state = initialState,
  action: any
): FilesState => {
  switch (action.type) {
    case UploadFile.UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        uploadedUrl: '',
        uploadProgress: 0,
        uploadState: 'running',
        error: '',
      }
    case UploadFile.UPLOAD_PROGRESS:
      return {
        ...state,
        loading: true,
        uploadProgress: action.payload.uploadProgress,
        uploadState: action.payload.uploadState,
      }
    case UploadFile.UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadedUrl: action.payload.uploadedUrl,
        uploadState: 'success',
        error: '',
      }
    case UploadFile.UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        uploadState: 'error',
        error: action.error,
      }
    default:
      return state
  }
}
