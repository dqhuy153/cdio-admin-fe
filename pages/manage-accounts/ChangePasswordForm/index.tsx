import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { Button, Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { changePasswordAccountThunkAction } from '@redux/accounts/thunks'
import { LoaderBall } from '@components/common'
import { ChangePasswordFormSchema, ChangePasswordFormType } from './helpers'

const ChangePasswordForm: NextPage<Props> = ({
  onClose,
  userId,
  previousQueryUrl,
  email,
}) => {
  const dispatch = useDispatch()
  const accountsState = useSelector(
    (state: RootState) => state.accountsManagement
  )

  const initialValues: ChangePasswordFormType = {
    newPassword: '',
    confirmPassword: '',
  }

  const handleSubmit = (values: ChangePasswordFormType) => {
    if (!userId) return

    const payload = {
      userId,
      newPassword: values.newPassword,
    }
    dispatch(
      changePasswordAccountThunkAction(payload, previousQueryUrl, () => {
        onClose()
      })
    )
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ChangePasswordFormSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className='modal-main__body' spacing={3}>
        <Grid item md={12} className='modal-main__body--item'>
          <TextField
            label='Email *'
            type='email'
            value={email}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item md={12} className='modal-main__body--item'>
          <TextField
            label='New Password *'
            type='password'
            {...formik.getFieldProps('newPassword')}
            error={!!formik.errors.newPassword && !!formik.touched.newPassword}
            helperText={
              !!formik.errors.newPassword && !!formik.touched.newPassword
                ? formik.errors.newPassword
                : ''
            }
            fullWidth
          />
        </Grid>
        <Grid item md={12} className='modal-main__body--item'>
          <TextField
            label='Confirm Password *'
            type='password'
            {...formik.getFieldProps('confirmPassword')}
            error={
              !!formik.errors.confirmPassword &&
              !!formik.touched.confirmPassword
            }
            helperText={
              !!formik.errors.confirmPassword &&
              !!formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : ''
            }
            fullWidth
          />
        </Grid>
      </Grid>
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
          className='has-text-danger'
          style={{ marginRight: '15px' }}
          onClick={onClose}
        >
          Discard
        </Button>

        <Button variant='contained' type='submit' color='primary'>
          {accountsState.loading ? (
            <LoaderBall
              color1='#ffffff'
              color2='#eeeeee'
              color3='#ffffff'
              color4='#eeeeee'
              color5='#ffffff'
              height={18}
            />
          ) : (
            'Save'
          )}
        </Button>
      </Grid>
    </form>
  )
}

type Props = {
  userId?: string
  email?: string
  previousQueryUrl?: URLSearchParams
  onClose: () => void
}

export default ChangePasswordForm
