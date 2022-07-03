import type { NextPage } from 'next'
import { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useFormik } from 'formik'
import {
  formatDateFromApi,
  getFullNameFromFirstAndLastName,
  isEmpty,
} from '@utils/helpers'
import FileUpload from '@components/common/FileUpload'
import Select from '@components/common/Select'
import {
  CourseFormSchema,
  CourseInfoFormType,
  getUpdateCoursePayload,
  statusOptions,
} from './helpers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import View from '@components/common/View'
import { CourseDetailData } from '@redux/courses/types'
import { LoaderBall } from '@components/common'
import ConfirmModal from '@components/ConfirmModal'
import { CategoryDetailData, TopicDetailData } from '@redux/categories/types'
import {
  deleteCourseThunkAction,
  updateCourseDetailsThunkAction,
} from '@redux/courses/thunks'
import { useRouter } from 'next/router'
import { uploadFileThunkAction } from '@redux/files/thunks'

// tslint:disable-next-line: cyclomatic-complexity
const CourseInfoForm: NextPage<Props> = ({ onClose, selectedCourse }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const courseState = useSelector((state: RootState) => state.coursesManagement)
  const categoriesState = useSelector(
    (state: RootState) => state.categoriesManagement
  )
  const uploadFileLoading = useSelector(
    (state: RootState) => state.files.loading
  )

  const [thumbnailFile, setThumbnailFile] = useState<File[]>()
  const [expanded, setExpanded] = useState<number>(1)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetailData>()
  const [selectedTopic, setSelectedTopic] = useState<TopicDetailData>()
  const categoriesOption = categoriesState.categories?.map(category => ({
    label: category.title,
    value: category._id,
  }))
  const topicsOption = selectedCategory?.topics.map(topic => ({
    label: topic.title,
    value: topic._id,
  }))

  const handleAccordionChange = (panel: number) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : 0)
  }

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false)
  }

  const initialValues: CourseInfoFormType = {
    id: selectedCourse?._id || '',
    title: selectedCourse?.title || '',
    description: selectedCourse?.description || '',
    imageUrl: selectedCourse?.imageUrl || '',
    status: selectedCourse?.status ?? 1,
    categoryId: selectedCourse?.topic.courseCategoryId._id || '',
    topicId: selectedCourse?.topic?._id || '',
    price: selectedCourse?.price || 0,
    discount: selectedCourse?.discount || 0,
    slug: selectedCourse?.slug || '',
    tags: selectedCourse?.tags.join(', ') || '',
  }

  const handleSubmit = (values: CourseInfoFormType) => {
    const handleDispatchSubmit = (
      formValues: CourseInfoFormType,
      imageUrl?: string
    ) => {
      const updatePayload = getUpdateCoursePayload(formValues, imageUrl)
      dispatch(
        updateCourseDetailsThunkAction(updatePayload, () => {
          onClose()
        })
      )
    }

    if (!isEmpty(thumbnailFile) && thumbnailFile) {
      dispatch(
        uploadFileThunkAction(thumbnailFile[0], (url: string) => {
          handleDispatchSubmit(values, url)
        })
      )

      return
    }

    handleDispatchSubmit(values)
  }

  const handleDeleteAccount = () => {
    if (!selectedCourse || !selectedCourse?._id) return
    dispatch(
      deleteCourseThunkAction(selectedCourse._id, async () => {
        await router.replace('/manage-courses')
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: CourseFormSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    setSelectedCategory(
      categoriesState.categories?.find(
        category => category._id === formik.values.categoryId
      )
    )
  }, [categoriesState.categories, formik.values.categoryId])

  useEffect(() => {
    setSelectedTopic(
      selectedCategory?.topics?.find(
        topic => topic._id === formik.values.topicId
      )
    )
  }, [formik.values.topicId, selectedCategory?.topics])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className='modal-main__body' spacing={3}>
        <Grid item md={12} className='modal-main__body--item'>
          <Accordion
            expanded={expanded === 1}
            onChange={handleAccordionChange(1)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header-1'
            >
              <h4>Main Information</h4>
            </AccordionSummary>
            <AccordionDetails>
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
                    label='Course ID'
                    value={formik.values.id}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Author'
                    value={getFullNameFromFirstAndLastName(
                      selectedCourse?.author?.firstName,
                      selectedCourse?.author?.lastName
                    )}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Email'
                    value={selectedCourse?.author?.email}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Author ID'
                    value={selectedCourse?.author?._id}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <Select
                    options={categoriesOption}
                    label={'Category *'}
                    placeholder={'Select'}
                    errorMessage={
                      !!formik.errors.categoryId && !!formik.touched.categoryId
                        ? formik.errors.categoryId
                        : ''
                    }
                    {...formik.getFieldProps('categoryId')}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <Select
                    options={topicsOption}
                    label={'Topic *'}
                    placeholder={'Select'}
                    errorMessage={
                      !!formik.errors.topicId && !!formik.touched.topicId
                        ? formik.errors.topicId
                        : ''
                    }
                    {...formik.getFieldProps('topicId')}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Tags *'
                    {...formik.getFieldProps('tags')}
                    error={!!formik.errors.tags && !!formik.touched.tags}
                    helperText={
                      !!formik.errors.tags && !!formik.touched.tags
                        ? formik.errors.tags
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <Select
                    options={statusOptions}
                    label={'Status *'}
                    placeholder={'Select'}
                    errorMessage={
                      formik.touched.status ? formik.errors.status : ''
                    }
                    {...formik.getFieldProps('status')}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <p className='label-text mb-16'>Change Thumbnail</p>
                  <FileUpload
                    type='image'
                    onChange={(value: any) => setThumbnailFile(value)}
                    numberAllow={1}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  className='modal-main__body--item'
                  style={{ overflow: 'hidden' }}
                >
                  <p className='label-text'>Thumbnail</p>
                  <img
                    src={formik.values.imageUrl}
                    alt='Invalid or empty thumbnail'
                    className='img-contain'
                  />
                </Grid>
                <Fragment>
                  <Grid item xs={6} md={3} className='modal-main__body--item'>
                    <TextField
                      label='Created Date'
                      type='text'
                      value={
                        formatDateFromApi(selectedCourse?.createdAt) || '--'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} md={3} className='modal-main__body--item'>
                    <TextField
                      label='Updated Date'
                      type='text'
                      value={
                        formatDateFromApi(selectedCourse?.updatedAt) || '--'
                      }
                      disabled
                    />
                  </Grid>
                </Fragment>
                <Grid item md={12} className='modal-main__body--item'>
                  <TextField
                    label='Description'
                    type='text'
                    {...formik.getFieldProps('description')}
                    error={
                      !!formik.errors.description &&
                      !!formik.touched.description
                    }
                    helperText={
                      !!formik.errors.description &&
                      !!formik.touched.description
                        ? formik.errors.description
                        : ''
                    }
                    fullWidth
                    multiline
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={12} className='modal-main__body--item'>
          <Accordion
            expanded={expanded === 2}
            onChange={handleAccordionChange(2)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header-1'
            >
              <h4>Pricing</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Price'
                    type='number'
                    {...formik.getFieldProps('price')}
                    error={!!formik.errors.price && !!formik.touched.price}
                    helperText={
                      !!formik.errors.price && !!formik.touched.price
                        ? formik.errors.price
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Discount'
                    type='number'
                    {...formik.getFieldProps('discount')}
                    error={
                      !!formik.errors.discount && !!formik.touched.discount
                    }
                    helperText={
                      !!formik.errors.discount && !!formik.touched.discount
                        ? formik.errors.discount
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Category Discount'
                    value={`${selectedCategory?.discountPercent || 0} %`}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={6} className='modal-main__body--item'>
                  <TextField
                    label='Topic Discount'
                    value={`${selectedTopic?.discountPercent || 0} %`}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item md={12} className='modal-main__body--item'>
                  <TextField
                    label='Total'
                    value={(
                      (formik.values.price - formik.values.discount) *
                      (1 - (selectedCategory?.discountPercent || 0) / 100) *
                      (1 - (selectedTopic?.discountPercent || 0) / 100)
                    ).toFixed(2)}
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <ConfirmModal
        open={showConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
        loading={courseState.loading}
        onCancel={handleCloseConfirmDeleteModal}
        height={150}
        content={
          <p>
            {'Are you sure you want to delete the course '}
            <b>{`"${selectedCourse?.title}"`}</b> {' ?'}
          </p>
        }
        onConfirm={handleDeleteAccount}
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
          {(courseState.updateLoading || uploadFileLoading) &&
          !showConfirmDeleteModal ? (
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
  selectedCourse: CourseDetailData | null
  onClose: () => void
}

export default CourseInfoForm
