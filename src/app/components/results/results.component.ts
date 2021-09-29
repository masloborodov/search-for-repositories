import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RepositoryInterface } from '../../interfaces/response-interface';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  @Input() repository: RepositoryInterface = {
    id: 0,
    name: '',
    git_url: '',
    language: '',
    full_name: '',
    owner: {
      login: ''
    },
    forks: 0,
    stargazers_count: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
