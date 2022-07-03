import ModalMain from '@components/common/Modal'
import ViewItem from '@components/common/ViewItem'
import StatusDot from '@components/Status/StatusDot'
import { Button, Divider } from '@material-ui/core'
import { Grid } from '@mui/material'
import AttachmentInfoForm from '@pages/manage-courses/chapter/[id]/components/AttachmentInfoForm'
import { AttachmentDetailData } from '@redux/chapters/types'
import { formatDateFromApi } from '@utils/helpers'
import React, { Fragment, useState } from 'react'

interface Props {
  attachmentData: AttachmentDetailData | null
  courseId?: string | null | undefined
  chapterId?: string | null | undefined
}

const AttachmentPreview = ({ attachmentData, courseId, chapterId }: Props) => {
  const [showAttachmentInfoModal, setShowAttachmentInfoModal] =
    useState<boolean>(false)

  if (!attachmentData) {
    return <p>No Data</p>
  }

  const handleEditAttachmentInfoClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setShowAttachmentInfoModal(true)
  }

  const handleCloseChapterInfoModal = () => {
    setShowAttachmentInfoModal(false)
  }

  return (
    <Fragment>
      {/* Modals */}
      {showAttachmentInfoModal && (
        <ModalMain
          open={showAttachmentInfoModal}
          onClose={handleCloseChapterInfoModal}
          width={600}
          height={520}
          position='flex-start-center'
          preventBackdropClick
          label={'Attachment Detail'}
        >
          <AttachmentInfoForm
            selectedAttachment={attachmentData}
            onClose={handleCloseChapterInfoModal}
            courseId={courseId}
            chapterId={chapterId}
          />
        </ModalMain>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className='justify-space-between'>
            <h4>Attachment Information</h4>
            <Button
              variant='outlined'
              className='has-text-primary'
              onClick={handleEditAttachmentInfoClick}
            >
              Edit
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem label={'Attachment title'} value={attachmentData?.title} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem label={'Slug'} value={attachmentData?.slug} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem
            label={'Status'}
            value={<StatusDot statusId={attachmentData?.status} showText />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem
            label={'Created'}
            value={formatDateFromApi(attachmentData?.createdAt)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem label={'Description'} value={attachmentData?.description} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ViewItem
            label={'Last Updated'}
            value={formatDateFromApi(attachmentData?.updatedAt)}
          />
        </Grid>
        <Grid item xs={12} md={12} py={3}>
          <Divider variant='middle' />
        </Grid>
        <Grid item xs={12} md={12}>
          <div>
            Click{' '}
            <a
              className='fw-bold'
              href={attachmentData?.url}
              target='_blank'
              rel='noreferrer'
            >
              here
            </a>{' '}
            to download the attachment
          </div>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default AttachmentPreview
