import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  constructor(private http: HttpClient) { }
  public getRepositories(name: string, sort: string): Observable<any> {
    const query ={
      q: name,
      sort
    }
    return this.http.get(getUrl + name + '&sort=' + sort)
  }

  public getMoreInformation(name: string): Observable<any>{
    return this.http.get(getUrl + name)
  }
}


