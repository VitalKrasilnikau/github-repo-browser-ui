import { Component, Input, OnInit, OnDestroy, HostListener, AfterViewChecked } from '@angular/core';
import { GithubRepoService } from './github-repo.service';
import { GithubRepo } from './github-repo';
import { EventAggregatorService } from './event-aggregator.service';
import { GithubRepoFile } from './github-repo-file';

import 'brace/index';
import 'brace/theme/clouds';
import 'brace/mode/xml';
import 'brace/mode/csharp';
import 'brace/mode/markdown';
import 'brace/mode/scala';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/typescript';

import { OnFileSelected } from './github-repo-tree.component';
import { LoggerService } from './logger-service';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  providers: [EventAggregatorService]
})
export class GithubRepoComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() repo: GithubRepo;

  gridRowHeight = '200px';
  selectedFile = '';
  mode = 'xml';
  isLoading = false;
  likes = 0;
  views = 0;

  constructor(private _githubRepoService: GithubRepoService,
    private _eventAggregator: EventAggregatorService,
    private _logger: LoggerService) {}

  ngOnDestroy(): void {
    this._eventAggregator.unsubscribe(OnFileSelected);
  }

  ngOnInit(): void {
    this._eventAggregator
      .listen<GithubRepoFile>(OnFileSelected)
      .subscribe(f => {
        if (f == null) {
          this.selectedFile = '';
        } else {
          this._loadData(f);
        }
      });
    this._loadLikes();
    this._loadViews();
  }

  _loadData(f: GithubRepoFile): void {
    this.isLoading = true;
    try {
      this._githubRepoService
        .getFile(f.repoData.name, f.repoData.commit)
        .subscribe(
          data => this._setContent(data, f.name),
          e => {
            this.isLoading = false;
            this._logger.error(null, e);
          }
        );
    } catch (e) {
      this.isLoading = false;
      this._logger.error(null, e);
    }
  }

  _loadLikes(): void {
    this._githubRepoService
      .getLikes(this.repo.name)
      .subscribe(
        likes => this.likes = likes
      );
  }

  _loadViews(): void {
    this._githubRepoService
      .getViews(this.repo.name)
      .subscribe(
        views => {
          this.views = views;
          this._githubRepoService.putViews(this.repo.name).subscribe();
        }
      );
  }

  like(): void {
    this._githubRepoService.putLikes(this.repo.name).subscribe();
    this.likes++;
  }

  _setContent(data: string, name: string): void {
    this.isLoading = false;
    this.selectedFile = data || '';
    const ext = name && name.split('.').pop() || '';
    switch (ext.toLowerCase()) {
      case 'md':
        this.mode = 'markdown';
        break;
      case 'cs':
        this.mode = 'csharp';
        break;
      case 'scala':
        this.mode = 'scala';
        break;
      case 'js':
      case 'json':
        this.mode = 'javascript';
        break;
      case 'css':
        this.mode = 'css';
        break;
      case 'html':
        this.mode = 'html';
        break;
      case 'ts':
        this.mode = 'typescript';
        break;
      default:
        this.mode = 'xml';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => this.gridRowHeight = event.target.innerHeight - 200 + 'px', 1);
  }

  ngAfterViewChecked() {
    setTimeout(() => this.gridRowHeight = window.innerHeight - 200 + 'px', 1);
  }
}