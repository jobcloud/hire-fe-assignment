// users.reducer.ts
export interface State {
  users: User[];
  query: string;
  filteredUsers: User[];
}

const initialState: State = {
  users: [],
  query: '',
  filteredUsers: [],
};

export const featureKey = 'users';

export const reducer = createReducer(
  initialState,
  on(UsersApiActions.usersLoadedSuccess, (state, { users }) => ({
    ...state,
    users,
    filteredUsers: users,
  })),
  on(UsersPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query,
    filteredUsers: state.users.filter((user) => user.name.includes(query)),
  }))
);

// users.selectors.ts
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.featureKey
);

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectQuery = createSelector(
  selectUsersState,
  (state) => state.query
);

export const selectFilteredUsers = createSelector(
  selectUsersState,
  (state) => state.filteredUsers
);
