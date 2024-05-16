import {createFeature, createReducer, on} from '@ngrx/store'
import {CommentInterface} from '../types/comment.interface'
import {commentActions} from './comments.actions'

interface State {
  isLoading: boolean
  comment: CommentInterface | null | undefined
  comments: CommentInterface[]
}

const initialState: State = {
  isLoading: false,
  comment: undefined,
  comments: [],
}

export const commentFeature = createFeature({
  name: 'commentFeature',
  reducer: createReducer(
    initialState,
    on(commentActions.load, (state: any) => ({
      ...state,
      isLoading: true,
    })),
    on(commentActions.loadSuccess, (state: any, action) => ({
      ...state,
      isLoading: false,
      comments: [...action.comments],
    })),
    on(commentActions.create, (state: any) => ({
      ...state,
      isLoading: true,
    })),
    on(commentActions.createSuccess, (state: any, action) => ({
      ...state,
      isLoading: false,
      // comment: action.comment,
      comments: [action.comment, ...state.comments],
    })),
    on(commentActions.update, (state: any) => ({
      ...state,
      isLoading: true,
    })),
    on(commentActions.updateSuccess, (state: any, action) => {
      const data = state.comments.map((o: CommentInterface) => {
        return o.id === action.comment.id ? action.comment : o
      })
      return {
        ...state,
        isLoading: false,
        comments: data,
      }
    }),
    on(commentActions.delete, (state: any) => ({
      ...state,
      isLoading: true,
    })),
    on(commentActions.deleteSuccess, (state: any, action) => {
      const data = state.comments.filter(
        (o: CommentInterface) => o.id !== action.comment.id,
      )

      return {
        ...state,
        isLoading: false,
        comments: data,
      }
    }),
  ),
})

/* export const {
  name: commentCreateFeatureKey,
  reducer: commentCreateReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectComment,
} = commentCreateFeature */
