import { Grid } from '@mui/material'
import { LessonOverviewData } from '@redux/chapters/types'
import { getStatusText } from '@utils/helpers'
import Table from 'rc-table'
import { AlignType } from 'rc-table/lib/interface'
import React, { Fragment } from 'react'

interface Props {
  lessonsData: LessonOverviewData[]
}

const columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    width: 500,
  },
  {
    title: 'Tests',
    dataIndex: 'tests',
    key: 'tests',
    width: 100,
    align: 'center' as AlignType,
  },

  {
    title: 'Attachments',
    dataIndex: 'attachments',
    key: 'attachments',
    width: 100,
    align: 'center' as AlignType,
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
    key: 'comments',
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
]

const LessonsInfo: React.FC<Props> = ({ lessonsData }) => {
  const lessonsDataTable = lessonsData.map((lessonData, idx) => {
    return {
      ...lessonData,
      title: `${idx + 1}. ${lessonData.title}`,
      tests: lessonData.tests.length,
      attachments: lessonData.attachments.length,
      comments: lessonData.comments.length,
      status: getStatusText(lessonData.status),
    }
  })

  const handleRowClick = (record: any, index) => {
    // setSelectedCourseId(record._id)
    // await router.push(`/manage-courses/${record._id}`)
  }

  return (
    <Table
      tableLayout='auto'
      scroll={{ y: 'calc(100vh - 310px)' }}
      rowKey={record => record._id}
      columns={columns}
      data={lessonsDataTable}
      onRow={(record, index) => ({
        onClick: () => handleRowClick(record, index),
        style: {
          cursor: 'pointer',
        },
      })}
    />
  )
}

export default LessonsInfo
