export interface IResponse{
  items: IRepository[]
}
export interface IAdvancedResolve{
  items: IAdvancedRepository[]
}
export interface IRepository {
  id: number,
  name: string,
  git_url: string,
  full_name: string,
  language: string,
  forks: number,
  stargazers_count: number
}
export interface IAdvancedRepository extends IRepository{
  watchers: number,
  open_issues: number,
  owner:{
    login: string,
    avatar_url: string
  }
}
