import { LoaderBall } from '@components/common'
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { RootState } from '@redux/rootReducer'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useSelector } from 'react-redux'

const BrowseCourse: NextPage = () => {
  const courseState = useSelector((state: RootState) => state.coursesManagement)

  return (
    <div className='cmp-page'>
      <Head>
        <title>Browse Courses</title>
        <meta
          name='description'
          content='Brows courses with GuruAcademy ADMIN'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Browse Courses'>
          {courseState.loading ? <LoaderBall /> : <h1>Abc</h1>}
        </PageWithHeader>
      </PageWithSidebar>
    </div>
  )
}

export default BrowseCourse
