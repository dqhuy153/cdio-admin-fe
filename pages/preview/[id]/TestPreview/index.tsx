import ModalMain from '@components/common/Modal'
import ViewItem from '@components/common/ViewItem'
import StatusDot from '@components/Status/StatusDot'
import { Button, Divider } from '@material-ui/core'
import { Grid } from '@mui/material'
import TestInfoForm from '@pages/manage-courses/chapter/[id]/components/TestInfoForm'
import { TestDetailData } from '@redux/chapters/types'
import React, { Fragment, useState } from 'react'

interface Props {
  testData: TestDetailData | null
  courseId?: string | null | undefined
  chapterId?: string | null | undefined
}

const TestPreview = ({ testData, courseId, chapterId }: Props) => {
  const [showTestInfoModal, setShowTestInfoModal] = useState<boolean>(false)

  if (!testData) {
    return <p>No Data</p>
  }

  const handleEditTestInfoClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setShowTestInfoModal(true)
  }

  const handleCloseChapterInfoModal = () => {
    setShowTestInfoModal(false)
  }

  return (
    <Fragment>
      {/* Modals */}
      {showTestInfoModal && (
        <ModalMain
          open={showTestInfoModal}
          onClose={handleCloseChapterInfoModal}
          width={850}
          height={520}
          position='flex-start-center'
          preventBackdropClick
          label={'Test Detail'}
        >
          <TestInfoForm
            selectedTest={testData}
            onClose={handleCloseChapterInfoModal}
            courseId={courseId}
            chapterId={chapterId}
          />
        </ModalMain>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className='justify-space-between'>
            <h4>Test Information</h4>
            <Button
              variant='outlined'
              className='has-text-primary'
              onClick={handleEditTestInfoClick}
            >
              Edit
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem label={'Test title'} value={testData?.title} />
        </Grid>
        <Grid item xs={12} md={2}>
          <ViewItem
            label={'Status'}
            value={<StatusDot statusId={testData?.status} showText />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ViewItem label={'Slug'} value={testData?.slug} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ViewItem label={'Description'} value={testData?.description} />
        </Grid>
        <Grid item xs={12} md={12} py={3}>
          <Divider variant='middle' />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {testData?.questions &&
              testData?.questions.length > 0 &&
              testData.questions.map((question, index) => (
                <Grid key={index} item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <ViewItem
                        key={index}
                        label={`Question ${index + 1}`}
                        value={question.question}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <p>{`A. ${question.a}`}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <p>{`B. ${question.b}`}</p>
                    </Grid>
                    {question.c && (
                      <Grid item xs={12}>
                        <p>{`C. ${question.c}`}</p>
                      </Grid>
                    )}
                    {question.d && (
                      <Grid item xs={12}>
                        <p>{`D. ${question.d}`}</p>
                      </Grid>
                    )}
                    {question.e && (
                      <Grid item xs={12}>
                        <p>{`E. ${question.e}`}</p>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <b>{`Answer: ${question.answer.toUpperCase()}`}</b>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default TestPreview
