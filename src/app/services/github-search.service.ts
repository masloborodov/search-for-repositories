import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { IAdvancedResolve } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {
  private readonly URL = environment.githubSearchRepoApiUrl;

  constructor(private http: HttpClient) { }

  public getRepositories(name: string, sort: string): Observable<any> {
    const params = {
      q: name,
      sort,
      per_page: 100
    }
    return this.http.get(this.URL, { params })
  }
  public getAdvancedRepository(name: string): Observable<any>{
    const params = {
      q: name,
      per_page: 1
    }
    return this.http.get<IAdvancedResolve>(this.URL, { params })
      .pipe(map(res => res.items));
  }
}
