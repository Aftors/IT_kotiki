import { EPAGE_TYPE, EPATH } from '../../../models/models'

export type TSignPageType = EPAGE_TYPE.SIGNUP | EPAGE_TYPE.SIGNIN

export interface ISignPageConfig {
  title: string
  linkTo: EPATH.SIGN_UP | EPATH.SIGN_IN
  textLink: string
}
