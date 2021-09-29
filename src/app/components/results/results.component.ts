import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IRepository } from '../../interfaces/response.interface';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  @Input() repository: IRepository | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
