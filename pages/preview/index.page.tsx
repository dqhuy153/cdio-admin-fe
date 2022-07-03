import { LoaderBall } from '@components/common'
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { Grid } from '@material-ui/core'
import { getCoursesManagementThunkAction } from '@redux/courses/thunks'
import { RootState } from '@redux/rootReducer'
import { getTotalPriceCourse } from '@utils/helpers'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BrowseCourse: NextPage = () => {
  const query = useMemo(() => new URLSearchParams(location.search), [])

  const courseState = useSelector((state: RootState) => state.coursesManagement)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getCoursesManagementThunkAction(query))
  }, [dispatch, query])

  const handleCourseClick = async (courseId: string) => {
    await router.push(`/preview/${courseId}`)
  }

  return (
    <div className='cmp-page'>
      <Head>
        <title>Courses Preview</title>
        <meta
          name='description'
          content='Preview courses with GuruAcademy ADMIN'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Preview Courses'>
          {courseState.loading ? (
            <LoaderBall />
          ) : (
            <Grid container spacing={6}>
              {courseState?.courses?.map(course => (
                <Grid item xs={6} md={4} key={course._id}>
                  <div
                    className='page-preview__course'
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className='img-cover'
                    />
                    <div className='px-8'>
                      <h5 className='mt-16 mb-8'>{course.title || '--'}</h5>
                      <p>
                        ${getTotalPriceCourse(course)} -{' '}
                        {course.author.firstName} {course.author.lastName}
                      </p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </PageWithHeader>
      </PageWithSidebar>
    </div>
  )
}

export default BrowseCourse
