import {
  CategoriesOverviewReportData,
  DashboardReportResponse,
} from '@redux/report/types'
import {
  getDateXDaysAgo,
  getDateXMonthsAgo,
  getDateXYearsAgo,
} from '@utils/helpers'

type SelectOverviewBoxData = {
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

export const getPercentageForOverviewBox = (
  lastSmallDateNumber: number,
  lastBiggerDateNumber: number
): number => {
  //use case: ex: last 7 days has value is 10, last 14 days has value is 15
  //return percentage from last 7 day
  if (!lastSmallDateNumber || !lastBiggerDateNumber) {
    return 0
  }

  if (lastSmallDateNumber === 0) {
    return -100
  }

  if (lastBiggerDateNumber === 0) {
    return 0
  }

  if (lastSmallDateNumber === lastBiggerDateNumber) {
    return 100
  }

  const lastSmallDateNumberBefore = lastBiggerDateNumber - lastSmallDateNumber

  return (
    ((lastSmallDateNumber - lastSmallDateNumberBefore) /
      lastSmallDateNumberBefore) *
    100
  )
}

export const getSelectOverviewBoxOptions = (
  data: SelectOverviewBoxData,
  prefix?: string | null | undefined
) => {
  return [
    {
      id: 'today',
      label: 'Today',
      percentage: 0,
      value: `${prefix ? prefix : ''}${data.today ?? '--'}`,
    },
    {
      id: 'd7',
      label: 'From last 7 days',
      percentage: getPercentageForOverviewBox(data.last7days, data.last14days),
      value: `${prefix ?? ''}${data.last7days ?? '--'}`,
    },
    {
      id: 'm1',
      label: 'From last 1 month',
      percentage: getPercentageForOverviewBox(
        data.last1month,
        data.last2months
      ),
      value: `${prefix ?? ''}${data.last1month ?? '--'}`,
    },
    {
      id: 'm3',
      label: 'From last 3 months',
      percentage: getPercentageForOverviewBox(
        data.last3months,
        data.last6months
      ),
      value: `${prefix ?? ''}${data.last3months ?? '--'}`,
    },
    {
      id: 'm6',
      label: 'From last 6 months',
      percentage: getPercentageForOverviewBox(data.last6months, data.last1year),
      value: `${prefix ?? ''}${data.last6months ?? '--'}`,
    },
    {
      id: 'y1',
      label: 'From last 1 year',
      percentage: getPercentageForOverviewBox(data.last1year, data.last2years),
      value: `${prefix ?? ''}${data.last1year ?? '--'}`,
    },
    {
      id: 'total',
      label: 'Total',
      percentage: 0,
      value: `${prefix ?? ''}${data.total ?? '--'}`,
    },
  ]
}

export const getLineChartNewsCoursesAndUsersData = (
  dashboardData: DashboardReportResponse | null
) => {
  if (!dashboardData) return []
  const learnersData = dashboardData?.newLearners
  const coursesData = dashboardData?.newCourses
  const teachersData = dashboardData?.newTeachers

  return [
    {
      id: 'learners',
      color: '#00378f',
      data: [
        {
          x: '2 years ago',
          y: learnersData?.last2years - learnersData?.last1year ?? 0,
        },
        {
          x: getDateXYearsAgo(1),
          y: learnersData?.last1year - learnersData?.last6months ?? 0,
        },
        {
          x: getDateXMonthsAgo(6),
          y: learnersData?.last6months - learnersData?.last3months ?? 0,
        },
        {
          x: getDateXMonthsAgo(3),
          y: learnersData?.last3months - learnersData?.last2months ?? 0,
        },
        {
          x: getDateXMonthsAgo(2),
          y: learnersData?.last2months - learnersData?.last1month ?? 0,
        },
        {
          x: getDateXMonthsAgo(1),
          y: learnersData?.last1month - learnersData?.last14days ?? 0,
        },
        {
          x: getDateXDaysAgo(14),
          y: learnersData?.last14days - learnersData?.last7days ?? 0,
        },
        {
          x: getDateXDaysAgo(7),
          y: learnersData?.last7days ?? 0,
        },
        {
          x: 'Today',
          y: learnersData?.today ?? 0,
        },
      ],
    },
    {
      id: 'teachers',
      color: 'hsl(199, 70%, 50%)',
      data: [
        {
          x: '2 years ago',
          y: teachersData?.last2years - teachersData?.last1year ?? 0,
        },
        {
          x: getDateXYearsAgo(1),
          y: teachersData?.last1year - teachersData?.last6months ?? 0,
        },
        {
          x: getDateXMonthsAgo(6),
          y: teachersData?.last6months - teachersData?.last3months ?? 0,
        },
        {
          x: getDateXMonthsAgo(3),
          y: teachersData?.last3months - teachersData?.last2months ?? 0,
        },
        {
          x: getDateXMonthsAgo(2),
          y: teachersData?.last2months - teachersData?.last1month ?? 0,
        },
        {
          x: getDateXMonthsAgo(1),
          y: teachersData?.last1month - teachersData?.last14days ?? 0,
        },
        {
          x: getDateXDaysAgo(14),
          y: teachersData?.last14days - teachersData?.last7days ?? 0,
        },
        {
          x: getDateXDaysAgo(7),
          y: teachersData?.last7days ?? 0,
        },
        {
          x: 'Today',
          y: teachersData?.today ?? 0,
        },
      ],
    },
    {
      id: 'courses',
      color: 'hsl(80, 70%, 50%)',
      data: [
        {
          x: '2 years ago',
          y: coursesData?.last2years - coursesData?.last1year ?? 0,
        },
        {
          x: getDateXYearsAgo(1),
          y: coursesData?.last1year - coursesData?.last6months ?? 0,
        },
        {
          x: getDateXMonthsAgo(6),
          y: coursesData?.last6months - coursesData?.last3months ?? 0,
        },
        {
          x: getDateXMonthsAgo(3),
          y: coursesData?.last3months - coursesData?.last2months ?? 0,
        },
        {
          x: getDateXMonthsAgo(2),
          y: coursesData?.last2months - coursesData?.last1month ?? 0,
        },
        {
          x: getDateXMonthsAgo(1),
          y: coursesData?.last1month - coursesData?.last14days ?? 0,
        },
        {
          x: getDateXDaysAgo(14),
          y: coursesData?.last14days - coursesData?.last7days ?? 0,
        },
        {
          x: getDateXDaysAgo(7),
          y: coursesData?.last7days ?? 0,
        },
        {
          x: 'Today',
          y: coursesData?.today ?? 0,
        },
      ],
    },
  ]
}

export const getLineChartRevenueData = (
  data?: DashboardReportResponse['revenue']
) => {
  if (!data) return []

  return [
    {
      id: 'revenue',
      color: '#00378f',
      data: [
        {
          x: '2 years ago',
          y: data?.last2years - data?.last1year ?? 0,
        },
        {
          x: getDateXYearsAgo(1),
          y: data?.last1year - data?.last6months ?? 0,
        },
        {
          x: getDateXMonthsAgo(6),
          y: data?.last6months - data?.last3months ?? 0,
        },
        {
          x: getDateXMonthsAgo(3),
          y: data?.last3months - data?.last2months ?? 0,
        },
        {
          x: getDateXMonthsAgo(2),
          y: data?.last2months - data?.last1month ?? 0,
        },
        {
          x: getDateXMonthsAgo(1),
          y: data?.last1month - data?.last14days ?? 0,
        },
        {
          x: getDateXDaysAgo(14),
          y: data?.last14days - data?.last7days ?? 0,
        },
        {
          x: getDateXDaysAgo(7),
          y: data?.last7days ?? 0,
        },
        {
          x: 'Today',
          y: data?.today ?? 0,
        },
      ],
    },
  ]
}

export const getCategoryPieChartData = (
  categoriesData?: CategoriesOverviewReportData[]
) => {
  //get total revenue of each category
  return categoriesData?.map(category => ({
    id: category.title,
    label: category.title ?? '--',
    value: category.topics?.reduce(
      (acc, topic) =>
        acc +
        topic.courses?.reduce(
          (acc1, course) =>
            acc1 +
            course.learnersDetail?.reduce(
              (acc2, learner) => acc2 + learner.payment.price,
              0
            ),
          0
        ),
      0
    ),
  }))
}

export const getTopicsPieChartData = (
  categoriesData?: CategoriesOverviewReportData[]
) => {
  // return categoriesData?.map(category => ({

  return [
    {
      country: 'AD',
      'hot dog': 146,
      'hot dogColor': 'hsl(135, 70%, 50%)',
      burger: 149,
      burgerColor: 'hsl(36, 70%, 50%)',
      sandwich: 10,
      sandwichColor: 'hsl(173, 70%, 50%)',
      kebab: 138,
      kebabColor: 'hsl(113, 70%, 50%)',
      fries: 50,
      friesColor: 'hsl(41, 70%, 50%)',
      donut: 150,
      donutColor: 'hsl(283, 70%, 50%)',
    },
  ]
}
