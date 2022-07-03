import type { NextPage } from 'next'
import Head from 'next/head'
import { useFormik } from 'formik'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { loginThunkAction } from '../../redux/auth/thunks'
import { RootState } from 'redux/rootReducer'
import { LoginData } from '../../redux/auth/types'
import { loginSchema } from './helpers'
import { LoaderBall } from '@components/common'
import LoginImage from '@public/images/loginBg.jpg'
import LogoImage from '@public/images/logo.png'
import { getJwt } from '@utils/auth'

const Login: NextPage = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const router = useRouter()

  const initialValues: LoginData = {
    email: '',
    password: '',
  }

  const handleSubmit = (values: LoginData) => {
    dispatch(loginThunkAction(values))
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    const checkLogin = async () => {
      const token: string | null = getJwt()
      if (!userInfo.isLoggedIn || !token) return
      await router.push('/')
    }

    void checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLoggedIn])

  return (
    <div>
      <Head>
        <title>Login ADMIN.</title>
        <meta name='description' content='Login to GuruAcademy ADMIN' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid container className='center-page'>
        <Grid
          className='section__card'
          item
          md={8}
          sm={8}
          xs={11}
          maxHeight='80vh'
        >
          <Grid container direction='row'>
            <Grid
              item
              width={'40%'}
              overflow='hidden'
              className='page__login--image-container'
            >
              <Image
                src={LoginImage}
                alt='bg login'
                objectFit='contain'
                className='page__login--image'
              />
            </Grid>
            <Grid
              container
              padding={7}
              pb={0}
              maxWidth={600}
              minWidth={100}
              width={'60%'}
              direction='column'
              position='relative'
            >
              <Grid item mb={4}>
                <h2 className='mb-8'>Login</h2>
                <p className='text-is-16'>Guru Academy ADMIN.</p>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column'>
                  <TextField
                    label='Email'
                    type='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={!!formik.errors.email && !!formik.touched.email}
                    helperText={
                      !!formik.errors.email && !!formik.touched.email
                        ? formik.errors.email
                        : ''
                    }
                    className='page__login--input'
                  />
                  <TextField
                    id='outlined-error-helper-text-2'
                    label='Password'
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={
                      !!formik.errors.password && !!formik.touched.password
                    }
                    helperText={
                      !!formik.errors.password && !!formik.touched.password
                        ? formik.errors.password
                        : ''
                    }
                    margin='normal'
                    className='page__login--input'
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{
                      padding: '14px',
                      marginTop: '8px',
                    }}
                  >
                    {userInfo.loading ? (
                      <LoaderBall
                        color1='#ffffff'
                        color2='#eeeeee'
                        color3='#ffffff'
                        color4='#eeeeee'
                        color5='#ffffff'
                        height={20}
                      />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Grid>
              </form>
              <Grid
                item
                className='page__login--image-logo'
                marginTop={'30px'}
                marginBottom={0}
              >
                <Image
                  src={LogoImage}
                  alt='bg login'
                  objectFit='contain'
                  width={100}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
