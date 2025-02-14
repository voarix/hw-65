export interface IPage {
  id: string;
  title: string;
  content: string;
}

export interface IPageId {
  title: string;
  content: string;
}

export interface IPageApi {
  [id: string]: IPageId;
}
