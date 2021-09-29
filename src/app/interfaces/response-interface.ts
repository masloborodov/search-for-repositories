export interface ResponseInterface{
  items: RepositoryInterface[]
}

export interface RepositoryInterface {
  id: number,
  name: string,
  git_url: string,
  language: string,
  full_name: string,
  owner: {
    login: string
  },
  forks: number,
  stargazers_count: number
}
