import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryComponent } from './pages/repository/repository.component';
import { HeaderComponent } from './components/header/header.component';
import { RepositoryResolverService } from './services/repository-resolver.service';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  {
    path: 'repository',
    component: RepositoryComponent,
    resolve: {
      items: RepositoryResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
