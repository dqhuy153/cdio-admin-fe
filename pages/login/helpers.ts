import * as Yub from 'yup'

export const loginSchema = Yub.object().shape({
  email: Yub.string().required('Email is required!').email('Email is invalid!'),
  password: Yub.string().required('Password is required!'),
})
