import { UserRole, UserStatus } from '@config/constant'
import {
  CreateAccountPayload,
  UpdateAccountPayload,
} from '@redux/accounts/types'
import * as Yup from 'yup'

export const AccountFormSchema = Yup.object().shape({
  id: Yup.string().optional(),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  street: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().optional(),
  dateOfBirth: Yup.date().optional().max(new Date()),
  phoneNumber: Yup.string().optional(),
  description: Yup.string().optional(),
  imageUrl: Yup.string().optional(),
  roleId: Yup.mixed().required('Role is required'),
  facebook: Yup.string().optional().url('Invalid url'),
  twitter: Yup.string().optional().url('Invalid url'),
  instagram: Yup.string().optional().url('Invalid url'),
  linkedIn: Yup.string().optional().url('Invalid url'),
  github: Yup.string().optional().url('Invalid url'),
  status: Yup.mixed().required('Status is required'),
  newPassword: Yup.string().when('id', {
    is: '' || null || undefined,
    then: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
    otherwise: Yup.string().optional(),
  }),
  confirmPassword: Yup.string().when('id', {
    is: '' || null || undefined,
    then: Yup.string()
      .required()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    otherwise: Yup.string().optional(),
  }),
})

export type AccountFormType = {
  id: string
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  country: string
  dateOfBirth: string | Date
  phoneNumber: string
  description: string
  imageUrl: string
  roleId: number
  facebook: string
  twitter: string
  instagram: string
  linkedIn: string
  github: string
  status: number
  newPassword: string
  confirmPassword: string
}

export const getUpdateAccountPayload = (
  formValues: AccountFormType,
  imageUrl?: string
): UpdateAccountPayload => {
  return {
    userId: formValues.id,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    dateOfBirth: formValues.dateOfBirth,
    address: {
      street: formValues.street,
      city: formValues.city,
      country: formValues.country,
    },
    role: formValues.roleId,
    description: formValues.description,
    imageUrl: imageUrl || '',
    socialLinks: {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      instagram: formValues.instagram,
      linkedIn: formValues.linkedIn,
      github: formValues.github,
    },
    status: formValues.status,
    phoneNumber: formValues.phoneNumber,
  }
}

export const getCreateAccountPayload = (
  formValues: AccountFormType,
  imageUrl?: string
): CreateAccountPayload => {
  return {
    email: formValues.email,
    newPassword: formValues.newPassword,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    dateOfBirth: formValues.dateOfBirth,
    address: {
      street: formValues.street,
      city: formValues.city,
      country: formValues.country,
    },
    role: formValues.roleId,
    description: formValues.description,
    imageUrl: imageUrl || '',
    socialLinks: {
      facebook: formValues.facebook,
      twitter: formValues.twitter,
      instagram: formValues.instagram,
      linkedIn: formValues.linkedIn,
      github: formValues.github,
    },
    status: formValues.status,
    phoneNumber: formValues.phoneNumber,
  }
}

export const roleOptions = [
  { label: 'Admin', value: UserRole.ADMIN.id },
  { label: 'Teacher', value: UserRole.TEACHER.id },
  { label: 'Learner', value: UserRole.LEARNER.id },
]

export const statusOptions = [
  { label: 'Inactive', value: UserStatus.INACTIVE },
  { label: 'Active', value: UserStatus.ACTIVE },
  { label: 'Pending', value: UserStatus.PENDING },
  { label: 'Banned', value: UserStatus.BANNED },
]
