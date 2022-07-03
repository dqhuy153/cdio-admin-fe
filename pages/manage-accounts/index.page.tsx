/* eslint-disable react-hooks/exhaustive-deps */
import PageWithHeader from '@components/header'
import PageWithSidebar from '@components/layout/PageWithSidebar'
import { useEffect, useState, useMemo } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Table from 'rc-table'
import { AlignType } from 'rc-table/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { getAccountsManagementThunkAction } from '@redux/accounts/thunks'
import moment from 'moment'
import { LoaderBall } from '@components/common'
import { getAccountStatusText } from '@utils/helpers'
import ModalMain from '@components/common/Modal'
import PaginationLink from '@components/PaginationLink'
import { COUNT_PER_PAGE } from '@config/constant'
import AccountForm from './AccountDetailForm'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'Day of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 200,
    align: 'center' as AlignType,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
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
    title: 'Learning Courses',
    dataIndex: 'totalLearningCourses',
    key: 'totalLearningCourses',
    width: 150,
    align: 'center' as AlignType,
  },
  {
    title: 'Teacher Courses',
    dataIndex: 'totalTeachingCourses',
    key: 'totalTeachingCourses',
    width: 150,
    align: 'center' as AlignType,
  },
]

const ManageAccount: NextPage<Props> = ({}) => {
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  const router = useRouter()
  const { page, count } = router.query
  if (!page) query.set('page', '1')
  if (!count) query.set('count', COUNT_PER_PAGE.toString())

  const dispatch = useDispatch()
  const accountsState = useSelector(
    (state: RootState) => state.accountsManagement
  )

  const totalPage = Math.ceil(accountsState.totalUsers / COUNT_PER_PAGE)

  const [showAccountInfoModal, setShowAccountInfoModal] =
    useState<boolean>(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string>('')

  const accountsData = accountsState.users.map(account => ({
    ...account,
    dateOfBirth: moment(account.dateOfBirth).format('DD/MM/YYYY'),
    name: `${account.firstName} ${account.lastName}`,
    role: account.role.name,
    status: getAccountStatusText(account.status),
    key: account._id,
    phoneNumber: account.phoneNumber ? account.phoneNumber : '--',
  }))

  useEffect(() => {
    dispatch(getAccountsManagementThunkAction(query))
  }, [dispatch, query])

  const handleShowAccountInfoModal = () => {
    setShowAccountInfoModal(true)
  }

  const handleCloseAccountInfoModal = () => {
    setShowAccountInfoModal(false)
  }

  const handleRowClick = (record: any, index) => {
    setSelectedAccountId(record._id)
    handleShowAccountInfoModal()
  }

  const handleCreateAccountClick = () => {
    setSelectedAccountId('')
    handleShowAccountInfoModal()
  }

  return (
    <div className='page-account-management'>
      <Head>
        <title>Manage Account</title>
        <meta
          name='description'
          content='Manage account of GuruAcademy ADMIN'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWithSidebar>
        <PageWithHeader title='Account Management'>
          <ModalMain
            open={showAccountInfoModal}
            onClose={handleCloseAccountInfoModal}
            width={600}
            height={500}
            position='flex-start-center'
            preventBackdropClick
            label={'Account Detail'}
          >
            <div className='modal-main'>
              <AccountForm
                accountId={selectedAccountId}
                onClose={handleCloseAccountInfoModal}
                previousQueryUrl={query}
              />
            </div>
          </ModalMain>
          {accountsState.loading && !showAccountInfoModal ? (
            <LoaderBall />
          ) : (
            <Table
              tableLayout='auto'
              scroll={{ y: 'calc(100vh - 310px)' }}
              rowKey={record => record.key}
              columns={columns}
              data={accountsData}
              onRow={(record, index) => ({
                onClick: () => handleRowClick(record, index),
                style: {
                  cursor: 'pointer',
                },
              })}
              footer={_ => (
                <div className='page-account-management--footer'>
                  <PaginationLink
                    totalPage={totalPage}
                    count={COUNT_PER_PAGE}
                  />
                  <div className='page-account-management--button-footer'>
                    <Button
                      onClick={handleCreateAccountClick}
                      className='has-text-warning'
                      variant='outlined'
                    >
                      New Account
                    </Button>
                  </div>
                </div>
              )}
            />
          )}
        </PageWithHeader>
      </PageWithSidebar>
    </div>
  )
}

type Props = {}

export default ManageAccount
