import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAdvancedRepository } from '../interfaces/response.interface';
import { environment } from '../../environments/environment';

interface IAdvancedResolve{
  items: IAdvancedRepository[]
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryResolverService implements Resolve<any> {
  private readonly URL = environment.githubSearchRepoApiUrl;

  constructor(private http: HttpClient) {}

  resolve(_route: ActivatedRouteSnapshot): Observable<any> {
    const params = { q: _route.queryParams.name};
    return this.http.get<IAdvancedResolve>(this.URL, { params })
      .pipe(map(res => res.items));
  }
}
