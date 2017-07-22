import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import { GithubRepo } from './github-repo';
import { HttpClient } from '@angular/common/http';
import { GithubTreeDto } from './github-tree-dto';
import { GithubRepoFile } from './github-repo-file';
import { GithubFileDto } from './github-file-dto';

@Injectable()
export class GithubRepoService {

  private _server = 'https://github-repo-browser.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getRepos(): Observable<GithubRepo[]> {
    return this.http
      .get<GithubRepo[]>(`${this._server}/repository`)
      .map(data => {
        data.forEach(_ => _.commit = 'master');
        return data;
      });
  }

  getRepo(repoName: string, commit: string = 'master'): Observable<GithubRepoFile[]> {
    return this.http
      .get<GithubTreeDto>(this._getGithubTreeUri(repoName, commit))
      .retry(3)
      .map(data => this._convert(repoName, data));
  }

  getFile(repoName: string, commit: string = 'master'): Observable<string> {
    return this.http
      .get(this._getGithubFileUri(repoName, commit))
      .retry(3)
      .map(data => this._b64DecodeUnicode(data['content']));
  }

  getViews(repoName: string): Observable<number> {
    return this.http
      .get(`${this._server}/view/${repoName}`)
      .map(data => +data['viewCount']);
  }

  getLikes(repoName: string): Observable<number> {
    return this.http
      .get(`${this._server}/like/${repoName}`)
      .map(data => +data['likeCount']);
  }

  putViews(repoName: string): Observable<any> {
    return this.http.put(`${this._server}/view/${repoName}`, "");
  }

  putLikes(repoName: string): Observable<any> {
    return this.http.put(`${this._server}/like/${repoName}`, "");
  }

  _convert(name: string, result: GithubTreeDto): GithubRepoFile[] {
    return result.tree.map(f => this._mapDtoToBusinessEntity(name, f));
  }

  _mapDtoToBusinessEntity(name: string, file: GithubFileDto): GithubRepoFile {
    return {
      name: file.path,
      isFolder: file.type === 'tree',
      src: file.sha,
      isExpanded: false,
      children: [],
      repoData: { name: name, description: '', commit: file.sha, imgSrc: '', title: '', url: '' },
      isBeingExpanded: false
    };
  }

  _getGithubTreeUri(name: string, commit: string): string {
    return `https://api.github.com/repos/VitalKrasilnikau/${name}/git/trees/${commit}`;
  }

  _getGithubFileUri(name: string, commit: string): string {
    return `https://api.github.com/repos/VitalKrasilnikau/${name}/git/blobs/${commit}`;
  }

  _b64DecodeUnicode(str: string): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c: string) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')).trim();
  }
}
