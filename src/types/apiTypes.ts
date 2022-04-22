
export type Board = {
  id?:number;
  created_date?:string;
  modified_date?:string;
  title: string;
  description: string;
}

export type Task_api = {
  id?:number;
  board_object?:Board;
  status_object?:Status;
  status: number;
  created_date?:string;
  modified_date?:string;
  title: string;
  description: string;
  due_date?: string;
  board?: number;
}

export type Status = {
  id?:number;
  created_date?:string;
  modified_date?:string;
  title: string;
  description: string;
}

export type Pagination<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};