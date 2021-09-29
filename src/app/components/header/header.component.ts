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
  private readonly debounce: number = 1000;
  public repositories$: Observable<any[]> = of([]);
  public isLoading: boolean = false;
  constructor(private gitSearch: GithubSearchService, private formBuilder: FormBuilder) {
  }
  inputForm: FormGroup = this.formBuilder.group({
      search: ['', [Validators.required]],
      filter: ['']
    },
  );

  ngOnInit(): void {
    this.repositories$ = this.inputForm.valueChanges.pipe(
      debounceTime(this.debounce),
      tap(res => {
        this.isLoading = true
      }),
      switchMap(({ search, filter }) => {
        return this.gitSearch.getRepositories(search, filter).pipe(
          map(data => data.items),
          tap(res => {
            this.isLoading = false
          }))
      })
    );
  }

}
