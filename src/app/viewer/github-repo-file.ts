import { GithubRepo } from './github-repo';

export class GithubRepoFile {
  name = '';
  isFolder = false;
  src = '';
  isExpanded = false;
  children: GithubRepoFile[] = null;
  repoData: GithubRepo = null;
  isBeingExpanded = false;
}
