export interface IResponse{
  items: IRepository[]
}

export interface IRepository {
  id: number,
  name: string,
  git_url: string,
  full_name: string,
  forks: number,
  stargazers_count: number
}
export interface IAdvancedRepository extends IRepository{
  language: string,
  watchers: number,
  open_issues: number,
  owner:{
    login: string,
    avatar_url: string
  }
}
