import * as React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { Theme } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles: (theme: Theme) => any = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
      '&:disabled': {
        backgroundColor: theme.palette.error.light,
      },
    },
  }
}

const ButtonContainedError = withStyles(styles)((props: ButtonProps) => {
  const { className, ...rest } = props
  const classes = props.classes || {}

  return (
    <Button
      {...props}
      className={`${className} ${classes.root}`}
      variant='contained'
    />
  )
})

export default ButtonContainedError
