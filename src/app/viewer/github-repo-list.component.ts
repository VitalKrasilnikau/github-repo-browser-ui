import { Component, OnInit } from '@angular/core';
import { GithubRepoService } from './github-repo.service';
import { GithubRepo } from './github-repo';
import { GithubRepoFile } from './github-repo-file';
import { LoggerService } from './logger-service';

@Component({
  templateUrl: './github-repo-list.component.html'
})
export class GithubRepoListComponent implements OnInit {

  repos: GithubRepo[] = null;
  currentFile: string = null;
  isLoading = false;

  constructor(private _githubRepoService: GithubRepoService,
    private _logger: LoggerService) {}

  ngOnInit(): void {
    this.isLoading = true;
    try {
      this._githubRepoService
        .getRepos()
        .subscribe(
          data => {
            this.isLoading = false;
            this._render(data);
          },
          e => {
            this._logger.error(null, e);
            this.isLoading = false;
          }
        );
    } catch (e) {
      this._logger.error(null, e);
      this.isLoading = false;
    }
  }

  _render(repos: GithubRepo[]): void {
    this.repos = repos;
  }
}
