import {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailure,
  uploadFileProgress,
} from './actions'
import { toast } from 'react-toastify'
import { storage } from '../../services/firebase'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  UploadTaskSnapshot,
} from '@firebase/storage'

export const uploadFileThunkAction =
  (file: File, callback: (responseUrl: string) => void) =>
  async (dispatch: any) => {
    dispatch(uploadFileRequest())

    if (!file) return
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        dispatch(
          uploadFileProgress({
            uploadProgress: progress,
            uploadState: snapshot.state,
          })
        )
      },
      (err: StorageError) => {
        toast.error(err.message)
        dispatch(uploadFileFailure(err.message))
      },
      async () => {
        const responseUrl = await getDownloadURL(uploadTask.snapshot.ref)
        dispatch(uploadFileSuccess({ uploadedUrl: responseUrl }))
        callback(responseUrl)
      }
    )
  }
