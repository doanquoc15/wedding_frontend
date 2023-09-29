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

export type MailMessageType = MailType & {
  message: string;
};

export type MailType = {
  email: string;
};