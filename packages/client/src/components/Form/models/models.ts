import { Rule } from 'antd/es/form'
import { ReactNode } from 'react'

export const enum EFORM_TYPE {
  PROFILE_INFO = 'PROFILE_INFO',
  PROFILE_PASSWORD = 'PROFILE_PASSWORD',
}

export enum EFIELD_TYPE {
  LOGIN = 'login',
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  PASSWORD = 'password',
  NAME = 'first_name',
  SURNAME = 'second_name',
  EMAIL = 'email',
  PHONE = 'phone',
}

export interface IFormConfig {
  submitBtnText: string
  fields: EFIELD_TYPE[]
}

export interface IFieldConfig {
  label: string
  name: EFIELD_TYPE
  type: any
  placeholder: string
  prefix?: ReactNode
  rules?: Rule[]
}

export interface IUserInfo {
  first_name: string
  second_name: string
  email: string
  phone: string
  login: string
}

export interface ISigninFormBody extends Pick<IUserInfo, 'login'> {
  password: string
}

export interface ISignupFormBody extends IUserInfo {
  password: string
}

export interface IPasswordFormBody {
  oldPassword: string
  newPassword: string
}
