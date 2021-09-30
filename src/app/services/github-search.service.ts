import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {
  private readonly URL = environment.githubSearchRepoApiUrl;

  constructor(private http: HttpClient) { }

  public getRepositories(name: string, sort: string): Observable<any> {
    const params = { q: name, sort }
    return this.http.get(this.URL, { params })
  }
}
