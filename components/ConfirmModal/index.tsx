import { LoaderBall } from '@components/common'
import ModalMain from '@components/common/Modal'
import { Button, Grid } from '@material-ui/core'
import { Callback } from '@utils/types'
import React from 'react'

interface Props {
  open: boolean
  width?: number
  height?: number
  position?:
    | 'flex-start-center'
    | 'justify-center'
    | 'justify-flex-start'
    | 'justify-flex-end'
    | 'flex-end-center'
    | undefined
  label?: string
  preventBackdropClick?: boolean
  confirmBtnText?: string
  cancelBtnText?: string
  content?: React.ReactNode | string
  children?: React.ReactNode
  loading?: boolean
  onClose: Callback
  onConfirm?: Callback
  onCancel?: Callback
  type?: 'confirm' | 'alert' | 'danger'
}

const ConfirmModal = ({
  open,
  width = 400,
  height = 100,
  position = 'flex-start-center',
  cancelBtnText = 'Cancel',
  confirmBtnText = 'OK',
  label = 'Confirmation',
  content,
  preventBackdropClick = false,
  children,
  loading = false,
  onClose,
  onCancel,
  onConfirm,
  type = 'confirm',
}: Props) => {
  let primaryBtnProps
  let loadingBallProps

  if (type === 'alert') {
    primaryBtnProps = {
      variant: 'outlined',
      className: 'has-text-warning',
    }
  }

  if (type === 'danger') {
    primaryBtnProps = {
      variant: 'outlined',
      className: 'has-text-danger',
    }
  }

  if (type === 'confirm') {
    primaryBtnProps = {
      variant: 'contained',
      color: 'primary',
    }
    loadingBallProps = {
      color1: '#ffffff',
      color2: '#eeeeee',
      color3: '#ffffff',
      color4: '#eeeeee',
      color5: '#ffffff',
    }
  }

  return (
    <ModalMain
      open={open}
      onClose={onClose}
      width={width}
      height={height}
      position={position}
      preventBackdropClick={preventBackdropClick}
      label={label}
    >
      {typeof content === 'string' ? <p>{content}</p> : content}
      {children}
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className='modal-main__footer mt-20'
        style={{
          position: 'absolute',
          bottom: 20,
          width: '92%',
        }}
      >
        <Button
          variant='outlined'
          className='has-text-warning'
          onClick={onCancel}
        >
          {cancelBtnText}
        </Button>
        <Button {...primaryBtnProps} onClick={onConfirm}>
          {loading ? (
            <LoaderBall {...loadingBallProps} height={18} />
          ) : (
            confirmBtnText
          )}
        </Button>
      </Grid>
    </ModalMain>
  )
}

export default ConfirmModal
