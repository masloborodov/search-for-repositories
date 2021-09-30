import { Component, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IRepository, IResponse } from '../../interfaces/response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public repositories$: Observable<any[]> = of([]);
  public isLoading: boolean = false;
  public inputForm: FormGroup = this.formBuilder.group({
      search: ['', [Validators.required]],
      filter: ['']
    },
  );

  private readonly debounce: number = 1000;

  constructor(private gitSearch: GithubSearchService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.repositories$ = this.inputForm.valueChanges
      .pipe(
        debounceTime(this.debounce),
        tap(() => this.isLoading = true),
        switchMap(({ search, filter }) => {
          return this.gitSearch.getRepositories(search, filter).pipe(
            map(data => data.items),
            tap(() => this.isLoading = false))
        })
      );
  }

}
