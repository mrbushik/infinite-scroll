export interface CardDataModel {
  info?: CardInfoModel;
  results?: CardResultModel[];
}
export interface CardInfoModel {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CardResultModel {
  id?: number;
  status?: string;
  image?: string;
  name?: string;
  species?: string;
}
