import React from 'react'
import Link from 'next/link'
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from '@components/react-pro-sidebar/dist'
import Image from 'next/image'
import {
  MdOutlineSpaceDashboard,
  MdOutlineManageAccounts,
  MdOutlineLibraryBooks,
  MdOutlineNotificationsNone,
  MdOutlineTopic,
  MdCategory,
  MdOndemandVideo,
  MdOutlineFeedback,
} from 'react-icons/md'
import {
  BiCommentDetail,
  BiGridHorizontal,
  BiMenuAltLeft,
  BiUserCircle,
} from 'react-icons/bi'

import LogoImg from '@public/images/logo.png'
import RoundIconButton from '@components/common/Button/RoundButton'
import { AiOutlineFileDone, AiOutlineFileText } from 'react-icons/ai'

const SidebarMain: React.FC<Props> = ({
  isCollapsed = false,
  onClickCollapsed,
  ...props
}) => {
  return (
    <>
      <ProSidebar
        collapsed={isCollapsed}
        collapsedWidth={80}
        className='sidebar__main'
      >
        <SidebarHeader className='sidebar__main--header'>
          <div className='mt-20 mb-12 justify-space-between'>
            <Link href='/' passHref>
              <a>
                <Image
                  src={LogoImg}
                  alt='GuruAcademy'
                  width={150}
                  height={50}
                  objectFit='contain'
                />
              </a>
            </Link>

            {!isCollapsed && (
              <RoundIconButton
                className='btn__hover'
                width='40px'
                height='40px'
                margin='0 4px'
              >
                <BiMenuAltLeft size={20} onClick={onClickCollapsed} />
              </RoundIconButton>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className='sidebar__main--content'>
          <Menu iconShape='circle' className='sidebar__main--content__menu'>
            {isCollapsed && (
              <MenuItem
                icon={<BiMenuAltLeft size={20} />}
                onClick={onClickCollapsed}
              />
            )}
            <MenuItem icon={<MdOutlineSpaceDashboard size={20} />}>
              <Link href='/'>Dashboard</Link>
            </MenuItem>
            <SubMenu
              title='Accounts'
              icon={<MdOutlineManageAccounts size={20} />}
            >
              <MenuItem>
                <Link href='/manage-accounts'>All</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-accounts?role=root'>Root</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-accounts?role=admin'>Admin</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-accounts?role=teacher'>Teacher</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-accounts?role=learner'>Learner</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title='Courses' icon={<MdOutlineLibraryBooks size={20} />}>
              <MenuItem>
                <Link href='/manage-courses'>All</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/browse/courses'>Browse / Filter / Search</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<MdCategory size={20} />}>
              <Link href='/manage-category'>Category</Link>
            </MenuItem>
            <MenuItem icon={<MdOutlineTopic size={20} />}>
              <Link href='/manage-topic'>Topics</Link>
            </MenuItem>
          </Menu>
          <Menu iconShape='circle' className='sidebar__main--content__menu'>
            <MenuItem icon={<MdOndemandVideo size={20} />}>
              <Link href='/preview'>Course Preview</Link>
            </MenuItem>
            <SubMenu title='Browse' icon={<BiGridHorizontal size={20} />}>
              <MenuItem>
                <Link href='/manage-category'>Browse Chapters</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-category'>Browse Lessons</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-category'>Browse Tests</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-category'>Browse Attachments</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-category'>Browse Comments</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/manage-category'>Browse Feedbacks</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu iconShape='circle' className='sidebar__main--content__profile'>
            <MenuItem icon={<MdOutlineNotificationsNone size={20} />}>
              <Link href='/notifications'>Notifications</Link>
            </MenuItem>
            <MenuItem icon={<BiUserCircle size={20} />}>
              <Link href='/profile'>Profile</Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter className='sidebar__main--footer'>
          <div className='text-center'>
            <p>v1.0.0</p>
          </div>
        </SidebarFooter>
      </ProSidebar>
      {props.children}
    </>
  )
}

type Props = {
  isCollapsed: boolean
  onClickCollapsed: () => void
}

export default SidebarMain
