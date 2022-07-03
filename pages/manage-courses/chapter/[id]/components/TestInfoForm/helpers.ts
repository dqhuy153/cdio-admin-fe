import * as Yup from 'yup'
import { CommonStatus } from '@config/constant'
import { TestQuestionData, UpdateTestPayload } from '@redux/chapters/types'

export const TestFormSchema = Yup.object().shape({
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
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('Question is required'),
      a: Yup.string().required('Answer A is required'),
      b: Yup.string().required('Answer B is required'),
      c: Yup.string().optional(),
      d: Yup.string().optional(),
      e: Yup.string().optional(),
      answer: Yup.string()
        .required('Answer is required')
        .typeError('Answer is required'),
    })
  ),
})

export type TestInfoFormType = {
  id: string
  title: string
  slug: string
  description: string
  status: number
  questions: TestQuestionData[]
}

export const getUpdateTestPayload = (
  formValues: TestInfoFormType & { chapterId?: string; courseId?: string }
): UpdateTestPayload => {
  return {
    id: formValues.id,
    title: formValues.title,
    description: formValues.description,
    slug: formValues.slug,
    status: formValues.status,
    questions: formValues.questions,
    chapterId: formValues.chapterId || undefined,
    courseId: formValues.courseId || undefined,
  }
}

export const statusOptions = [
  { label: 'Inactive', value: CommonStatus.INACTIVE },
  { label: 'Active', value: CommonStatus.ACTIVE },
]
