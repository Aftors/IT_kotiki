import { EPAGE_TYPE } from '../../../models/models'
import { EFIELD_TYPE, EFORM_TYPE, IFormConfig } from '../models/models'

export const FORM_CONFIG: Record<EPAGE_TYPE | EFORM_TYPE, IFormConfig> = {
  [EPAGE_TYPE.SIGNIN]: {
    submitBtnText: 'Войти',
    fields: [EFIELD_TYPE.LOGIN, EFIELD_TYPE.PASSWORD],
  },
  [EPAGE_TYPE.SIGNUP]: {
    submitBtnText: 'Зарегистрироваться',
    fields: [
      EFIELD_TYPE.NAME,
      EFIELD_TYPE.SURNAME,
      EFIELD_TYPE.EMAIL,
      EFIELD_TYPE.PHONE,
      EFIELD_TYPE.LOGIN,
      EFIELD_TYPE.PASSWORD,
    ],
  },
  [EFORM_TYPE.PROFILE_INFO]: {
    submitBtnText: 'Сохранить',
    fields: [
      EFIELD_TYPE.NAME,
      EFIELD_TYPE.SURNAME,
      EFIELD_TYPE.EMAIL,
      EFIELD_TYPE.PHONE,
      EFIELD_TYPE.LOGIN,
    ],
  },
  [EFORM_TYPE.PROFILE_PASSWORD]: {
    submitBtnText: 'Сменить',
    fields: [EFIELD_TYPE.OLD_PASSWORD, EFIELD_TYPE.NEW_PASSWORD],
  },
}
