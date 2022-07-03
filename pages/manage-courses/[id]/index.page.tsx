/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { Fragment, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { LoaderBall } from '@components/common'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import { getCourseDetailsThunkAction } from '@redux/courses/thunks'
import { getCategoriesThunkAction } from '@redux/categories/thunks'
import CourseInfo from './components/CourseInfo'
import LearnersInfo from './components/LearnersInfo'
import AccordionSection from '../../../components/common/Accordion'
import CourseInfoForm from './components/CourseInfoForm'
import ModalMain from '@components/common/Modal'
import ChaptersInfo from './components/ChaptersInfo'

const CourseDetail: NextPage<Props> = ({}) => {
  const router = useRouter()

  const { id } = router.query

  const dispatch = useDispatch()
  const courseState = useSelector((state: RootState) => state.coursesManagement)

  const selectedCourse = courseState.currentCourse

  const [expanded, setExpanded] = useState<number>(1)
  const [showCourseInfoModal, setShowCourseInfoModal] = useState<boolean>(false)

  const handleAccordionChange = (panel: number) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : 0)
  }

  const handleShowCourseInfoModal = () => {
    setShowCourseInfoModal(true)
  }
  const handleCloseCourseInfoModal = () => {
    setShowCourseInfoModal(false)
  }

  const handleEditClickCourseInfo = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()
    handleShowCourseInfoModal()
  }

  const handleRedirectToCoursePreview = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()
    await router.push(`/preview/${id}`)
  }

  useEffect(() => {
    dispatch(getCourseDetailsThunkAction(id as string))
    dispatch(getCategoriesThunkAction())
  }, [dispatch, id])

  return (
    <div className='page-course-detail'>
      <Head>
        <title>{selectedCourse?.title || 'Course Detail'}</title>
        <meta name='description' content='Manage course to GuruAcademy ADMIN' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Course Detail'>
          {courseState.loading && !showCourseInfoModal ? (
            <LoaderBall />
          ) : (
            <Fragment>
              {/* Modals */}
              {showCourseInfoModal && (
                <ModalMain
                  open={showCourseInfoModal}
                  onClose={handleCloseCourseInfoModal}
                  width={600}
                  height={500}
                  position='flex-start-center'
                  preventBackdropClick
                  label={'Course Detail'}
                >
                  <CourseInfoForm
                    selectedCourse={selectedCourse}
                    onClose={handleCloseCourseInfoModal}
                  />
                </ModalMain>
              )}
              {/* Main content */}
              <Grid
                container
                spacing={3}
                className='page-course-detail__course-info'
              >
                <AccordionSection
                  expanded={expanded === 1}
                  onAccordionChange={handleAccordionChange(1)}
                  onEdit={handleEditClickCourseInfo}
                  label='Course Information'
                >
                  <CourseInfo selectedCourse={selectedCourse} />
                </AccordionSection>
              </Grid>
              <Grid container spacing={3}>
                <AccordionSection
                  expanded={expanded === 2}
                  onAccordionChange={handleAccordionChange(2)}
                  label='Course Preview'
                  onEdit={e => handleRedirectToCoursePreview(e)}
                  editLabel='Preview'
                >
                  <p className='mr-8'>View course preview </p>
                  <Link href={`/preview/${id}`}> here</Link>
                </AccordionSection>
              </Grid>
              <Grid container spacing={3}>
                <AccordionSection
                  expanded={expanded === 3}
                  onAccordionChange={handleAccordionChange(3)}
                  label='Learners'
                >
                  <LearnersInfo data={selectedCourse?.learnersDetail} />
                </AccordionSection>
              </Grid>
              <Grid container spacing={3}>
                <AccordionSection
                  expanded={expanded === 4}
                  onAccordionChange={handleAccordionChange(4)}
                  label='Chapters'
                >
                  <ChaptersInfo data={selectedCourse?.chapters} />
                </AccordionSection>
              </Grid>
              <Grid container spacing={3}>
                <AccordionSection
                  expanded={expanded === 5}
                  onAccordionChange={handleAccordionChange(5)}
                  label='Streams'
                >
                  <LearnersInfo data={selectedCourse?.learnersDetail} />
                </AccordionSection>
              </Grid>
              <Grid container spacing={3}>
                <AccordionSection
                  expanded={expanded === 6}
                  onAccordionChange={handleAccordionChange(6)}
                  label='Feedbacks'
                >
                  <LearnersInfo data={selectedCourse?.learnersDetail} />
                </AccordionSection>
              </Grid>
            </Fragment>
          )}
        </PageWithHeader>
      </PageWithSidebar>
    </div>
  )
}

type Props = {}

export default CourseDetail
