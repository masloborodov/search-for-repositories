import { Component, OnInit } from '@angular/core';
import { GithubSearchService } from '../../services/github-search.service';
import { IAdvancedRepository, IRepository } from '../../interfaces/response.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  public name: string = ''
  public repository: IAdvancedRepository | null = null
  constructor(private gitSearch: GithubSearchService, private route: ActivatedRoute) {
    route.queryParams.pipe(
      switchMap(res => {
        const { name } = res
        return gitSearch.getMoreInformation(name)
      })
    ).subscribe(res => {
      const { items } = res
      this.repository = items[0]
    })
  }

  ngOnInit(): void {
  }
}
