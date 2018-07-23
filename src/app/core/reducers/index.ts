import { User } from "../../main/content/users/user.model";
import * as fromUser from './user.reducers';

export interface State {
  user: User;
}

export const reducers = {
  user: fromUser.reducer,
};

export const getUser = (state: State) => state.user;
