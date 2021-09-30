import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAdvancedRepository } from '../interfaces/response.interface';
import { environment } from '../../environments/environment';
import { GithubSearchService } from './github-search.service';



@Injectable({
  providedIn: 'root'
})
export class RepositoryResolverService implements Resolve<any> {
  private readonly URL = environment.githubSearchRepoApiUrl;

  constructor(private http: HttpClient, private gitSearch: GithubSearchService) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<any> {
    return this.gitSearch.getAdvancedRepository(_route.queryParams.name)
  }
}
