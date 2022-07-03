/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, CSSProperties, Fragment } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import cn from 'classnames'
import { UploadFileType } from '@config/constant'
import { toast } from 'react-toastify'
import { Grid } from '@material-ui/core'
import { AiFillPlusCircle } from 'react-icons/ai'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const thumbsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  minWidth: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative',
}

const thumbInner: CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img: CSSProperties = {
  objectFit: 'contain',
  display: 'block',
  width: 'auto',
  height: '100%',
}

const removeBtn: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 10,
  background: '#fff',
  borderRadius: '50%',
  cursor: 'pointer',
}

const FileUpload: React.FC<Props> = ({
  type = 'file',
  className,
  onChange,
  innerRef,
  numberAllow = null,
}) => {
  const [myFiles, setMyFiles] = useState<File[]>([])
  const [rejectFiles, setRejectFiles] = useState<FileRejection[]>([])
  const [filePreviews, setFilePreviews] = useState<any[]>([])

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (!!numberAllow && acceptedFiles.length > numberAllow) {
      toast.error(`Can not upload more than ${numberAllow} files`)

      return
    }

    setMyFiles(acceptedFiles)
    setRejectFiles(fileRejections)
    setFilePreviews(
      acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
      }))
    )
  }

  let fileUploadConfig

  if (type === 'file') {
    fileUploadConfig = UploadFileType.FILE
  }

  if (type === 'image') {
    fileUploadConfig = UploadFileType.IMAGE
  }

  if (type === 'video') {
    fileUploadConfig = UploadFileType.VIDEO
  }

  const handleRemovePreviewFile = (index: number) => {
    const newFilePreviews = [...filePreviews]
    newFilePreviews.splice(index, 1)

    setFilePreviews(newFilePreviews)

    const newMyFiles = [...myFiles]
    newMyFiles.splice(index, 1)

    setMyFiles(newMyFiles)
  }

  // List MIME can be found here:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileUploadConfig.accept,
    maxSize: fileUploadConfig.maxSize,
  })

  const thumbs = filePreviews.map((file, idx) => (
    <div style={thumb} key={idx}>
      <div style={thumbInner}>
        {type === 'image' && (
          <img src={file.preview} alt='previews' style={img} />
        )}
        <IoMdCloseCircleOutline
          size={20}
          style={removeBtn}
          onClick={() => handleRemovePreviewFile(idx)}
        />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      filePreviews?.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [filePreviews]
  )

  useEffect(() => {
    if (rejectFiles.length <= 0) return

    rejectFiles.forEach((file: any) => {
      const error = file.errors[0]
      toast.error(error.message)
    })
  }, [rejectFiles])

  useEffect(() => {
    if (myFiles.length <= 0) return

    onChange(myFiles)
  }, [myFiles])

  // For more info about react dropzone follow:
  // https://react-dropzone.js.org/
  return (
    <Grid className={cn(className, 'cmp-file-upload')}>
      <Grid {...getRootProps({ className: 'cmp-file-upload__body' })}>
        {innerRef ? (
          <input {...getInputProps()} ref={innerRef} />
        ) : (
          <input {...getInputProps()} />
        )}
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid xs={12} md={2} item>
            <AiFillPlusCircle className='mt-8' size={30} />
          </Grid>
          <Grid item xs={12} md={10}>
            <p className='text-is-12'>
              {'CLICK HERE TO UPLOAD FILE(S) OR DRAG & DROP HERE'}
            </p>
          </Grid>
        </Grid>
      </Grid>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Grid>
  )
}

type Props = {
  type: 'image' | 'video' | 'file'
  className?: string
  innerRef?: any
  numberAllow?: number
  onChange: (...args: any[]) => void
}

export default FileUpload
