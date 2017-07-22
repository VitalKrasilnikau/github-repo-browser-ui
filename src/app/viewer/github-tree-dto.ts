import { GithubFileDto } from './github-file-dto';

export class GithubTreeDto {
  sha: string;
  url: string;
  tree: GithubFileDto[];
  truncated: boolean;
}
