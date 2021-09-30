import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAdvancedRepository } from '../../interfaces/response.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryComponent{
  public repository: IAdvancedRepository | null = null
  constructor(private route: ActivatedRoute) {
    route.data.subscribe(({ items }) => {
      this.repository = items[0]
    })
  }
}
