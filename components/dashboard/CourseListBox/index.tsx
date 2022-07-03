import { Avatar, Tooltip } from '@mui/material'
import { ActivityCourseOverviewData } from '@redux/report/types'
import { formatDateFromApi, getTotalPriceCourse, isEmpty } from '@utils/helpers'
import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import StatusDot from '@components/Status/StatusDot'

interface Props {
  data: ActivityCourseOverviewData[] | undefined
  avatarSize?: number
  style?: React.CSSProperties
  loading?: boolean
}

const CourseListBox = ({ data, avatarSize, style }: Props) => {
  // const router = useRouter()

  const handleUserRowClick = async (courseData: ActivityCourseOverviewData) => {
    if (!courseData?._id) return
    // await router.push(`/manage-courses/${courseData._id}`)
    window.open(`/manage-courses/${courseData._id}`, '_ blank')
  }

  return (
    <div className={styles.container} style={style}>
      {data && !isEmpty(data) ? (
        data.map(item => (
          <Tooltip
            key={item._id}
            title={
              <>
                <p>Course: {item?.title}</p>
                <p>Price: ${getTotalPriceCourse(item) || '--'}</p>
                <p>
                  Author: {item?.author?.firstName} {item?.author?.lastName}
                </p>
                <p>Email: {item?.author?.email || '--'}</p>
              </>
            }
            placement='top'
            arrow
          >
            <div
              className={cn('justify-space-between py-8', styles.item)}
              onClick={() => handleUserRowClick(item)}
            >
              <div className='justify-space-between px-8'>
                <Avatar
                  sx={{
                    width: avatarSize,
                    height: avatarSize,
                    marginRight: '12px',
                  }}
                  src={item.imageUrl}
                  alt={item._id}
                />
                <span className='text-gray-600 '>{`${item?.title}`}</span>
              </div>
              <div className='justify-space-between px-8'>
                <span className='text-gray-600 '>
                  {formatDateFromApi(item.createdAt, 'DD/MM/YY')}
                </span>
                <StatusDot statusId={item.status} />
              </div>
            </div>
          </Tooltip>
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  )
}

export default CourseListBox
