import { ReactNode } from "react";

import { GENDER, REGENCY } from "./enums";

export interface SignInType {
  email: string;
  password: string;
}
export interface IResponse {
  error?: string | null;
  data?: any;
  total?: number;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

export type MailMessageType = MailType & {
  message: string;
};

export type MailType = {
  email: string;
};

export interface CustomButtonProps {
  height?: string | number;
  bg?: string;
  color?: string;
  width?: string | number;
  sx?: any;
  children: ReactNode;
  isLoading?: boolean;
}

export interface TitleHeadType {
  title: string;
  content?: string
}

export type SearchProps = {
  wordSearch?: string;
  onSearch?: Function;
  onChange?: Function;
  width?: string;
  className?: string;
  handleSearch?: Function;
  typeQuery?: string;
  isResetAll?: boolean;
};

export interface MenuItem{
  id: number;
  dishName: string;
  description ?: string;
  price: number;
  image ?: string;
  typeId: number;
}

export interface TypeDish {
  id: number;
  typeName: string;
  menuItems: MenuItem[];
}

export interface TypeEmployee{
  id: number;
  employeeName : string;
  age: number;
  phone ?: string;
  address ?: string;
  gender ?: GENDER,
  salary : number,
  experience: number,
  position: string,
  regency: REGENCY
}