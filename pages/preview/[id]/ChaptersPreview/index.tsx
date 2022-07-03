// tslint:disable ter-func-call-spacing
import React, { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { Button, Grid } from '@material-ui/core'
import {
  AttachmentDetailData,
  LessonOverviewData,
  TestDetailData,
} from '@redux/chapters/types'
import { Callback, ChapterContentType } from '@utils/types'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { ChapterOverviewData } from '@redux/courses/types'
import { AccordionMain, LoaderBall } from '@components/common'
import LessonsPreview from '../LessonsPreview'
import TestPreview from '../TestPreview'
import StatusDot from '@components/Status/StatusDot'
import LessonPreview from '../LessonPreview'
import ModalMain from '@components/common/Modal'
import ChapterInfoForm from '@pages/manage-courses/chapter/[id]/components/ChapterInfoForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/rootReducer'
import { updateChapterDetailsThunkAction } from '@redux/chapters/thunks'
import AttachmentPreview from '../AttachmentPreview'

interface Props {
  chaptersData: ChapterOverviewData[] | null | undefined
  className?: string
  label?: string
  maxHeightSidebar?: string | number
  maxHeightContent?: string | number
  courseId?: string | null | undefined
  showSaveChapterButton?: boolean
  reloadChapterDetailAfterAction?: boolean
  showEditChapter?: boolean
  setAllowLoading?: Callback
  onSave?: Callback
}

// tslint:disable-next-line: cyclomatic-complexity
const ChaptersPreview: React.FC<Props> = ({
  chaptersData,
  className,
  label = 'Preview',
  maxHeightSidebar = 'auto',
  maxHeightContent = 'auto',
  courseId,
  showSaveChapterButton = true,
  reloadChapterDetailAfterAction = false,
  showEditChapter = true,
  setAllowLoading,
  onSave = () => {
    return
  },
}) => {
  const courseState = useSelector((state: RootState) => state.coursesManagement)
  const dispatch = useDispatch()
  const [chapters, setChapters] = useState<ChapterOverviewData[]>(
    chaptersData || []
  )
  const [currentType, setCurrentType] = useState<ChapterContentType | null>(
    'lesson'
  )
  const firstLoadLesson =
    chapters && chapters.length > 0 ? chapters?.[0]?.lessons?.[0] : null
  const [currentLessonData, setCurrentLessonData] = useState<
    LessonOverviewData | null | undefined
  >(firstLoadLesson)
  const [currentTestData, setCurrentTestData] = useState<TestDetailData | null>(
    null
  )
  const [currentAttachmentData, setCurrentAttachmentData] =
    useState<AttachmentDetailData | null>(null)
  const [showChapterInfoModal, setShowChapterInfoModal] =
    useState<boolean>(false)
  const [selectedEditChapter, setSelectedEditChapter] =
    useState<ChapterOverviewData | null>(null)

  useEffect(() => {
    setChapters(chaptersData ? chaptersData : [])
  }, [chaptersData])

  const handleMoveUp = (event: any, index: number) => {
    event.stopPropagation()
    if (index === 0) {
      return
    }

    const newChapters = [...chapters]
    const temp = newChapters[index - 1]
    newChapters[index - 1] = newChapters[index]
    newChapters[index] = temp

    setChapters(newChapters)
  }

  const handleMoveDown = (event: any, index: number) => {
    event.stopPropagation()
    if (index === chapters.length - 1) {
      return
    }

    const newChapters = [...chapters]
    const temp = newChapters[index + 1]
    newChapters[index + 1] = newChapters[index]
    newChapters[index] = temp

    setChapters(newChapters)
  }

  const handleLessonsPreviewChange = (
    type: ChapterContentType | null,
    value: TestDetailData | LessonOverviewData | AttachmentDetailData | null
  ) => {
    setCurrentType(type)
    if (type === 'lesson') {
      setCurrentLessonData(value as LessonOverviewData)
      setCurrentTestData(null)
      setCurrentAttachmentData(null)
    } else if (type === 'test') {
      setCurrentTestData(value as TestDetailData)
      setCurrentLessonData(null)
      setCurrentAttachmentData(null)
    } else if (type === 'attachment') {
      setCurrentAttachmentData(value as AttachmentDetailData)
      setCurrentLessonData(null)
      setCurrentTestData(null)
    }
  }

  const handleEditChapterInfoClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    chapter: ChapterOverviewData
  ) => {
    event.stopPropagation()
    setSelectedEditChapter(chapter)
    setShowChapterInfoModal(true)
  }

  const handleCloseChapterInfoModal = () => {
    setShowChapterInfoModal(false)
  }

  const handleSaveLessons = (payload: {
    chapterId: string | null | undefined
    lessonIds: string[]
  }) => {
    if (!payload.chapterId) return
    if (setAllowLoading) {
      setAllowLoading(false)
    }
    dispatch(
      updateChapterDetailsThunkAction(
        {
          id: payload.chapterId,
          reloadChapterDetails: false,
          lessons: payload.lessonIds,
        },
        () => {
          if (!setAllowLoading) return
          setAllowLoading(true)
        }
      )
    )
  }

  const contentPreview =
    currentType === 'lesson' && currentLessonData ? (
      <LessonPreview
        lessonData={currentLessonData}
        courseId={courseId}
        chapterId={
          reloadChapterDetailAfterAction ? chaptersData?.[0]?._id : null
        }
      />
    ) : currentType === 'test' && currentTestData ? (
      <TestPreview
        testData={currentTestData}
        courseId={courseId}
        chapterId={
          reloadChapterDetailAfterAction ? chaptersData?.[0]?._id : null
        }
      />
    ) : currentType === 'attachment' && currentAttachmentData ? (
      <AttachmentPreview
        attachmentData={currentAttachmentData}
        courseId={courseId}
        chapterId={
          reloadChapterDetailAfterAction ? chaptersData?.[0]?._id : null
        }
      />
    ) : (
      <p>No Data</p>
    )

  if (!chaptersData) {
    return (
      <Grid
        item
        xs={12}
        className={cn('page-course-detail__course-info--content', className)}
      >
        <p>No data</p>
      </Grid>
    )
  }

  return (
    <Fragment>
      {/* Modals */}
      {showChapterInfoModal && (
        <ModalMain
          open={showChapterInfoModal}
          onClose={handleCloseChapterInfoModal}
          width={600}
          height={450}
          position='flex-start-center'
          preventBackdropClick
          label={'Chapter Detail'}
        >
          <ChapterInfoForm
            selectedChapter={selectedEditChapter}
            onClose={handleCloseChapterInfoModal}
            courseId={courseId}
          />
        </ModalMain>
      )}
      <Grid container>
        <Grid
          item
          xs={12}
          className={cn(className, 'page-course-detail__course-info--content')}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                  <h4 className='page-course-detail__title'>{label}</h4>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className='page-chapter-detail__lesson-preview'
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  style={{ maxHeight: maxHeightContent, overflow: 'auto' }}
                >
                  {contentPreview}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  className='page-chapter-detail__lesson-preview--sidebar'
                >
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={10}>
                      <h4 className='ml-8'>Chapters</h4>
                    </Grid>
                    <Grid item xs={2}>
                      {showSaveChapterButton && (
                        <Button
                          variant='outlined'
                          className='has-text-primary '
                          onClick={() =>
                            onSave(chapters.map(chapter => chapter._id))
                          }
                        >
                          {courseState.updateLoading ? (
                            <LoaderBall height={16} width={'80%'} />
                          ) : (
                            'Save'
                          )}
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ maxHeight: maxHeightSidebar, overflow: 'auto' }}
                    >
                      {chapters?.map((chapter, index) => (
                        <AccordionMain
                          key={chapter?._id}
                          initExpanded={true}
                          labelNode={
                            <Grid
                              container
                              key={chapter?._id}
                              className={cn(
                                'page-chapter-detail__lesson-preview--sidebar__lesson'
                              )}
                              direction='row'
                              alignItems='center'
                            >
                              <Grid
                                item
                                xs={showEditChapter ? 9 : 10}
                                className='flex-center'
                              >
                                <StatusDot statusId={chapter?.status} />
                                <button className='my-8 button-text-no-color'>{`Chapter ${
                                  index + 1
                                }: ${chapter?.title}`}</button>
                              </Grid>
                              <Grid item xs={1}>
                                {index !== 0 ? (
                                  <AiOutlineArrowUp
                                    size={16}
                                    className='page-chapter-detail__lesson-preview--sidebar__icon'
                                    onClick={event =>
                                      handleMoveUp(event, index)
                                    }
                                  />
                                ) : null}
                              </Grid>
                              <Grid item xs={1}>
                                {index !== chapters.length - 1 ? (
                                  <AiOutlineArrowDown
                                    size={16}
                                    className='page-chapter-detail__lesson-preview--sidebar__icon'
                                    onClick={event =>
                                      handleMoveDown(event, index)
                                    }
                                  />
                                ) : null}
                              </Grid>
                              {showEditChapter && (
                                <Grid item xs={1}>
                                  <BiEdit
                                    size={20}
                                    className='page-chapter-detail__lesson-preview--sidebar__icon'
                                    onClick={e =>
                                      handleEditChapterInfoClick(e, chapter)
                                    }
                                  />
                                </Grid>
                              )}
                            </Grid>
                          }
                        >
                          <LessonsPreview
                            lessonsData={chapter?.lessons}
                            onChange={handleLessonsPreviewChange}
                            currentTypeFromChapters={currentType || undefined}
                            currentLessonDataFromChapters={
                              currentLessonData || undefined
                            }
                            currentTestDataFromChapters={
                              currentTestData || undefined
                            }
                            currentAttachmentDataFromChapters={
                              currentAttachmentData || undefined
                            }
                            courseId={courseId}
                            chapterId={chapter?._id}
                            onSave={handleSaveLessons}
                            reloadChapterDetail={reloadChapterDetailAfterAction}
                          />
                        </AccordionMain>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ChaptersPreview
