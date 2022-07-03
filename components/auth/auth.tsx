import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { checkAccessable, getJwt, tokenKey } from '../../utils/auth'
import { LoaderBall } from '@components/common'
import { useDispatch } from 'react-redux'
import {
  getAllDataUserThunkAction,
  logoutThunkAction,
} from '@redux/auth/thunks'

type Token = string | null

const Auth: React.FC<{ children: any; publicPages: string[] }> = ({
  children,
  publicPages,
}) => {
  const path = window.location.pathname
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    void checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkLogin = async () => {
    const token: Token = getJwt()
    setLoading(false)

    if (token && checkAccessable(token)) {
      return dispatch(getAllDataUserThunkAction())
    }

    dispatch(logoutThunkAction())
    await router.replace('/login')
  }

  if (loading) {
    return <LoaderBall showInMiddleOfPage />
  }

  return <>{children}</>
}

export default Auth
