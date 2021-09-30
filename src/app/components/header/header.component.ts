import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { catchError, debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { IRepository } from '../../interfaces/response.interface';
import { StoreSandboxService } from '../../services/store-sandbox.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  public filter: string = '';
  public repositories: IRepository[] = [];
  public isLoading: boolean = false;
  public inputForm: FormGroup = this.formBuilder.group({
      search: ['', [Validators.required]],
      filter: ['']
    },
  );

  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly debounce: number = 1000;

  constructor(private gitSearch: GithubSearchService,
              private formBuilder: FormBuilder,
              private chRef: ChangeDetectorRef,
              private storeSandbox: StoreSandboxService) {}

  get repositoriesFiltered(): IRepository[]{
    if(this.filter === ''){
      return this.repositories
    } else{
      return this.repositories.filter(elem => elem.language === this.filter)
    }
  }

  ngOnInit(): void {
    this.storeSandbox.filters$.pipe(
      takeUntil(this.unsubscribe$),
      tap(() => {
        this.isLoading = true
        this.chRef.markForCheck();
      }),
      switchMap(({ q, sort }) => {
        this.inputForm.setValue({search: q, filter: sort}, {emitEvent: false})
        return this.gitSearch.getRepositories(q, sort).pipe(
          catchError(() => of([])),
          tap(() => {
            this.isLoading = false
            this.chRef.markForCheck();
          })
        )
      })
    ).subscribe(({items}) => {
      this.repositories = items || [];
    })

    this.inputForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.debounce),
        tap(() => {
          this.isLoading = true
          this.chRef.markForCheck();
        })
      ).subscribe(({ search, filter }) => {
      this.storeSandbox.setFilters({q: search, sort: filter})
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
