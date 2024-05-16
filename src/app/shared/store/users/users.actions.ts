import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {UserInterface} from '../../types/user.interface'

export const userActions = createActionGroup({
  source: 'user',
  events: {
    'Current user': emptyProps(),
    'Current user success': props<{user: UserInterface}>(),
    'Current user failure': emptyProps(),
  },
})
