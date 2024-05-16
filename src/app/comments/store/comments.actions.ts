import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {CommentInterface} from '../types/comment.interface'

export const commentActions = createActionGroup({
  source: 'comment',
  events: {
    Load: emptyProps(),
    'Load success': props<{comments: CommentInterface[]}>(),
    'Load failure': emptyProps(),
    Create: props<{request: CommentInterface}>(),
    'Create success': props<{comment: CommentInterface}>(),
    'Create failure': emptyProps(),
    Update: props<{request: CommentInterface}>(),
    'Update success': props<{comment: CommentInterface}>(),
    'Update failure': emptyProps(),
    Reply: props<{request: CommentInterface}>(),
    'Reply success': props<{comment: CommentInterface}>(),
    'Reply failure': emptyProps(),
    Delete: props<{id: number}>(),
    'Delete success': props<{comment: CommentInterface}>(),
    'Delete failure': emptyProps(),
  },
})
