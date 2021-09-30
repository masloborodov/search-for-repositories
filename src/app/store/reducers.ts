import { Action, createReducer, on } from '@ngrx/store';
import { initialRepositoriesState, IRepositoriesState } from './state';
import * as RepositoriesSearchActions from './actions';

const repositoriesReducers = createReducer(
  initialRepositoriesState,
  on(RepositoriesSearchActions.setFilter, (state, action) => {
    return {
      params: action.params
    }
  })
)

export function reducer(state: IRepositoriesState | undefined, action: Action) {
  return repositoriesReducers(state, action)
}
