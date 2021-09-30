import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { catchError, debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { IRepository } from '../../interfaces/response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  public repositories: IRepository[] = [];
  public repositoriesFiltered: IRepository[] = [];
  public isLoading: boolean = false;
  public inputForm: FormGroup = this.formBuilder.group({
      search: ['', [Validators.required]],
      filter: ['']
    },
  );

  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly debounce: number = 1000;

  constructor(private gitSearch: GithubSearchService, private formBuilder: FormBuilder) {}

  repositoriesFilter(filter: string){
    if(filter === ''){
      this.repositoriesFiltered = this.repositories
    } else{
      this.repositoriesFiltered = this.repositories.filter(elem => elem.language === filter)
    }
  }

  ngOnInit(): void {
    this.inputForm.valueChanges
      .pipe(
        debounceTime(this.debounce),
        tap(() => this.isLoading = true),
        switchMap(({ search, filter }) => {
          if (this.inputForm.get('search')?.invalid){
            this.isLoading = false
            return of([])
          }else{
            return this.gitSearch.getRepositories(search, filter).pipe(
              map(({items}) => {
                this.repositories = items;
                this.repositoriesFiltered = items;
                return items
              }),
              catchError(() => of([])),
              tap(() => this.isLoading = false)
            )
          }
        })
      ).subscribe();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

}
