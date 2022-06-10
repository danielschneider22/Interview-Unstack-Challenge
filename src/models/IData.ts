export interface IData<T> {
  allIds: string[],
  byId: {[id: string]: T}
}