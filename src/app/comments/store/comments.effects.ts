import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs'
import {CommentsService} from '../services/comments.service'
import {CommentInterface} from '../types/comment.interface'
import {commentActions} from './comments.actions'

export const loadComments = createEffect(
  (actions$ = inject(Actions), commentsService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.load),
      exhaustMap(() =>
        commentsService.get().pipe(
          map((comments) => commentActions.loadSuccess({comments})),
          catchError(() => of(commentActions.loadFailure())),
        ),
      ),
    )
  },
  {functional: true},
)

export const createComment = createEffect(
  (actions$ = inject(Actions), commentsService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.create),
      switchMap(({request}) => {
        return commentsService.create(request).pipe(
          map((comment: CommentInterface) =>
            commentActions.createSuccess({comment}),
          ),
          catchError(() => of(commentActions.createFailure())),
        )
      }),
    )
  },
  {functional: true},
)

export const updateComment = createEffect(
  (actions$ = inject(Actions), commentsService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.update),
      switchMap(({request}) => {
        return commentsService.update(request).pipe(
          map((comment: CommentInterface) =>
            commentActions.updateSuccess({comment}),
          ),
          catchError(() => of(commentActions.updateFailure())),
        )
      }),
    )
  },
  {functional: true},
)

export const deleteComment = createEffect(
  (actions$ = inject(Actions), commentsService = inject(CommentsService)) => {
    return actions$.pipe(
      ofType(commentActions.delete),
      switchMap(({id}) => {
        return commentsService.delete(id).pipe(
          map((comment: CommentInterface) =>
            commentActions.deleteSuccess({comment}),
          ),
          catchError(() => of(commentActions.deleteFailure())),
        )
      }),
    )
  },
  {functional: true},
)
