export interface IReduxBaseAction {
  type: string;
  payload?: any;
}

export interface IUserProps {
  [x: string]: any;
}

export interface IReduxAuthState {
  pending: boolean;
  error: any;
  data: IUserProps | null;
  isChecked: boolean;
  isUpdated: boolean;
}

export interface IReduxToastState {
  type: 'success' | 'error' | null;
  description?: string;
  title: string;
}

export interface IReduxState {
  auth: IReduxAuthState;
  toast: IReduxToastState;
}
