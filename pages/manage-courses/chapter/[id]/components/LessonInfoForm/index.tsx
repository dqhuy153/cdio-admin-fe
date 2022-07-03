import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { formatDateFromApi } from '@utils/helpers'
import Select from '@components/common/Select'
import {
  getUpdateLessonPayload,
  LessonInfoFormSchema,
  LessonInfoFormType,
  statusOptions,
} from './helpers'
import View from '@components/common/View'
import { LoaderBall } from '@components/common'
import {
  deleteLessonThunkAction,
  updateLessonDetailsThunkAction,
} from '@redux/chapters/thunks'
import {
  AttachmentDetailData,
  LessonOverviewData,
  TestDetailData,
} from '@redux/chapters/types'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { useState } from 'react'
import StatusDot from '@components/Status/StatusDot'
import ConfirmModal from '@components/ConfirmModal'

// tslint:disable-next-line: cyclomatic-complexity
const LessonInfoForm: NextPage<Props> = ({
  onClose,
  selectedLesson,
  courseId,
  chapterId,
}) => {
  const dispatch = useDispatch()
  const chapterState = useSelector(
    (state: RootState) => state.chapterManagement
  )
  const [tests, setTests] = useState<TestDetailData[]>(
    selectedLesson?.tests || []
  )
  const [attachments, setAttachments] = useState<AttachmentDetailData[]>(
    selectedLesson?.attachments || []
  )
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false)

  const initialValues: LessonInfoFormType = {
    id: selectedLesson?._id || '',
    title: selectedLesson?.title || '',
    description: selectedLesson?.description || '',
    status: selectedLesson?.status ?? 1,
    slug: selectedLesson?.slug || '',
  }

  const handleSubmit = (values: LessonInfoFormType) => {
    const payload = getUpdateLessonPayload({
      ...values,
      courseId,
      chapterId,
      tests: tests?.map(test => test?._id) || [],
      attachments: attachments?.map(attachment => attachment?._id) || [],
    })
    dispatch(
      updateLessonDetailsThunkAction(payload, () => {
        onClose()
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LessonInfoFormSchema,
    onSubmit: handleSubmit,
  })

  const handleTestMoveUp = (index: number) => {
    if (index === 0) {
      return
    }

    const newTests = [...tests]
    const temp = newTests[index - 1]
    newTests[index - 1] = newTests[index]
    newTests[index] = temp

    setTests(newTests)
  }

  const handleTestMoveDown = (index: number) => {
    if (index === tests.length - 1) {
      return
    }

    const newTests = [...tests]
    const temp = newTests[index + 1]
    newTests[index + 1] = newTests[index]
    newTests[index] = temp

    setTests(newTests)
  }

  const handleOpenEditTestModal = (selectedTest: TestDetailData) => {
    return
  }

  const handleAttachmentMoveUp = (index: number) => {
    if (index === 0) {
      return
    }

    const newAttachments = [...attachments]
    const temp = newAttachments[index - 1]
    newAttachments[index - 1] = newAttachments[index]
    newAttachments[index] = temp

    setAttachments(newAttachments)
  }

  const handleAttachmentMoveDown = (index: number) => {
    if (index === attachments.length - 1) {
      return
    }

    const newAttachments = [...attachments]
    const temp = newAttachments[index + 1]
    newAttachments[index + 1] = newAttachments[index]
    newAttachments[index] = temp

    setAttachments(newAttachments)
  }

  const handleOpenEditAttachmentModal = (
    selectedAttachment: AttachmentDetailData
  ) => {
    return
  }

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false)
  }

  const handleDeleteLesson = () => {
    if (!selectedLesson || !selectedLesson?._id) return
    dispatch(
      deleteLessonThunkAction(
        { chapterId, courseId, lessonId: selectedLesson._id },
        () => {
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
                label='Lesson ID'
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
            <Grid item xs={12} md={6} className='modal-main__body--item'>
              <TextField
                label='Created Date'
                type='text'
                value={formatDateFromApi(selectedLesson?.createdAt) || '--'}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} className='modal-main__body--item'>
              <TextField
                label='Updated Date'
                type='text'
                value={formatDateFromApi(selectedLesson?.updatedAt) || '--'}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item md={12} className='modal-main__body--item'>
              <Grid
                item
                md={12}
                className='modal-main__body--item'
                style={{ marginBottom: '8px' }}
              >
                <h5>Tests:</h5>
              </Grid>
              <Grid
                item
                md={12}
                className='modal-main__body--item'
                style={{
                  border: '1px dashed #ccc',
                  padding: '8px',
                  margin: '0 3px',
                }}
              >
                {tests.length > 0 ? (
                  tests.map((test, index) => (
                    <Grid
                      container
                      key={test._id}
                      direction='row'
                      alignItems='center'
                      style={{
                        borderBottom: '1px solid #ccc',
                        padding: '8px',
                      }}
                    >
                      <Grid item xs={8}>
                        <StatusDot statusId={test?.status} />
                        <button className='my-8 button-text-no-color'>{`${
                          index + 1
                        }. ${test.title}`}</button>
                      </Grid>
                      <Grid item xs={1}>
                        {index !== 0 ? (
                          <AiOutlineArrowUp
                            size={16}
                            className='page-chapter-detail__lesson-preview--sidebar__icon'
                            onClick={() => handleTestMoveUp(index)}
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs={1}>
                        {index !== tests.length - 1 ? (
                          <AiOutlineArrowDown
                            size={16}
                            className='page-chapter-detail__lesson-preview--sidebar__icon'
                            onClick={() => handleTestMoveDown(index)}
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs={1}>
                        <BiTrash
                          size={20}
                          className='page-chapter-detail__lesson-preview--sidebar__icon'
                          onClick={() => handleOpenEditTestModal(test)}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <BiEdit
                          size={20}
                          className='page-chapter-detail__lesson-preview--sidebar__icon'
                          onClick={() => handleOpenEditTestModal(test)}
                        />
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <p>No data</p>
                )}
              </Grid>
            </Grid>
            <Grid item md={12} className='modal-main__body--item'>
              <Grid
                item
                md={12}
                className='modal-main__body--item'
                style={{ marginBottom: '8px' }}
              >
                <h5>Attachments:</h5>
              </Grid>
              <Grid
                item
                md={12}
                className='modal-main__body--item'
                style={{
                  border: '1px dashed #ccc',
                  padding: '8px',
                  margin: '0 3px',
                }}
              >
                {attachments.length > 0 ? (
                  attachments.map((attachment, index) => (
                    <Grid
                      container
                      key={attachment._id}
                      direction='row'
                      alignItems='center'
                      style={{
                        borderBottom: '1px solid #ccc',
                        padding: '8px',
                      }}
                    >
                      <Grid item xs={8}>
                        <StatusDot statusId={attachment?.status} />
                        <button className='my-8 button-text-no-color'>{`${
                          index + 1
                        }. ${attachment.title}`}</button>
                      </Grid>
                      <Grid item xs={1}>
                        {index !== 0 ? (
                          <AiOutlineArrowUp
                            size={16}
                            className='page-chapter-detail__lesson-preview--sidebar__icon'
                            onClick={() => handleAttachmentMoveUp(index)}
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs={1}>
                        {index !== attachments.length - 1 ? (
                          <AiOutlineArrowDown
                            size={16}
                            className='page-chapter-detail__lesson-preview--sidebar__icon'
                            onClick={() => handleAttachmentMoveDown(index)}
                          />
                        ) : null}
                      </Grid>
                      <Grid item xs={1}>
                        <BiTrash
                          size={20}
                          className='page-chapter-detail__lesson-preview--sidebar__icon'
                          onClick={() =>
                            handleOpenEditAttachmentModal(attachment)
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <BiEdit
                          size={20}
                          className='page-chapter-detail__lesson-preview--sidebar__icon'
                          onClick={() =>
                            handleOpenEditAttachmentModal(attachment)
                          }
                        />
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <p>No data</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        open={showConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
        loading={chapterState.lessonLoading}
        onCancel={handleCloseConfirmDeleteModal}
        height={120}
        content={
          <p>
            {'Are you sure you want to delete the course '}
            <b>{`"${selectedLesson?.title}"`}</b> {' ?'}
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
          {chapterState.lessonLoading && !showConfirmDeleteModal ? (
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
  selectedLesson: LessonOverviewData | null
  courseId?: string | null | undefined
  chapterId?: string | null | undefined
  onClose: () => void
}

export default LessonInfoForm
