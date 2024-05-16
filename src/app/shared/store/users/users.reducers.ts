import {createFeature, createReducer, on} from '@ngrx/store'
import {UserInterface} from '../../types/user.interface'
import {userActions} from './users.actions'

interface State {
  isLoading: boolean
  currentUser: UserInterface | null | undefined
}

const initialState: State = {
  isLoading: false,
  currentUser: undefined,
}

export const userFeature = createFeature({
  name: 'userFeature',
  reducer: createReducer(
    initialState,
    on(userActions.currentUser, (state: any) => ({
      ...state,
      isLoading: true,
    })),
    on(userActions.currentUserSuccess, (state: any, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
  ),
})
