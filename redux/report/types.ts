export enum REPORT_ACTIONS {
  GET_DASHBOARD_REPORT_REQUEST = 'categories/GET_DASHBOARD_REPORT_REQUEST',
  GET_DASHBOARD_REPORT_SUCCESS = 'categories/GET_DASHBOARD_REPORT_SUCCESS',
  GET_DASHBOARD_REPORT_FAILURE = 'categories/GET_DASHBOARD_REPORT_FAILURE',
}

export type TopCoursesOverviewData = {
  _id: string
  title: string
  author: {
    _id: string
    email: string
    firstName: string
    lastName: string
  }
  topic: {
    _id: string
    title: string
    courseCategoryId: {
      _id: string
      title: string
      status: number
    }
    status: number
  }
  price: number
  discount: number
  status: number
  createdAt: string
  updatedAt: string
  slug: string
  imageUrl: string
  streams?: string[]
  feedback?: string[]
  chapters?: string[]
  learnersNumber?: number
  revenue?: number
  rating?: number
}

export type TopTeachersOverviewData = {
  _id: string
  email: string
  firstName: string
  lastName: string
  status: number
  learnersNumber?: number
  revenue?: number
  coursesNumber?: number
  rating?: number
}

export type ActivityUserOverviewData = {
  socialLinks: {
    facebook: string
    instagram: string
    linkedIn: string
    github: string
    twitter: string
  }
  address: {
    street: string
    city: string
    country: string
  }
  role: {
    id: number
    name: string
  }
  _id: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  status: number
  learningCourses?: string[]
  teachingCourses?: string[]
  createdAt: string
  updatedAt: string
  description: string
  imageUrl: string
  phoneNumber: string
}

export type ActivityCourseOverviewData = {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: {
    _id: string
    email: string
    firstName: string
    lastName: string
    status: number
  }
  topic: {
    _id: string
    title: string
    courseCategoryId: {
      _id: string
      title: string
      status: number
      discountPercent: number
    }
    status: number
    discountPercent: number
  }
  tags: string[]
  price: number
  discount: number
  status: number
  streams: string[]
  feedbacks: string[]
  chapters: string[]
  createdAt: string
  updatedAt: string
  slug: string
}

export type ActivityCourseDetailOverviewData = {
  payment: {
    status: number
    price: number
    brandId: number
    methodId: number
    invoiceId: string
    discount: number
  }
  _id: string
  userId: {
    _id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    imageUrl: string
  }
  courseId: {
    _id: string
    title: string
    description: string
    imageUrl: string
    author: string
    topic: string
    tags: string[]
    price: number
    discount: number
    status: number
    learnersDetail: string[]
    streams: string[]
    feedbacks: string[]
    chapters: string[]
    createdAt: string
    updatedAt: string
    slug: string
    __v: number
  }
  status: number
  createdAt: string
  updatedAt: string
}

export type CourseOverviewFromCategoryTopic = {
  _id: string
  title: string
  description: string
  author: string
  topic: string
  tags: string[]
  price: number
  discount: number
  status: number
  learnersDetail: {
    payment: {
      status: number
      price: number
      brandId: number
      methodId: number
      invoiceId: string
      discount: number
    }
    _id: string
    status: number
    certificate: number
  }[]
  feedbacks: {
    _id: string
    userId: string
    courseId: string
    rating: number
    content: string
    status: number
  }[]
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
  imageUrl: string
}

export type TopicsOverviewReportData = {
  _id: string
  title: string
  courseCategoryId: string
  courses: CourseOverviewFromCategoryTopic[]
  status: number
  discountPercent: number
  slug: string
  __v: number
}

export type CategoriesOverviewReportData = {
  _id: string
  title: string
  topics: TopicsOverviewReportData[]
  status: number
  discountPercent: number
  slug: string
  __v: number
}

export type DashboardReportResponse = {
  top10Courses: {
    byLearners: TopCoursesOverviewData[]
    byRevenue: TopCoursesOverviewData[]
    byRating: TopCoursesOverviewData[]
  }
  top10Teachers: {
    byLearners: TopTeachersOverviewData[]
    byRevenue: TopTeachersOverviewData[]
    byCourses: TopTeachersOverviewData[]
    byRating: TopTeachersOverviewData[]
  }
  newLearners: {
    today: number
    last7days: number
    last14days: number
    last1month: number
    last2months: number
    last3months: number
    last6months: number
    last1year: number
    last2years: number
    total: number
  }
  newTeachers: {
    today: number
    last7days: number
    last14days: number
    last1month: number
    last2months: number
    last3months: number
    last6months: number
    last1year: number
    last2years: number
    total: number
  }
  newCourses: {
    today: number
    last7days: number
    last14days: number
    last1month: number
    last2months: number
    last3months: number
    last6months: number
    last1year: number
    last2years: number
    total: number
  }
  total: {
    learners: number
    activeLearners: number
    pendingLearners: number
    inactiveLearners: number
    bannedLearners: number
    teachers: number
    activeTeachers: number
    pendingTeachers: number
    inactiveTeachers: number
    bannedTeachers: number
    courses: number
    activeCourses: number
    pendingCourses: number
    inactiveCourses: number
    draftCourses: number
    revenue: number
  }
  activities: {
    last10Learners: ActivityUserOverviewData[]
    pendingTeachers: ActivityUserOverviewData[]
    pendingCourses: ActivityCourseOverviewData[]
    last10LearnersRegistered: ActivityCourseDetailOverviewData[]
  }
  revenue: {
    total: number
    today: number
    last7days: number
    last14days: number
    last1month: number
    last2months: number
    last3months: number
    last6months: number
    last1year: number
    last2years: number
  }
  data: {
    activeLearners: ActivityUserOverviewData[]
    activeTeachers: ActivityUserOverviewData[]
    activeCourses: TopCoursesOverviewData[]
    pendingLearners: ActivityUserOverviewData[]
    pendingTeachers: ActivityUserOverviewData[]
    pendingCourses: TopCoursesOverviewData[]
    inactiveLearners: TopCoursesOverviewData[]
    inactiveTeachers: TopCoursesOverviewData[]
    inactiveCourses: TopCoursesOverviewData[]
    bannedLearners: TopCoursesOverviewData[]
    bannedTeachers: TopCoursesOverviewData[]
    draftCourses: TopCoursesOverviewData[]
    learnersData: ActivityUserOverviewData[]
    teacherData: ActivityUserOverviewData[]
    categoriesData: CategoriesOverviewReportData[]
  }
}
