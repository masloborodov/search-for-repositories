import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces/response-interface';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor(private http: HttpClient) { }
  public getRepositories(name: string, sort: string): Observable<any> {
    return this.http.get('https://api.github.com/search/repositories?q=' + name + '&sort=' + sort )
  }
}
