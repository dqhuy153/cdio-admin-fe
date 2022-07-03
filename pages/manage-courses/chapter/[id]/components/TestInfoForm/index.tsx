// tslint:disable ter-computed-property-spacing
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import { formatDateFromApi } from '@utils/helpers'
import Select from '@components/common/Select'
import {
  getUpdateTestPayload,
  statusOptions,
  TestFormSchema,
  TestInfoFormType,
} from './helpers'
import View from '@components/common/View'
import { LoaderBall } from '@components/common'
import {
  deleteTestThunkAction,
  updateTestDetailsThunkAction,
} from '@redux/chapters/thunks'
import { Fragment, useState } from 'react'
import ConfirmModal from '@components/ConfirmModal'
import { useRouter } from 'next/router'
import { TestDetailData, TestQuestionData } from '@redux/chapters/types'

const answerOptions = [
  {
    label: 'A',
    value: 'a',
  },
  {
    label: 'B',
    value: 'b',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'D',
    value: 'd',
  },
  {
    label: 'E',
    value: 'e',
  },
]

// tslint:disable-next-line: cyclomatic-complexity
const TestInfoForm: NextPage<Props> = ({
  selectedTest,
  chapterId,
  courseId,
  redirectUrl,
  onClose,
}) => {
  const dispatch = useDispatch()
  const chapterState = useSelector(
    (state: RootState) => state.chapterManagement
  )
  const router = useRouter()
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false)

  const initialValues: TestInfoFormType = {
    id: selectedTest?._id || '',
    title: selectedTest?.title || '',
    description: selectedTest?.description || '',
    status: selectedTest?.status ?? 1,
    slug: selectedTest?.slug || '',
    questions: selectedTest?.questions || [],
  }

  const handleSubmit = (values: any) => {
    const payload = getUpdateTestPayload({ ...values, chapterId, courseId })
    dispatch(
      updateTestDetailsThunkAction(payload, () => {
        onClose()
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: TestFormSchema,
    onSubmit: handleSubmit,
  })

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false)
  }

  const handleDeleteTest = () => {
    if (!selectedTest || !selectedTest?._id) return
    dispatch(
      deleteTestThunkAction(
        { courseId, chapterId, testId: selectedTest._id },
        async () => {
          if (redirectUrl) {
            await router.push(redirectUrl)
          }
          onClose()
        }
      )
    )
  }

  const handleDeleteTestQuestion = (index: number) => {
    formik.setFieldValue(
      'questions',
      formik.values.questions.filter((_, i) => i !== index)
    )
  }

  const handleAddTestQuestion = (params: {
    index: number
    isInsertBefore?: boolean
  }) => {
    if (params.index < 0) return
    const newQuestions = formik.values.questions.slice()
    if (params.isInsertBefore) {
      newQuestions.splice(params.index, 0, {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        answer: '',
      })
    } else {
      newQuestions.splice(params.index + 1, 0, {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        answer: '',
      })
    }
    formik.setFieldValue('questions', newQuestions)
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
                label='Test ID'
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
                value={formatDateFromApi(selectedTest?.createdAt) || '--'}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} className='modal-main__body--item'>
              <TextField
                label='Updated Date'
                type='text'
                value={formatDateFromApi(selectedTest?.updatedAt) || '--'}
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
            <Grid item md={12} className='modal-main__body--item'>
              <h5>Questions</h5>
            </Grid>
            {formik.values.questions.map((_, index) => {
              // tslint:disable-next-line: cyclomatic-complexity
              const questionTouch = formik.touched.questions?.[
                index
              ] as FormikTouched<TestQuestionData>
              const questionErrors = formik.errors.questions?.[
                index
              ] as FormikErrors<TestQuestionData>

              return (
                <Fragment key={`question-${index}`}>
                  <Grid item md={10} className='modal-main__body--item'>
                    <TextField
                      label={`Question ${index + 1}`}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].question`)}
                      error={
                        !!questionErrors?.question && !!questionTouch?.question
                      }
                      helperText={
                        !!questionErrors?.question && !!questionTouch?.question
                          ? questionErrors?.question
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={2} className='modal-main__body--item'>
                    <Button
                      variant='outlined'
                      className='has-text-danger'
                      style={{ marginRight: '15px' }}
                      onClick={() => handleDeleteTestQuestion(index)}
                    >
                      {`Delete Q${index + 1}`}
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label={'A'}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].a`)}
                      error={!!questionErrors?.a && !!questionTouch?.a}
                      helperText={
                        !!questionErrors?.a && !!questionTouch?.a
                          ? questionErrors?.a
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label={'B'}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].b`)}
                      error={!!questionErrors?.b && !!questionTouch?.b}
                      helperText={
                        !!questionErrors?.b && !!questionTouch?.b
                          ? questionErrors?.b
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label={'C'}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].c`)}
                      error={!!questionErrors?.c && !!questionTouch?.c}
                      helperText={
                        !!questionErrors?.c && !!questionTouch?.c
                          ? questionErrors?.c
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label={'D'}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].d`)}
                      error={!!questionErrors?.d && !!questionTouch?.d}
                      helperText={
                        !!questionErrors?.d && !!questionTouch?.d
                          ? questionErrors?.d
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      label={'E'}
                      type='text'
                      {...formik.getFieldProps(`questions[${index}].e`)}
                      error={!!questionErrors?.e && !!questionTouch?.e}
                      helperText={
                        !!questionErrors?.e && !!questionTouch?.e
                          ? questionErrors?.e
                          : ''
                      }
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Select
                      options={answerOptions}
                      label={'Answer *'}
                      placeholder={'Select'}
                      errorMessage={
                        questionTouch?.answer ? questionErrors?.answer : ''
                      }
                      {...formik.getFieldProps(`questions[${index}].answer`)}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Button
                      variant='outlined'
                      className='has-text-primary'
                      style={{ marginRight: '15px' }}
                      onClick={() => handleAddTestQuestion({ index })}
                    >
                      {`Add question after Q${index + 1}`}
                    </Button>
                    {index === 0 && (
                      <Button
                        variant='outlined'
                        className='has-text-primary'
                        style={{ marginRight: '15px' }}
                        onClick={() =>
                          handleAddTestQuestion({ index, isInsertBefore: true })
                        }
                      >
                        {`Add question before Q${index + 1}`}
                      </Button>
                    )}
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        open={showConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
        loading={chapterState.testLoading}
        onCancel={handleCloseConfirmDeleteModal}
        height={120}
        content={
          <p>
            {'Are you sure you want to delete the test '}
            <b>{`"${selectedTest?.title}"`}</b> {' ?'}
          </p>
        }
        onConfirm={handleDeleteTest}
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
          {chapterState.testLoading && !showConfirmDeleteModal ? (
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
  selectedTest: TestDetailData
  chapterId?: string | null | undefined
  courseId?: string | null | undefined
  redirectUrl?: string
  onClose: () => void
}

export default TestInfoForm
