import { CourseStatus } from '@config/constant'
import { UpdateCoursePayload } from '@redux/courses/types'
import * as Yup from 'yup'

export const CourseFormSchema = Yup.object().shape({
  id: Yup.string().optional(),
  title: Yup.string().required('Title is required'),
  slug: Yup.string()
    .required('Slug is required')
    .matches(
      /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
      'Incorrect format! Expect format-of-slug'
    ),
  categoryId: Yup.mixed().required('Category ID is required'),
  topicId: Yup.mixed().required('Topic ID is required'),
  tags: Yup.mixed().optional(),
  description: Yup.string().optional(),
  imageUrl: Yup.mixed().optional(),
  status: Yup.mixed().required('Status is required'),
  price: Yup.number().required('Price is required').min(0),
  discount: Yup.number()
    .required('Discount is required')
    .min(0)
    .max(Yup.ref('price'), 'Discount must be small than or equal to Price')
    .default(0),
})

export type CourseInfoFormType = {
  id: string
  title: string
  slug: string
  categoryId: string
  topicId: string
  tags: string
  description: string
  imageUrl: string
  price: number
  discount: number
  status: number
}

export const getUpdateCoursePayload = (
  formValues: CourseInfoFormType,
  imageUrl?: string
): UpdateCoursePayload => {
  return {
    reloadCourseDetail: true,
    imageUrl: imageUrl ? imageUrl : formValues.imageUrl,
    id: formValues.id,
    title: formValues.title,
    description: formValues.description,
    slug: formValues.slug,
    price: formValues.price,
    discount: formValues.discount,
    topicId: formValues.topicId,
    categoryId: formValues.categoryId,
    status: formValues.status,
    tags: formValues.tags.split(', '),
  }
}

export const statusOptions = [
  { label: 'Inactive', value: CourseStatus.INACTIVE },
  { label: 'Active', value: CourseStatus.ACTIVE },
  { label: 'Pending', value: CourseStatus.PENDING },
  { label: 'Draft', value: CourseStatus.DRAFT },
]
