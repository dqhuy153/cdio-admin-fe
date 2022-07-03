// all reducers no need to export with default option
import { combineReducers } from 'redux'
import { userInfo } from './auth/reducers'
import { accountsManagement } from './accounts/reducers'
import { coursesManagement } from './courses/reducers'
import { categoriesManagement } from './categories/reducers'
import { chapterManagement } from './chapters/reducers'
import { filesReducers as files } from './files/reducers'
import { reportManagement } from './report/reducers'

const rootReducer = combineReducers({
  userInfo,
  accountsManagement,
  coursesManagement,
  categoriesManagement,
  chapterManagement,
  files,
  reportManagement,
})

export default rootReducer
// type of combine reducer
export type RootState = ReturnType<typeof rootReducer>
