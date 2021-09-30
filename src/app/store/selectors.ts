import { AppState } from './state';
import { createSelector } from '@ngrx/store';

export const repositoriesState = (state: AppState) => state.repositories;

export const selectFilters = createSelector(
  repositoriesState,
  (state) => state.params
);
