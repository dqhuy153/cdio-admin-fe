import React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { Box } from '@mui/system'
import { NotificationsData } from '@redux/types'
import { Card, makeStyles } from '@material-ui/core'
import { Avatar } from '@components/common'

import AvatarImg from '@public/images/icon.png'

const LINES_TO_SHOW = 3

const useStyles = makeStyles({
  container: {
    // maxWidth: 600,
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': LINES_TO_SHOW,
    '-webkit-box-orient': 'vertical',
  },
})

const NotificationBox: React.FC<Props> = ({ data }) => {
  const classes = useStyles()

  return (
    <Box right={0} position='absolute' zIndex={100}>
      <Card variant='elevation' className='page__header--notification-modal'>
        <div className='page__header--notification-modal--header'>
          <h4>Notifications</h4>
        </div>
        <List className='page__header--notification-modal--body'>
          {data.map(notification => (
            <div key={notification._id}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    src={AvatarImg}
                    alt='avatar user'
                    className='page__header--profile-avatar'
                    size={30}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  className='page__header--notification-modal--content'
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='subtitle2'
                        color='text.primary'
                      >
                        {`${notification.userId.firstName} ${notification.userId.lastName}`}
                      </Typography>
                      <Typography
                        fontSize={14}
                        className={classes.multiLineEllipsis}
                      >{`${notification.content}`}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </div>
          ))}
        </List>
      </Card>
    </Box>
  )
}

type Props = {
  data: NotificationsData[]
}

export default NotificationBox
