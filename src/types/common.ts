import React, { ReactNode } from "react";
import { SelectProps, TextFieldProps } from "@mui/material";
import { Control } from "react-hook-form";
import { DesktopDatePickerProps } from "@mui/x-date-pickers";

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
  confirmPassword: string;
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
  content?: string;
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

export interface MenuItem {
  id: number;
  dishName: string;
  description?: string;
  price: number;
  image?: string;
  typeId: number;
}

export interface TypeDish {
  id: number;
  typeName: string;
  menuItems: MenuItem[];
}

export interface TypeEmployee {
  id: number;
  employeeName: string;
  age: number;
  phone?: string;
  address?: string;
  gender?: GENDER;
  salary: number;
  experience: number;
  position: string;
  regency: REGENCY;
}

export interface TypeService {
  id: number;
  serviceName: string;
  capacity: number;
  price: number;
  image?: string;
  comboMenus?: ComboMenu[];
  bookings?: any;
}

export interface ComboMenu {
  id: number;
  comboName: string;
  totalPrice: number;
  description: string;
  serviceId: number;
  comboItems?: ComboItem[];
}

export interface ModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title: String | ReactNode;
  children: ReactNode;
  className?: string;
  closeModal?: Function;
  style?: string;
  styleParent?: string;
  isBtnClose?: boolean;
  sx?: any;
}

export interface ComboItem {
  id: number;
  quantity: number;
  totalPrice: number;
  menuItemId: number;
  comboMenuId: number;
}

export interface CheckboxPropsType extends SelectProps<any> {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: boolean;
  sx?: any;
}

export type TextFieldPropsType = TextFieldProps & {
  name: string;
  control: Control<any>;
  defaultValue?: unknown;
  placeholder?: string;
  minHeight?: string | number;
};

export interface DatePickerType extends Omit<DesktopDatePickerProps<any>, "onChange" | "value"> {
  name: string;
  control: Control<any>;
  defaultValue?: unknown;
  sx?: any;
  id?: string | number;
}

export interface IDetailModalBookProps {
  handleClickCancel: () => void;
  handleCloseModals: () => void;
  serviceId: number | undefined;
  comboMenuId: number | undefined;
  priceTotalDish: any;
}

export interface IZones {
  id: number;
  zoneName: string;
  numberRoom: number;
}
export interface SelectFieldPropsType extends SelectProps<any> {
  name: string;
  control: Control<any>;
  options: {
    value?: any;
    label?: any;
    id?: any;
    name?: any;
    shortName?: any;
    avatar?: any;
  }[];
  defaultValue?: unknown;
  labelDisplay?: string;
  required?: boolean;
  hasLegend?: boolean;
  styleLabel?: object;
  width?: number;
  isAvatarOption?: boolean;
  image?: any;
  handleChange?: any;
  quarterCurrent?: any;
}
