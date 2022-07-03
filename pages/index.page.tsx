import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PageWithSidebar from '@components/layout/PageWithSidebar'
import PageWithHeader from '@components/header'
import { getDashboardReportThunkAction } from '@redux/report/thunks'
import { RootState } from '@redux/rootReducer'
import { isEmpty } from '@utils/helpers'
import { Grid } from '@material-ui/core'
import { FcCurrencyExchange } from 'react-icons/fc'
import SelectOverviewBox from '@components/dashboard/SelectOverviewBox'
import {
  getCategoryPieChartData,
  getLineChartNewsCoursesAndUsersData,
  getLineChartRevenueData,
  getSelectOverviewBoxOptions,
  getTopicsPieChartData,
} from './helpers'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { ImUserTie } from 'react-icons/im'
import { MdLibraryBooks } from 'react-icons/md'
import LineChart from '@components/dashboard/LineChart'
import OverviewBox from '@components/dashboard/OverviewBox'
import UserListBox from '@components/dashboard/UserListBox'
import { UserRole, UserStatus } from '@config/constant'
import CourseListBox from '@components/dashboard/CourseListBox'
import { Skeleton } from '@mui/material'
import RegisteredUserListBox from '@components/dashboard/RegisteredUserListBox'
import PieChart from '@components/common/PieChart'
import BarChart from '@components/common/BarChart'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const reportState = useSelector((state: RootState) => state.reportManagement)
  const accountsState = useSelector(
    (state: RootState) => state.accountsManagement
  )

  const dashboardData = reportState.dashboard
  const reportLoading = reportState.loading
  const accountsLoading = accountsState.loading

  const [isUserBoxHadAction, setIsUserBoxHadAction] = useState<boolean>(false)

  useEffect(() => {
    if (!isEmpty(dashboardData)) return
    dispatch(getDashboardReportThunkAction())
  }, [dispatch, dashboardData])

  const lineChartNewsCoursesAndUsersData =
    getLineChartNewsCoursesAndUsersData(dashboardData)
  const lineChartRevenueData = getLineChartRevenueData(dashboardData?.revenue)
  const categoriesPieChartData = getCategoryPieChartData(
    dashboardData?.data?.categoriesData
  )
  const topicsPieChartData = getTopicsPieChartData(
    dashboardData?.data?.categoriesData
  )

  return (
    <div className='page__home'>
      <Head>
        <title>GuruAcademy ADMIN</title>
        <meta name='description' content='Welcome to GuruAcademy ADMIN' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <PageWithSidebar>
          <PageWithHeader showSearchBar backgroundColor='#f5f9ff'>
            <Grid container spacing={3}>
              <Grid item sm={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                    <SelectOverviewBox
                      loading={reportLoading}
                      label='Learners'
                      iconTopLeft={
                        <div
                          style={{
                            background: '#faeae8',
                          }}
                          className='py-8 px-8 mr-16 br-8 lh-1'
                        >
                          <AiOutlineUsergroupAdd size={18} />
                        </div>
                      }
                      options={
                        dashboardData?.newLearners
                          ? getSelectOverviewBoxOptions(
                              dashboardData?.newLearners
                            )
                          : []
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <SelectOverviewBox
                      label='Teachers'
                      loading={reportLoading}
                      iconTopLeft={
                        <div
                          style={{
                            background: '#faf7e8',
                          }}
                          className='py-8 px-8 mr-16 br-8 lh-1'
                        >
                          <ImUserTie size={18} />
                        </div>
                      }
                      options={
                        dashboardData?.newTeachers
                          ? getSelectOverviewBoxOptions(
                              dashboardData?.newTeachers
                            )
                          : []
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    style={{ maxHeight: '55vh', minHeight: '300px' }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                      }}
                      className='br-16 hp-100'
                    >
                      {reportLoading ? (
                        <Skeleton
                          sx={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <>
                          <h4 className='px-36 pt-20'>New Users & Courses</h4>
                          <LineChart
                            data={lineChartNewsCoursesAndUsersData}
                            curve='catmullRom'
                          />
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <SelectOverviewBox
                      label='Revenue'
                      loading={reportLoading}
                      iconTopLeft={
                        <div
                          style={{
                            background: '#e8fae9',
                          }}
                          className='py-8 px-8 mr-16 br-8 lh-1'
                        >
                          <FcCurrencyExchange size={18} />
                        </div>
                      }
                      options={
                        dashboardData?.revenue
                          ? getSelectOverviewBoxOptions(
                              dashboardData?.revenue,
                              '$'
                            )
                          : []
                      }
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <SelectOverviewBox
                      label='Courses'
                      loading={reportLoading}
                      iconTopLeft={
                        <div
                          style={{
                            background: '#f5f0ff',
                          }}
                          className='py-8 px-8 mr-16 br-8 lh-1'
                        >
                          <MdLibraryBooks size={18} />
                        </div>
                      }
                      options={
                        dashboardData?.newCourses
                          ? getSelectOverviewBoxOptions(
                              dashboardData?.newCourses
                            )
                          : []
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    style={{ maxHeight: '55vh', minHeight: '300px' }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                      }}
                      className='br-16 hp-100'
                    >
                      {reportLoading ? (
                        <Skeleton
                          sx={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <>
                          <h4 className='px-36 pt-20'>Overall Revenue</h4>
                          <LineChart
                            data={lineChartRevenueData}
                            enableArea
                            enablePointLabel
                          />
                        </>
                      )}
                    </div>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    style={{ maxHeight: '50vh', minHeight: '300px' }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                      }}
                      className='br-16 hp-100'
                    >
                      {reportLoading ? (
                        <Skeleton
                          sx={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <>
                          <h4 className='px-36 pt-20'>Revenue by Categories</h4>
                          <PieChart data={categoriesPieChartData} />
                        </>
                      )}
                    </div>
                  </Grid>
                  {/* <Grid
                    item
                    sm={6}
                    style={{ maxHeight: '50vh', minHeight: '300px' }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                      }}
                      className='br-16 hp-100'
                    >
                      {reportLoading ? (
                        <Skeleton
                          sx={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <>
                          <h4 className='px-36 pt-20'>Revenue by Topics</h4>
                          <BarChart data={topicsPieChartData} />
                        </>
                      )}
                    </div>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item sm={12} md={4}>
                <Grid container spacing={3}>
                  <Grid item sm={12}>
                    <OverviewBox
                      loading={reportLoading}
                      label='Pending teachers'
                      maxHeightBody='30vh'
                      body={
                        <UserListBox
                          loading={accountsLoading}
                          data={
                            isUserBoxHadAction
                              ? //get user from accounts state after update in this page
                                accountsState?.users?.filter(
                                  user =>
                                    user?.status === UserStatus.PENDING &&
                                    user?.role?.id === UserRole.TEACHER.id
                                )
                              : //first loading will use dashboard data
                                dashboardData?.activities?.pendingTeachers
                          }
                          avatarSize={30}
                          callbackAfterAction={() =>
                            setIsUserBoxHadAction(true)
                          }
                        />
                      }
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <OverviewBox
                      loading={reportLoading}
                      label='Pending courses'
                      maxHeightBody='30vh'
                      body={
                        <CourseListBox
                          loading={accountsLoading}
                          data={dashboardData?.activities?.pendingCourses}
                          avatarSize={30}
                        />
                      }
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <OverviewBox
                      loading={reportLoading}
                      label='Last 10 learners'
                      maxHeightBody='30vh'
                      body={
                        <UserListBox
                          loading={accountsLoading}
                          data={dashboardData?.activities?.last10Learners}
                          readonly
                          avatarSize={30}
                        />
                      }
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <OverviewBox
                      loading={reportLoading}
                      label='Last 10 Registered Users'
                      maxHeightBody='30vh'
                      body={
                        <RegisteredUserListBox
                          loading={accountsLoading}
                          data={
                            dashboardData?.activities?.last10LearnersRegistered
                          }
                          readonly
                          avatarSize={30}
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PageWithHeader>
        </PageWithSidebar>
      </main>
    </div>
  )
}

export default Home
