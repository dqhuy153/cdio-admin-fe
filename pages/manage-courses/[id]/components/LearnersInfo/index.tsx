import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { CourseDetailData, learnersDetailData } from '@redux/courses/types'
import {
  formatDateFromApi,
  getFullNameFromFirstAndLastName,
  getStatusText,
  isEmpty,
  paginate,
} from '@utils/helpers'
import { AlignType } from 'rc-table/lib/interface'
import Table from 'rc-table'
import ViewItem from '@components/common/ViewItem'
import { Pagination } from '@mui/material'
import { COUNT_PER_PAGE } from '@config/constant'

interface Props {
  data: CourseDetailData['learnersDetail'] | undefined
}

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    width: 200,
  },

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    width: 150,
    align: 'center' as AlignType,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    align: 'center' as AlignType,
  },
  {
    title: 'Day of Enrollment',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Done',
    dataIndex: 'done',
    key: 'done',
    width: 100,
    align: 'center' as AlignType,
  },
]

const LearnersInfo = ({ data }: Props) => {
  const [learnersTablePage, setLearnersTablePage] = useState<number>(1)

  if (!data || isEmpty(data)) {
    return (
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} className='page-course-detail__course-info--content'>
          <p>No data</p>
        </Grid>
      </Grid>
    )
  }

  const learnersTableTotalPage = Math.ceil(data.length / COUNT_PER_PAGE)

  const learnersData = data.map((learner: learnersDetailData) => {
    return {
      ...learner,
      email: learner.userId?.email || '(Deleted account)',
      payment:
        `$${learner.payment?.price - learner.payment?.discount}` || 'Unknown',
      name: getFullNameFromFirstAndLastName(
        learner.userId?.firstName,
        learner.userId?.lastName
      ),
      status: getStatusText(learner.status),
      createdAt: formatDateFromApi(learner.createdAt),
      done: learner.isDone ? 'Yes' : 'No',
    }
  })

  const paginationLearnersData = paginate(
    learnersData,
    COUNT_PER_PAGE,
    learnersTablePage
  )

  const totalPayment = data
    .map(learner => learner?.payment?.price - learner?.payment?.discount)
    .reduce((total, price) => total + price)
  const totalLearners = data?.length
  const bannedLearners = data?.filter(learner => learner?.status === 0).length
  const learningLearners =
    data?.filter(learner => !learner?.isDone).length - bannedLearners
  const doneLearners = totalLearners - learningLearners - bannedLearners

  const handleRowClick =  (record: any, index) => {
    // setSelectedCourseId(record._id)
    // await router.push(`/manage-courses/${record._id}`)
  }

  const handlePaginationChange = (_, page: number) => {
    setLearnersTablePage(page)
  }

  return (
    <Grid container>
      <Grid item xs={12} className='page-course-detail__course-info--content'>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <ViewItem label='Learners' value={totalLearners} />
          </Grid>
          <Grid item xs={2}>
            <ViewItem label='Learning Learners' value={learningLearners} />
          </Grid>
          <Grid item xs={2}>
            <ViewItem label='Done Learners' value={doneLearners} />
          </Grid>
          <Grid item xs={2}>
            <ViewItem label='Banned Learners' value={bannedLearners} />
          </Grid>
          <Grid item xs={2}>
            <ViewItem
              label='Total Payment'
              value={`$${totalPayment.toFixed(2)}`}
            />
          </Grid>
          <Grid item xs={2}>
            <ViewItem
              label='Actually Earning (80%)'
              value={`$${(totalPayment * 0.8).toFixed(2)}`}
            />
          </Grid>
          <Grid item xs={12}>
            <Table
              tableLayout='auto'
              scroll={{ y: 'calc(100vh - 310px)' }}
              rowKey={record => record._id}
              columns={columns}
              data={paginationLearnersData}
              onRow={(record, index) => ({
                onClick: () => handleRowClick(record, index),
                style: {
                  cursor: 'pointer',
                },
              })}
              footer={_ => (
                <Pagination
                  page={learnersTablePage}
                  count={learnersTableTotalPage}
                  onChange={handlePaginationChange}
                  style={{ display: 'flex', justifyContent: 'center' }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LearnersInfo
