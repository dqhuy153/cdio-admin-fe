import React, { forwardRef } from 'react'
import { Backdrop, Grid, Modal } from '@material-ui/core'
import { Callback } from '@utils/types'
import { useSpring, animated } from 'react-spring'
import { MdClose } from 'react-icons/md'

// tslint:disable-next-line: no-shadowed-variable
// tslint:disable-next-line: ter-prefer-arrow-callback
const Fade = forwardRef(function FadeEffect(props: FadeProps, ref: any) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      // tslint:disable-next-line: early-exit
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      // tslint:disable-next-line: early-exit
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={styles} {...other}>
      {children}
    </animated.div>
  )
})

type FadeProps = {
  children: React.ReactNode
  in: boolean
  onEnter?: Callback
  onExited?: Callback
}

const ModalMain: React.FC<ModalProps> = ({
  open,
  onClose = () => {
    return
  },
  children,
  className,
  width = 'auto',
  height = 'auto',
  hasBackdrop = true,
  modalClassName,
  position = 'flex-start-center',
  backdropColor = 'rgba(0,0,0,0.3)',
  preventBackdropClick = false,
  label,
  ...props
}) => {
  const handleBackdropClick = () => {
    if (!preventBackdropClick) {
      onClose()
    }

    return
  }

  const windowHeight = window.innerHeight
  const extraWidthForFooter =
    windowHeight > 800 ? 140 : windowHeight > 650 ? 60 : 0

  return (
    <Modal
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      hideBackdrop={!hasBackdrop}
      BackdropProps={{
        timeout: 500,
        style: {
          backgroundColor: backdropColor,
        },
        onClick: handleBackdropClick,
      }}
      className={`${modalClassName} ${position} ${
        position === 'flex-start-center' && 'mt-100'
      }`}
      style={{
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      <Fade in={open}>
        <div
          className={`${className} section__card`}
          style={{
            position: 'relative',
            height: `${
              typeof height === 'number'
                ? `${height + extraWidthForFooter}`
                : height
            }px`,
          }}
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            className='modal-main__header mb-20'
          >
            <h4 className='text-is-20'>{label}</h4>
            <MdClose size={20} cursor='pointer' onClick={onClose} />
          </Grid>
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              maxHeight: '55vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            {...props}
          >
            {children}
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

type ModalProps = {
  open: boolean
  onClose?: Callback
  children?: React.ReactNode
  className?: string
  hasBackdrop?: boolean
  width?: string | number
  height?: string | number
  modalClassName?: string
  position?:
    | 'justify-center'
    | 'justify-flex-start'
    | 'justify-flex-end'
    | 'flex-start-center'
    | 'flex-end-center'
  backdropColor?: string
  preventBackdropClick?: boolean
  label?: string
} & React.HTMLAttributes<HTMLDivElement>

export default ModalMain
