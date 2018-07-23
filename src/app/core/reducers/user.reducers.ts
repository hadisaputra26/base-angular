import { ActionReducer, Action } from '@ngrx/store';
import * as actions from './user.actions';
import { User } from '../../main/content/users/user.model';

export function reducer(state: User = null, action: actions.UserChangeAction) {
  switch (action.type) {
    case actions.USERCHANGE:
      return action.payload;
    default:
      return state;
  }
}