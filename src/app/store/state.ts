
export interface IParams{
  q: string,
  sort: string
}

export interface AppState{
  repositories: IRepositoriesState
}

export interface IRepositoriesState {
  params: IParams
}

export const initialRepositoriesState: IRepositoriesState = {
  params: {
    q: '',
    sort: ''
  }
}

