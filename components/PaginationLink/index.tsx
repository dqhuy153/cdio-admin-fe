import React from 'react'
import Pagination from '@mui/material/Pagination'
import { useRouter } from 'next/router'

const PaginationLink: React.FC<Props> = ({
  page = 1,
  count = 50,
  totalPage = 1,
}) => {
  const query = new URLSearchParams(location.search)
  const pageQuery = parseInt(query.get('page') || '1', 10)
  // const countQuery = parseInt(query.get('count') || '50', 10)

  const router = useRouter()

  const handleChange = async (event: React.ChangeEvent<any>, value: number) => {
    query.set('page', value.toString())
    query.set('count', count.toString())
    const url = `${location.pathname}?${query.toString()}`
    await router.push(url)
  }

  return (
    <Pagination
      page={pageQuery || page}
      count={totalPage}
      onChange={handleChange}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  )
}

type Props = {
  page?: number
  count?: number
  totalPage?: number
}

export default PaginationLink
