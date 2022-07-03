import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { formatDateFromApi } from '@utils/helpers'
import Select from '@components/common/Select'
import {
  AttachmentFormSchema,
  AttachmentInfoFormType,
  getUpdateAttachmentPayload,
  statusOptions,
} from './helpers'
import View from '@components/common/View'
import { LoaderBall } from '@components/common'
import {
  deleteAttachmentThunkAction,
  updateAttachmentDetailsThunkAction,
} from '@redux/chapters/thunks'
import { useState } from 'react'
import ConfirmModal from '@components/ConfirmModal'
import { useRouter } from 'next/router'
import { AttachmentDetailData } from '@redux/chapters/types'

// tslint:disable-next-line: cyclomatic-complexity
const AttachmentInfoForm: NextPage<Props> = ({
  onClose,
  selectedAttachment,
  courseId,
  chapterId,
  redirectUrl,
}) => {
  const dispatch = useDispatch()
  const chapterState = useSelector(
    (state: RootState) => state.chapterManagement
  )
  const router = useRouter()
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false)

  const initialValues: AttachmentInfoFormType = {
    id: selectedAttachment?._id || '',
    title: selectedAttachment?.title || '',
    description: selectedAttachment?.description || '',
    status: selectedAttachment?.status ?? 1,
    number: selectedAttachment?.number || 0,
    slug: selectedAttachment?.slug || '',
  }

  const handleSubmit = (values: any) => {
    const payload = getUpdateAttachmentPayload({
      ...values,
      courseId,
      chapterId,
    })
    dispatch(
      updateAttachmentDetailsThunkAction(payload, () => {
        onClose()
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: AttachmentFormSchema,
    onSubmit: handleSubmit,
  })

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false)
  }

  const handleDeleteLesson = () => {
    if (!selectedAttachment || !selectedAttachment?._id) return
    dispatch(
      deleteAttachmentThunkAction(
        { courseId, chapterId, attachmentId: selectedAttachment?._id },
        async () => {
          if (redirectUrl) {
            await router.push(redirectUrl)
          }

          onClose()
        }
      )
    )
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className='modal-main__body' spacing={3}>
        <Grid item md={12} className='modal-main__body--item'>
          <Grid container spacing={3}>
            <Grid item md={6} className='modal-main__body--item'>
              <TextField
                label='Title *'
                type='text'
                {...formik.getFieldProps('title')}
                error={!!formik.errors.title && !!formik.touched.title}
                helperText={
                  !!formik.errors.title && !!formik.touched.title
                    ? formik.errors.title
                    : ''
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6} className='modal-main__body--item'>
              <TextField
                label='Slug *'
                {...formik.getFieldProps('slug')}
                error={!!formik.errors.slug && !!formik.touched.slug}
                helperText={
                  !!formik.errors.slug && !!formik.touched.slug
                    ? formik.errors.slug
                    : ''
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6} className='modal-main__body--item'>
              <TextField
                label='Chapter ID'
                value={formik.values.id}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={6} className='modal-main__body--item'>
              <Select
                options={statusOptions}
                label={'Status *'}
                placeholder={'Select'}
                errorMessage={formik.touched.status ? formik.errors.status : ''}
                {...formik.getFieldProps('status')}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
              />
            </Grid>
            <Grid item xs={12} md={6} className='modal-main__body--item'>
              <TextField
                label='Created Date'
                type='text'
                value={formatDateFromApi(selectedAttachment?.createdAt) || '--'}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} className='modal-main__body--item'>
              <TextField
                label='Updated Date'
                type='text'
                value={formatDateFromApi(selectedAttachment?.updatedAt) || '--'}
                disabled
                fullWidth
              />
            </Grid>

            <Grid item md={12} className='modal-main__body--item'>
              <TextField
                label='Description'
                type='text'
                {...formik.getFieldProps('description')}
                error={
                  !!formik.errors.description && !!formik.touched.description
                }
                helperText={
                  !!formik.errors.description && !!formik.touched.description
                    ? formik.errors.description
                    : ''
                }
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        open={showConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
        loading={chapterState.attachmentLoading}
        onCancel={handleCloseConfirmDeleteModal}
        height={120}
        content={
          <p>
            {'Are you sure you want to delete the attachment '}
            <b>{`"${selectedAttachment?.title}"`}</b> {' ?'}
          </p>
        }
        onConfirm={handleDeleteLesson}
        position='justify-center'
        type='danger'
      />
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='modal-main__footer mt-20'
        style={{
          position: 'absolute',
          bottom: 20,
          width: '92%',
        }}
      >
        <View isRow>
          <Button
            variant='outlined'
            className='has-text-danger'
            style={{ marginRight: '15px' }}
            onClick={handleShowConfirmDeleteModal}
          >
            Delete
          </Button>
        </View>
        <Button variant='contained' type='submit' color='primary'>
          {chapterState.attachmentLoading && !showConfirmDeleteModal ? (
            <LoaderBall
              color1='#ffffff'
              color2='#eeeeee'
              color3='#ffffff'
              color4='#eeeeee'
              color5='#ffffff'
              height={18}
            />
          ) : (
            'Save'
          )}
        </Button>
      </Grid>
    </form>
  )
}

type Props = {
  selectedAttachment: AttachmentDetailData
  courseId?: string | null | undefined
  chapterId?: string | null | undefined
  redirectUrl?: string
  onClose: () => void
}

export default AttachmentInfoForm
