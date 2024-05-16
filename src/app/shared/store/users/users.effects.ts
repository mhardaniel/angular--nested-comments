import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, exhaustMap, map, of} from 'rxjs'
import {UserService} from '../../services/user.service'
import {userActions} from './users.actions'

export const currentUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.currentUser),
      exhaustMap(() =>
        userService.get().pipe(
          map((user) => userActions.currentUserSuccess({user})),
          catchError(() => of(userActions.currentUserFailure())),
        ),
      ),
    )
  },
  {functional: true},
)
