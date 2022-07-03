import SidebarMain from '@components/Sidebar/SidebarMain'
import { Grid } from '@material-ui/core'
import { useState } from 'react'

const PageWithSidebar = ({ children }: any) => {
  const [isCollapsedSidebar, setIsToggleSidebar] = useState(false)
  const handleToggleSidebar = () => {
    setIsToggleSidebar(prev => !prev)
  }

  return (
    <Grid container direction='row'>
      <Grid item>
        <SidebarMain
          isCollapsed={isCollapsedSidebar}
          onClickCollapsed={handleToggleSidebar}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={12}
        className={
          isCollapsedSidebar
            ? 'content-with-sidebar-collapsed'
            : 'content-with-sidebar'
        }
      >
        {children}
      </Grid>
    </Grid>
  )
}

export default PageWithSidebar
