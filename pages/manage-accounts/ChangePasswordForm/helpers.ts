import * as Yup from 'yup'

export type ChangePasswordFormType = {
  newPassword: string
  confirmPassword: string
}

export const ChangePasswordFormSchema = Yup.object().shape({
  newPassword: Yup.string().required().min(5),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match'
  ),
})
