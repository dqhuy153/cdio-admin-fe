// tslint:disable ter-func-call-spacing
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Button, Grid } from '@material-ui/core'
import { LessonOverviewData } from '@redux/chapters/types'
import { Callback } from '@utils/types'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

type chapterContentType = 'lesson' | 'attachment' | 'test'

interface Props {
  lessonsData: LessonOverviewData[] | undefined
  className?: string
  onEdit?: Callback
}

const LessonsInfo = ({ lessonsData, className, onEdit }: Props) => {
  const [currentLessonUrl, setCurrentLessonUrl] = useState<
    string | null | undefined
  >(lessonsData?.[0]?.url || null)
  const [currentType, setCurrentType] = useState<chapterContentType | null>(
    'lesson'
  )
  const [lessons, setLessons] = useState<LessonOverviewData[]>(
    lessonsData || []
  )
  const [showEditLessonModal, setShowEditLessonModal] = useState<boolean>(false)
  const [selectedLessonData, setSelectedLessonData] =
    useState<LessonOverviewData | null>(null)

  useEffect(() => {
    setLessons(lessonsData ? lessonsData : [])
  }, [lessonsData])

  if (!lessonsData) {
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

  const handleLessonClick = (url: string | undefined) => {
    if (!url) {
      setCurrentLessonUrl('')
      setCurrentType(null)
    }

    setCurrentLessonUrl(url)
    setCurrentType('lesson')
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) {
      return
    }

    const newLessons = [...lessons]
    const temp = newLessons[index - 1]
    newLessons[index - 1] = newLessons[index]
    newLessons[index] = temp

    setLessons(newLessons)
  }

  const handleMoveDown = (index: number) => {
    if (index === lessons.length - 1) {
      return
    }

    const newLessons = [...lessons]
    const temp = newLessons[index + 1]
    newLessons[index + 1] = newLessons[index]
    newLessons[index] = temp

    setLessons(newLessons)
  }

  const handleOpenEditLessonModal = (lessonData: LessonOverviewData) => {
    setSelectedLessonData(lessonData)
    setShowEditLessonModal(true)
  }

  const contentPreview =
    currentType === 'lesson' && currentLessonUrl ? (
      <video width='100%' controls src={currentLessonUrl} />
    ) : (
      <p>No Data</p>
    )

  return (
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
                <h4 className='page-course-detail__title'>Lessons Preview</h4>
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
              <Grid item xs={12} sm={7}>
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
                    <h4 className='ml-8'>Lessons Content</h4>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant='outlined'
                      className='has-text-primary '
                      onClick={onEdit}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {lessons.map((lesson, index) => (
                      <Grid
                        container
                        key={lesson._id}
                        className={cn(
                          'page-chapter-detail__lesson-preview--sidebar__lesson',
                          lesson.url === currentLessonUrl
                            ? 'page-chapter-detail__lesson-preview--sidebar__lesson-active'
                            : ''
                        )}
                        direction='row'
                        alignItems='center'
                      >
                        <Grid item xs={9}>
                          <button
                            className='my-8 button-text-no-color'
                            onClick={() => handleLessonClick(lesson.url)}
                          >{`${index + 1}. ${lesson.title}`}</button>
                        </Grid>
                        <Grid item xs={1}>
                          {index !== 0 ? (
                            <AiOutlineArrowUp
                              size={16}
                              className='page-chapter-detail__lesson-preview--sidebar__icon'
                              onClick={() => handleMoveUp(index)}
                            />
                          ) : null}
                        </Grid>
                        <Grid item xs={1}>
                          {index !== lessons.length - 1 ? (
                            <AiOutlineArrowDown
                              size={16}
                              className='page-chapter-detail__lesson-preview--sidebar__icon'
                              onClick={() => handleMoveDown(index)}
                            />
                          ) : null}
                        </Grid>
                        <Grid item xs={1}>
                          <BiEdit
                            size={20}
                            className='page-chapter-detail__lesson-preview--sidebar__icon'
                            onClick={() => handleOpenEditLessonModal(lesson)}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LessonsInfo
