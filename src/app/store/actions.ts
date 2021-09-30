import { createAction, props } from '@ngrx/store';
import { IParams } from './state';

export const setFilter = createAction(
  '[Repository Search Page] Set Filter',
  props<{ params: IParams }>()
)
