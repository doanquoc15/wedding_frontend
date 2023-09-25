export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
}

export interface IResponse {
  error?: string | null;
  data?: any;
  total?: number;
}
