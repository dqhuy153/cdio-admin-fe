import * as Yup from 'yup'
import { CommonStatus } from '@config/constant'
import { UpdateAttachmentPayload } from '@redux/chapters/types'

export const AttachmentFormSchema = Yup.object().shape({
  id: Yup.string().optional(),
  title: Yup.string().required('Title is required'),
  slug: Yup.string()
    .required('Slug is required')
    .matches(
      /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
      'Incorrect format! Expect format-of-slug'
    ),
  description: Yup.string().optional(),
  status: Yup.mixed().required('Status is required'),
})

export type AttachmentInfoFormType = {
  id: string
  title: string
  slug: string
  description: string
  number: number
  status: number
}

export const getUpdateAttachmentPayload = (
  formValues: AttachmentInfoFormType & { chapterId?: string; courseId?: string }
): UpdateAttachmentPayload => {
  return {
    id: formValues.id,
    title: formValues.title,
    description: formValues.description,
    slug: formValues.slug,
    status: formValues.status,
    chapterId: formValues.chapterId || undefined,
    courseId: formValues.courseId || undefined,
  }
}

export const statusOptions = [
  { label: 'Inactive', value: CommonStatus.INACTIVE },
  { label: 'Active', value: CommonStatus.ACTIVE },
]
