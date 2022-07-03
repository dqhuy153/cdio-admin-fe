import { ChapterManagementState } from './../types'
import { CHAPTER_ACTIONS } from './types'

const initialState: ChapterManagementState = {
  chapter: null,
  error: '',
  loading: false,
  lessonLoading: false,
  testLoading: false,
  attachmentLoading: false,
  commentLoading: false,
}

// tslint:disable-next-line: cyclomatic-complexity
export const chapterManagement = (
  state = initialState,
  action: any
): ChapterManagementState => {
  switch (action.type) {
    //-----------get chapter-----------------
    case CHAPTER_ACTIONS.GET_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHAPTER_ACTIONS.GET_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        chapter: action.payload.chapter,
      }
    case CHAPTER_ACTIONS.GET_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------update chapter-----------------
    case CHAPTER_ACTIONS.UPDATE_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHAPTER_ACTIONS.UPDATE_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.UPDATE_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------delete chapter-----------------
    case CHAPTER_ACTIONS.DELETE_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHAPTER_ACTIONS.DELETE_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.DELETE_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    //-----------update lesson-----------------
    case CHAPTER_ACTIONS.UPDATE_LESSON_REQUEST:
      return {
        ...state,
        lessonLoading: true,
      }
    case CHAPTER_ACTIONS.UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        lessonLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.UPDATE_LESSON_FAILURE:
      return {
        ...state,
        lessonLoading: false,
        error: action.error,
      }
    //-----------deleteLesson-----------------
    case CHAPTER_ACTIONS.DELETE_LESSON_REQUEST:
      return {
        ...state,
        lessonLoading: true,
      }
    case CHAPTER_ACTIONS.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessonLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.DELETE_LESSON_FAILURE:
      return {
        ...state,
        lessonLoading: false,
        error: action.error,
      }
    //-----------updateTest-----------------
    case CHAPTER_ACTIONS.UPDATE_TEST_REQUEST:
      return {
        ...state,
        testLoading: true,
      }
    case CHAPTER_ACTIONS.UPDATE_TEST_SUCCESS:
      return {
        ...state,
        testLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.UPDATE_TEST_FAILURE:
      return {
        ...state,
        testLoading: false,
        error: action.error,
      }
    //-----------deleteTest-----------------
    case CHAPTER_ACTIONS.DELETE_TEST_REQUEST:
      return {
        ...state,
        testLoading: true,
      }
    case CHAPTER_ACTIONS.DELETE_TEST_SUCCESS:
      return {
        ...state,
        testLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.DELETE_TEST_FAILURE:
      return {
        ...state,
        testLoading: false,
        error: action.error,
      }
    //-----------updateAttachment-----------------
    case CHAPTER_ACTIONS.UPDATE_ATTACHMENT_REQUEST:
      return {
        ...state,
        attachmentLoading: true,
      }
    case CHAPTER_ACTIONS.UPDATE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        attachmentLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.UPDATE_ATTACHMENT_FAILURE:
      return {
        ...state,
        attachmentLoading: false,
        error: action.error,
      }
    //-----------deleteAttachment-----------------
    case CHAPTER_ACTIONS.DELETE_ATTACHMENT_REQUEST:
      return {
        ...state,
        attachmentLoading: true,
      }
    case CHAPTER_ACTIONS.DELETE_ATTACHMENT_SUCCESS:
      return {
        ...state,
        attachmentLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.DELETE_ATTACHMENT_FAILURE:
      return {
        ...state,
        attachmentLoading: false,
        error: action.error,
      }
    //-----------updateComment-----------------
    case CHAPTER_ACTIONS.UPDATE_COMMENT_REQUEST:
      return {
        ...state,
        commentLoading: true,
      }
    case CHAPTER_ACTIONS.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        error: action.error,
      }
    //-----------deleteComment-----------------
    case CHAPTER_ACTIONS.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        commentLoading: true,
      }
    case CHAPTER_ACTIONS.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        error: '',
      }
    case CHAPTER_ACTIONS.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        error: action.error,
      }

    default:
      return state
  }
}
