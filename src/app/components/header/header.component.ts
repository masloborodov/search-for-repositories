import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { IRepository } from '../../interfaces/response.interface';

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
              private chRef: ChangeDetectorRef) {}

  get repositoriesFiltered(): IRepository[]{
    if(this.filter === ''){
      return this.repositories
    } else{
      return this.repositories.filter(elem => elem.language === this.filter)
    }
  }

  ngOnInit(): void {
    this.inputForm.valueChanges
      .pipe(
        debounceTime(this.debounce),
        tap(() => {
          this.isLoading = true
          this.chRef.markForCheck();

        }),
        switchMap(({ search, filter }) => {
          if (this.inputForm.get('search')?.invalid){
            this.isLoading = false
            return of([])
          }else{
            return this.gitSearch.getRepositories(search, filter).pipe(
              catchError(() => of([])),
              tap(() => {
                this.isLoading = false
                this.chRef.markForCheck();
              })
            )
          }
        })
      ).subscribe(({items}) => {
      this.repositories = items || [];
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
