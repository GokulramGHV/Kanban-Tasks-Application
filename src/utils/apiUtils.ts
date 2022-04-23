import { Board, Status, Task_api } from '../types/apiTypes';

const API_BASE_URL = 'https://capstone-301-task-app.herokuapp.com/api/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export const request = async (
  endpoint: string,
  method: RequestMethod = 'GET',
  data: any = {}
) => {
  let url: string;
  let payload: string;
  if (method === 'GET') {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join('&')}`
      : '';
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = '';
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : '';
  }

  // Basic Authentication
  // const auth = 'Basic ' + window.btoa('GokulGHV:abcd@123');

  // Token Authentication
  const token = localStorage.getItem('token');
  const auth = token ? 'Token ' + localStorage.getItem('token') : '';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: method !== 'GET' ? payload : null,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = (username: string, password: string) => {
  return request('auth-token/', 'POST', {
    username: username,
    password: password,
  });
};

export const registerUser = (payload: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => {
  return request('auth/registration/', 'POST', payload);
};

export const me = () => {
  return request('users/me/', 'GET');
};

export const register = (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  return request('auth/registration/', 'POST', {
    username,
    email,
    password1,
    password2,
  });
};

export const listBoards = () => {
  return request('boards/', 'GET');
};

export const createBoard = (payload: Board) => {
  return request('boards/', 'POST', payload);
};

export const editBoard = (payload: Board, boardID: number) => {
  return request(`boards/${boardID}/`, 'PATCH', payload);
};

export const getBoard = (boardID: number) => {
  return request(`boards/${boardID}/`, 'GET');
};

export const deleteBoard = (boardID: number) => {
  return request(`boards/${boardID}/`, 'DELETE');
};

export const listTasks = (boardID: number) => {
  return request(`boards/${boardID}/tasks/`, 'GET');
};

export const listStatus = () => {
  return request(`status/`, 'GET');
};

export const createTask = (payload: Task_api, boardID: number) => {
  return request(`boards/${boardID}/tasks/`, 'POST', payload);
};

export const editTask = (
  payload: Task_api,
  boardID: number,
  taskID: number
) => {
  return request(`boards/${boardID}/tasks/${taskID}/`, 'PATCH', payload);
};

export const deleteTask = (boardID: number, taskID: number) => {
  return request(`boards/${boardID}/tasks/${taskID}`, 'DELETE');
};

export const createStage = (payload: Status) => {
  return request('status/', 'POST', payload);
};

export const editStage = (payload: Status, stageID: number) => {
  return request(`status/${stageID}/`, 'PATCH', payload);
};

export const deleteStage = (stageID: number) => {
  return request(`status/${stageID}/`, 'DELETE');
};
