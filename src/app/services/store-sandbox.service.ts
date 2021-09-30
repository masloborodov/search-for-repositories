import { Injectable } from '@angular/core';
import { AppState, IParams } from '../store/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFilters } from '../store/selectors';
import { setFilter } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class StoreSandboxService {
  filters$: Observable<any> = this.store.pipe(select(selectFilters));

  constructor(private store: Store<AppState>) {}

  setFilters(params: IParams): void {
    this.store.dispatch(setFilter({ params }))
  };
}
