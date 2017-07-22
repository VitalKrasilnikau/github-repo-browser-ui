import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { GithubRepoListComponent } from './viewer/github-repo-list.component';

const appRoutes: Routes = [
  { path: 'viewer', component: GithubRepoListComponent },
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
