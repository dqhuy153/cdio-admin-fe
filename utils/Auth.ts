import jwtDecode from 'jwt-decode'
import { UserRole, UserStatus } from '@config/constant'
import { DecodedTokenData } from '@redux/types'

export const tokenKey = 'Guru-admin-auth'

export const isRootOrAdmin = (roleId: number) =>
  roleId === UserRole.ADMIN.id || roleId === UserRole.ROOT.id

export const accessableStatus = (userStatus: number) =>
  userStatus === UserStatus.ACTIVE

export const checkAccessable = (jwt: string) => {
  try {
    const decoded: DecodedTokenData = jwtDecode(jwt)

    return isRootOrAdmin(decoded.role.id) && accessableStatus(decoded.status)
  } catch (error) {
    return false
  }
}

export function loginWithJwt(jwt: string) {
  const decoded: DecodedTokenData = jwtDecode(jwt)

  if (!checkAccessable(jwt)) {
    throw new Error(
      'Access denied! Please try another account or contact us for support!'
    )
  }

  localStorage.setItem('roleId', decoded.role.id.toString())
  localStorage.setItem('role', decoded.role.name.toString())
  localStorage.setItem('firstName', decoded.firstName)
  localStorage.setItem('lastName', decoded.lastName)
  localStorage.setItem('email', decoded.email)
  localStorage.setItem('imageUrl', decoded.imageUrl || '')
  localStorage.setItem(tokenKey, jwt)
}

export function logout() {
  localStorage.removeItem(tokenKey)
  localStorage.removeItem('roleId')
  localStorage.removeItem('role')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  localStorage.removeItem('email')
  localStorage.removeItem('imageUrl')

  window.location.replace('/login')
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export function getRoleId() {
  return localStorage.getItem('roleId')
}

export function getFullName() {
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')

  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }

  if (firstName && !lastName) {
    return firstName
  }

  return ''
}
