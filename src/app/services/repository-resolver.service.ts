import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubSearchService } from './github-search.service';


@Injectable({
  providedIn: 'root'
})
export class RepositoryResolverService implements Resolve<any> {

  constructor(private http: HttpClient, private gitSearch: GithubSearchService) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<any> {
    return this.gitSearch.getAdvancedRepository(_route.queryParams.name)
  }
}
