/* eslint-disable react-hooks/exhaustive-deps */
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { useEffect, useMemo } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Table from 'rc-table'
import { AlignType } from 'rc-table/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { getCoursesManagementThunkAction } from '@redux/courses/thunks'
import { LoaderBall } from '@components/common'
import PaginationLink from '@components/PaginationLink'
import { COUNT_PER_PAGE } from '@config/constant'
import { useRouter } from 'next/router'
import { getCourseStatusText } from '@utils/helpers'

const columns = [
  {
    title: 'Course',
    dataIndex: 'title',
    key: 'title',
    width: 200,
  },
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    width: 150,
  },

  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Learners',
    dataIndex: 'totalLearners',
    key: 'totalLearners',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Chapters',
    dataIndex: 'totalChapters',
    key: 'totalChapters',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Streams',
    dataIndex: 'totalStreams',
    key: 'totalStreams',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Feedbacks',
    dataIndex: 'totalFeedbacks',
    key: 'totalFeedbacks',
    width: 100,
    align: 'center' as AlignType,
  },
]

const ManageCourse: NextPage<Props> = ({}) => {
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const router = useRouter()
  const { page, count } = router.query
  if (!page) query.set('page', '1')
  if (!count) query.set('count', COUNT_PER_PAGE.toString())

  const dispatch = useDispatch()
  const courseState = useSelector((state: RootState) => state.coursesManagement)

  const totalPage = Math.ceil(courseState.totalCourses / COUNT_PER_PAGE)

  // const [selectedCourseId, setSelectedCourseId] = useState<string>('')

  const coursesData = courseState.courses.map(course => ({
    ...course,
    category: course.topic.courseCategoryId.title,
    author: course.author.email,
    topic: course.topic.title,
    totalLearners: course.totalLearners,
    totalStreams: course.totalStreams,
    totalFeedbacks: course.totalFeedbacks,
    price: `$${course.price}`,
    discount: `$${course.discount}`,
    status: getCourseStatusText(course.status),
  }))

  useEffect(() => {
    dispatch(getCoursesManagementThunkAction(query))
  }, [dispatch, query])

  const handleRowClick = async (record: any, index) => {
    // setSelectedCourseId(record._id)
    await router.push(`/manage-courses/${record._id}`)
  }

  return (
    <div className='page-course-management'>
      <Head>
        <title>Manage Courses</title>
        <meta
          name='description'
          content='Manage courses to GuruAcademy ADMIN'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Courses Management'>
          {courseState.loading ? (
            <LoaderBall />
          ) : (
            <Table
              tableLayout='auto'
              scroll={{ y: 'calc(100vh - 310px)' }}
              rowKey={record => record._id}
              columns={columns}
              data={coursesData}
              onRow={(record, index) => ({
                onClick: () => handleRowClick(record, index),
                style: {
                  cursor: 'pointer',
                },
              })}
              footer={_ => (
                <PaginationLink totalPage={totalPage} count={COUNT_PER_PAGE} />
              )}
            />
          )}
        </PageWithHeader>
      </PageWithSidebar>
    </div>
  )
}

type Props = {}

export default ManageCourse
