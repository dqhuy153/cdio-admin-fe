import { Avatar, Skeleton, Tooltip } from '@mui/material'
import { ActivityCourseDetailOverviewData } from '@redux/report/types'
import { formatDateFromApi, isEmpty } from '@utils/helpers'
import React, { useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import StatusDot from '@components/Status/StatusDot'
import AccountForm from '@pages/manage-accounts/AccountDetailForm'
import ModalMain from '@components/common/Modal'
import { Callback } from '@utils/types'

interface Props {
  data: ActivityCourseDetailOverviewData[] | undefined
  avatarSize?: number
  style?: React.CSSProperties
  loading?: boolean
  readonly?: boolean
  callbackAfterAction?: Callback
}

const RegisteredUserListBox = ({
  data,
  avatarSize,
  style,
  loading,
  readonly = false,
  callbackAfterAction,
}: Props) => {
  const [selectedUserData, setSelectedUserData] =
    useState<ActivityCourseDetailOverviewData>()
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false)

  const handleUserRowClick = (userData: ActivityCourseDetailOverviewData) => {
    if (readonly) return
    setSelectedUserData(userData)
    setShowUserDetail(true)
  }

  return (
    <div className={styles.container} style={style}>
      <ModalMain
        open={showUserDetail}
        onClose={() => setShowUserDetail(false)}
        width={600}
        height={500}
        position='flex-start-center'
        preventBackdropClick
        label={'Account Detail'}
      >
        <div className='modal-main'>
          <AccountForm
            accountData={selectedUserData}
            onClose={() => setShowUserDetail(false)}
            callbackAfterAction={callbackAfterAction}
          />
        </div>
      </ModalMain>

      {loading ? (
        Array.from(Array(5)).map((_, idx) => (
          <div className='justify-space-between my-8' key={idx}>
            <div className='wp-10'>
              <Skeleton
                variant='circular'
                width={avatarSize}
                animation='wave'
                height={avatarSize}
              />
            </div>
            <div className='wp-55 ml-8 mr-40'>
              <Skeleton width='100%' height={20} animation='wave' />
            </div>
            <div className='wp-30 ml-8'>
              <Skeleton width='100%' height={20} animation='wave' />
            </div>
          </div>
        ))
      ) : data && !isEmpty(data) ? (
        data.map(item => (
          <Tooltip
            key={item?._id}
            title={
              <>
                <p>
                  Name: {item?.userId?.firstName} {item?.userId?.lastName}
                </p>
                <p>ID: {item?._id}</p>
                <p>
                  Course: {item?.courseId?.title || '--'} -{' '}
                  {formatDateFromApi(item?.createdAt, 'DD/MM/YY')}
                </p>
              </>
            }
            placement='top'
            arrow
          >
            <div
              className={cn('justify-space-between py-8', styles.item)}
              style={{ cursor: readonly ? 'default' : 'pointer' }}
              onClick={() => handleUserRowClick(item)}
            >
              <div className='justify-space-between px-8'>
                <Avatar
                  sx={{
                    width: avatarSize,
                    height: avatarSize,
                    marginRight: '12px',
                  }}
                  src={item?.userId?.imageUrl}
                  alt={item?._id}
                />
                <span className='text-gray-600 '>{`${
                  item?.userId?.email ?? '(deleted user)'
                }`}</span>
              </div>
              <div className='justify-space-between px-8'>
                <span className='text-gray-600'>${item?.payment?.price}</span>
                <StatusDot statusId={item?.status} />
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

export default RegisteredUserListBox
