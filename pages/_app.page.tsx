import React from 'react'
import { ToastContainer } from 'react-toastify'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../redux/store'
import { Provider } from 'react-redux'
import { NoSsr, ThemeProvider } from '@material-ui/core'

import theme from '../styles/theme'
import Layout from '../components/layout/Layout'
import 'react-toastify/dist/ReactToastify.css'
import 'react-phone-number-input/style.css'
import '../styles/scss/styles.scss'

const MyApp = ({ Component, pageProps, store }: any) => {
  const getPaths = (paths: string[]) => {
    const newPaths: string[] = []

    paths.map((path: any) => {
      if (path === '/') {
        newPaths.push(path)

        return
      }
      newPaths.push(path)
    })

    return newPaths
  }

  const publicPages = getPaths(['login'])
  const withoutLayoutPaths = getPaths([])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NoSsr>
          <ToastContainer />
          <Layout withoutPaths={withoutLayoutPaths} publicPages={publicPages}>
            <Component {...pageProps} />
          </Layout>
        </NoSsr>
      </ThemeProvider>
    </Provider>
  )
}

export default withRedux(makeStore)(MyApp)
