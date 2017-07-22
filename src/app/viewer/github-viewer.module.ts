import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GithubRepoListComponent } from './github-repo-list.component';
import { GithubRepoComponent } from './github-repo.component';
import { GithubRepoTreeComponent } from './github-repo-tree.component';
import { GithubRepoService } from './github-repo.service';
import { MdTabsModule, MdListModule, MdIconModule,
  MdButtonModule, MdProgressSpinnerModule, MdGridListModule,
  MdCardModule, MdProgressBarModule, MdSnackBarModule, MdChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AceEditorModule } from 'ng2-ace-editor';
import { LoggerService } from './logger-service';

@NgModule({
  declarations: [
    GithubRepoListComponent,
    GithubRepoComponent,
    GithubRepoTreeComponent
  ],
  imports: [
    CommonModule,
    MdTabsModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdGridListModule,
    MdCardModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdChipsModule,
    AceEditorModule,
    HttpClientModule
  ],
  providers: [GithubRepoService, LoggerService]
})
export class GithubViewerModule { }
