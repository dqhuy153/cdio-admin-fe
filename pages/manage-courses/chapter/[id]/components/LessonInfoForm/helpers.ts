import * as Yup from 'yup'
import { CommonStatus } from '@config/constant'
import { UpdateLessonPayload } from '@redux/chapters/types'

export const LessonInfoFormSchema = Yup.object().shape({
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

export type LessonInfoFormType = {
  id: string
  title: string
  slug: string
  description: string
  status: number
}

export const getUpdateLessonPayload = (
  formValues: LessonInfoFormType & {
    courseId?: string | null | undefined
    chapterId?: string | null | undefined
    tests: string[]
    attachments: string[]
  }
): UpdateLessonPayload => {
  return {
    courseId: formValues.courseId || undefined,
    chapterId: formValues.chapterId || undefined,
    id: formValues.id,
    title: formValues.title,
    description: formValues.description,
    slug: formValues.slug,
    status: formValues.status,
    tests: formValues.tests,
    attachments: formValues.attachments,
  }
}

export const statusOptions = [
  { label: 'Inactive', value: CommonStatus.INACTIVE },
  { label: 'Active', value: CommonStatus.ACTIVE },
]
