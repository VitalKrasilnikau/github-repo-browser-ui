import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GithubRepoService } from './github-repo.service';
import { GithubRepo } from './github-repo';
import { GithubRepoFile } from './github-repo-file';
import { EventAggregatorService } from './event-aggregator.service';
import { LoggerService } from './logger-service';

export const OnFileSelected = 'onFileSelected';

@Component({
  selector: 'app-github-repo-tree',
  templateUrl: './github-repo-tree.component.html'
})
export class GithubRepoTreeComponent implements OnInit {

  tree: GithubRepoFile[];
  isBusy = false;

  @Input() repo: GithubRepo;

  @Output() onExpanded = new EventEmitter<boolean>();

  constructor(private _githubRepoService: GithubRepoService,
    private _eventAggregator: EventAggregatorService,
    private _logger: LoggerService) {}

  ngOnInit(): void {
    try {
      this.getRepo();
    } catch (e) {
      this.onExpanded.emit(false);
      this._logger.error(null, e);
    }
  }

  private getRepo(): void {
    if (this.repo) {
      this._githubRepoService
        .getRepo(this.repo.name, this.repo.commit)
        .subscribe(
          data => {
            this.tree = data;
            this.onExpanded.emit(true);
          },
          e => {
            this.onExpanded.emit(false);
            this._logger.error(null, e);
          }
        );
    }
  }

  toggle(item: GithubRepoFile): void {
    let args = null;
    if (item.isFolder) {
      item.isBeingExpanded = item.isExpanded = !item.isExpanded;
    } else {
      args = item;
    }
    this._eventAggregator.publish<GithubRepoFile>(OnFileSelected, args);
  }

  onChildExpanded(item: GithubRepoFile, success: boolean): void {
    item.isBeingExpanded = false;
  }
}
