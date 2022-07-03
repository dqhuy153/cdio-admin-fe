import ViewItem from '@components/common/ViewItem'
import { Grid } from '@material-ui/core'
import { CourseDetailData } from '@redux/courses/types'
import { getCourseStatusText } from '@utils/helpers'
import React from 'react'

interface Props {
  selectedCourse: CourseDetailData | null
}

const CourseInfo = ({ selectedCourse }: Props) => {
  const coursePrice = selectedCourse?.price || 0
  const courseDiscount = selectedCourse?.discount || 0
  const categoryDiscountPercent =
    selectedCourse?.topic?.courseCategoryId?.discountPercent || 0
  const topicDiscountPercent = selectedCourse?.topic?.discountPercent || 0
  const totalPrice =
    (coursePrice - courseDiscount) *
    (1 - categoryDiscountPercent / 100) *
    (1 - topicDiscountPercent / 100)

  if (!selectedCourse) {
    return (
      <Grid item xs={12} className='page-course-detail__course-info--content'>
        <p>No data</p>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} className='page-course-detail__course-info--content'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Title'
              value={selectedCourse?.title}
              boldValue
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Author Email'
              value={selectedCourse?.author?.email}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Author Name'
              value={`${selectedCourse?.author?.firstName} ${selectedCourse?.author?.lastName}`}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Status'
              value={getCourseStatusText(selectedCourse?.status)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='ID'
              value={selectedCourse?._id}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Slug'
              value={selectedCourse?.slug}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Category'
              value={selectedCourse?.topic?.courseCategoryId?.title}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Topic'
              value={selectedCourse?.topic?.title}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Tags'
              value={selectedCourse?.tags?.join(', ')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Total Price'
              value={`$${totalPrice}`}
              boldValue
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Price'
              value={`$${coursePrice}`}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Course Discount'
              value={`$${courseDiscount}`}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Category Discount'
              value={`${categoryDiscountPercent}%`}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Topic Discount'
              value={`${topicDiscountPercent}%`}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className='modal-main__body--item'
            style={{ overflow: 'hidden' }}
          >
            <p className='label-text'>Thumbnail</p>
            <img
              src={selectedCourse?.imageUrl}
              alt='Invalid or empty thumbnail'
              className='img-contain'
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Descriptions'
              value={selectedCourse?.description}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CourseInfo
