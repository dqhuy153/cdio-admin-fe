import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import {
  Card,
  ClickAwayListener,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { IoMdSearch } from 'react-icons/io'

import AvatarImg from '@public/images/icon.png'
import { Avatar } from '@components/common'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/rootReducer'
import { getFullName } from '@utils/auth'
import { Box } from '@mui/system'
import NotificationBox from '@components/NotificationBox'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import ProfileBox from '@components/ProfileBox'

// import Avatar from '@mui/material/Avatar'

const PageWithHeader: React.FC<Props> = ({
  children,
  title = 'Dashboard',
  pagePosition = 'on-top-page',
  showSearchBar = false,
  backgroundColor = '#ffffff',
  ...props
}) => {
  const [search, setSearch] = useState<string>('')
  const [hasNotificationAlert, setHasNotificationAlert] =
    useState<boolean>(false)
  const [showNotificationModal, setShowNotificationModal] =
    useState<boolean>(false)
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)

  const fullName = getFullName() || `${userInfo.firstName} ${userInfo.lastName}`

  const notifications = userInfo.notifications
  const hasUnreadNotification = notifications.some(
    notification => !notification.isSeen
  )

  useEffect(() => {
    hasUnreadNotification
      ? setHasNotificationAlert(true)
      : setHasNotificationAlert(false)
  }, [hasUnreadNotification])

  const handleNotificationClick = () => {
    if (hasNotificationAlert) setHasNotificationAlert(false)
    setShowNotificationModal(prev => !prev)
  }

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false)
  }

  const handleToggleProfileModal = () => {
    setShowProfileModal(prev => !prev)
  }

  const handleCloseProfileModal = () => {
    setShowProfileModal(false)
  }

  return (
    <Grid container className={pagePosition}>
      <Grid
        className='section__card'
        item
        md={11}
        sm={10}
        xs={11}
        style={{
          background: backgroundColor,
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          marginBottom={2}
        >
          <Grid item md={7}>
            <Grid container alignItems='center'>
              <Grid item md={showSearchBar ? 3 : 8} ml='10px'>
                <h3>{title}</h3>
              </Grid>
              {showSearchBar && (
                <Grid item md={8}>
                  <div className='input-card page__header--search'>
                    <TextField
                      id='input-with-icon-textfield'
                      placeholder='Search'
                      style={{ width: '100%' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <IoMdSearch />
                          </InputAdornment>
                        ),
                      }}
                      variant='standard'
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container alignItems='center' justifyContent='flex-end'>
              <Grid
                item
                md={3}
                display='flex'
                justifyContent='flex-end'
                position='relative'
              >
                <ClickAwayListener onClickAway={handleCloseNotificationModal}>
                  <Box>
                    <div
                      className={
                        hasNotificationAlert
                          ? 'page__header--notification-active'
                          : 'page__header--notification'
                      }
                      onClick={handleNotificationClick}
                    >
                      <MdOutlineNotificationsNone size={30} />
                    </div>
                    {showNotificationModal ? (
                      <NotificationBox data={notifications} />
                    ) : null}
                  </Box>
                </ClickAwayListener>
              </Grid>
              <Grid item md={7}>
                <ClickAwayListener onClickAway={handleCloseProfileModal}>
                  <Box>
                    <Grid
                      container
                      direction='row'
                      className='page__header--profile'
                    >
                      <Avatar
                        src={AvatarImg}
                        alt='avatar user'
                        className='page__header--profile-avatar'
                        onClick={handleToggleProfileModal}
                      />
                      <h4
                        className='page__header--profile-username'
                        onClick={handleToggleProfileModal}
                      >
                        {fullName}
                      </h4>
                    </Grid>
                    {showProfileModal ? <ProfileBox /> : null}
                  </Box>
                </ClickAwayListener>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Grid>
  )
}

type Props = {
  children?: React.ReactNode
  title?: string
  pagePosition?: 'on-top-page' | 'on-bottom-page' | 'center-page'
  showSearchBar?: boolean
  backgroundColor?: string
}

export default PageWithHeader
