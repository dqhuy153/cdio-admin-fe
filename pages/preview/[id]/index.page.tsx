/* eslint-disable react-hooks/exhaustive-deps */
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { Fragment, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { LoaderBall } from '@components/common'
import { useRouter } from 'next/router'
import {
  getCourseDetailsThunkAction,
  updateCourseDetailsThunkAction,
} from '@redux/courses/thunks'
import ChaptersPreview from './ChaptersPreview'

const ChapterDetail: NextPage<Props> = ({}) => {
  const router = useRouter()

  const { id } = router.query

  const dispatch = useDispatch()
  const courseState = useSelector((state: RootState) => state.coursesManagement)
  const courseData = courseState?.currentCourse

  useEffect(() => {
    dispatch(getCourseDetailsThunkAction(id as string))
  }, [dispatch, id])

  const handleSaveChapters = (chapterIds: string[]) => {
    if (!courseData || !courseData._id) return
    dispatch(
      updateCourseDetailsThunkAction(
        {
          id: courseData?._id,
          chapters: chapterIds,
          reloadCourseDetail: false,
        },
        () => {
          return
        }
      )
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{`${courseData?.title} Preview` || 'Course Preview'}</title>
        <meta name='description' content='Manage course to GuruAcademy ADMIN' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Course Preview'>
          {courseState.loading ? (
            <LoaderBall />
          ) : (
            <Fragment>
              <ChaptersPreview
                chaptersData={courseData?.chapters}
                label={'Content Preview'}
                maxHeightSidebar={'72vh'}
                maxHeightContent={'78vh'}
                courseId={id as string}
                reloadChapterDetailAfterAction={false}
                onSave={handleSaveChapters}
              />
            </Fragment>
          )}
        </PageWithHeader>
      </PageWithSidebar>
    </Fragment>
  )
}

type Props = {}

export default ChapterDetail
