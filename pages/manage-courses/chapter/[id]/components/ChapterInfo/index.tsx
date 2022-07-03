import React from 'react'
import cn from 'classnames'
import ViewItem from '@components/common/ViewItem'
import { Button, Grid } from '@material-ui/core'
import { formatDateFromApi, getCourseStatusText } from '@utils/helpers'
import { Callback } from '@utils/types'
import { ChapterOverviewData } from '@redux/courses/types'

interface Props {
  chapterData: ChapterOverviewData | null
  chapterNumber: number | string | null
  className?: string
  onEdit?: Callback
}

const ChapterInfo = ({
  chapterData,
  chapterNumber,
  className,
  onEdit,
}: Props) => {
  if (!chapterData) {
    return (
      <Grid
        item
        xs={12}
        className={cn('page-course-detail__course-info--content', className)}
      >
        <p>No data</p>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className={cn(className, 'page-course-detail__course-info--content')}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={11}>
                <h4 className='page-course-detail__title'>Information</h4>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  variant='outlined'
                  className='has-text-primary'
                  onClick={onEdit}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label={`Chapter ${chapterNumber || chapterData?.number || '--'}`}
              value={chapterData?.title}
              boldValue
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='ID'
              value={chapterData?._id}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Slug'
              value={chapterData?.slug}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Created Date'
              value={formatDateFromApi(chapterData?.createdAt)}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Status'
              value={getCourseStatusText(chapterData?.status)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ViewItem
              className='page-course-detail__course-info--item'
              label='Description'
              value={chapterData?.description}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChapterInfo
