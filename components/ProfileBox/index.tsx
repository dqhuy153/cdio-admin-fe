import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import { BiChevronDown, BiChevronUp, BiLogOut } from 'react-icons/bi'
import { Card } from '@material-ui/core'
import { Box } from '@mui/system'
import { AiOutlineBuild } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { logoutThunkAction } from '@redux/auth/thunks'

const ProfileBox: React.FC<Props> = ({}) => {
  const [open, setOpen] = React.useState(true)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutThunkAction())
  }

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box right={60} position='absolute' zIndex={100}>
      <Card variant='elevation' className='page__header--profile-modal'>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          <ListItemButton>
            <ListItemText primary='Profile' />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary='Setting' />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary='More' />
            {open ? <BiChevronDown /> : <BiChevronUp />}
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AiOutlineBuild />
                </ListItemIcon>
                <ListItemText primary='Theme' />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={handleLogout}>
                <ListItemIcon>
                  <BiLogOut />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Card>
    </Box>
  )
}

type Props = {}

export default ProfileBox
