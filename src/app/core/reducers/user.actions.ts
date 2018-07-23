import { User } from './../../main/content/users/user.model';
import { Action } from "@ngrx/store";

export const USERCHANGE = 'User Change';

export class UserChangeAction implements Action {
  type = USERCHANGE;
  constructor(public payload: User) { }
}