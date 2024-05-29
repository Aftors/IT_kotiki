import { EFIELD_TYPE, IFieldConfig } from '../models/models'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export const FIELD_CONFIG: Record<EFIELD_TYPE, IFieldConfig> = {
  [EFIELD_TYPE.EMAIL]: {
    label: 'Email',
    name: EFIELD_TYPE.EMAIL,
    type: 'email',
    placeholder: 'Email',
    rules: [
      {
        required: true,
        message: 'Введите адрес электронной почты',
      },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        message: 'Проверьте правильность ввода электронной почты',
      },
    ],
  },
  [EFIELD_TYPE.LOGIN]: {
    label: 'Login',
    name: EFIELD_TYPE.LOGIN,
    type: 'text',
    placeholder: 'Логин',
    prefix: <UserOutlined className="site-form-item-icon" />,
    rules: [
      {
        required: true,
        message: 'Введите логин',
      },
      {
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        message:
          'Логин должен включать в себя от 3 до 20 символов латиницы или цифр',
      },
    ],
  },
  [EFIELD_TYPE.NAME]: {
    label: 'Name',
    name: EFIELD_TYPE.NAME,
    type: 'text',
    placeholder: 'Имя',
    rules: [
      {
        required: true,
        message: 'Введите имя',
      },
      {
        pattern: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
        message:
          'Проверьте правильность ввода, не допускаются цифры и спецсимволы',
      },
    ],
  },
  [EFIELD_TYPE.SURNAME]: {
    label: 'Surname',
    name: EFIELD_TYPE.SURNAME,
    type: 'text',
    placeholder: 'Фамилия',
    rules: [
      {
        required: true,
        message: 'Введите фамилию',
      },
      {
        pattern: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
        message:
          'Проверьте правильность ввода, не допускаются цифры и спецсимволы',
      },
    ],
  },
  [EFIELD_TYPE.PHONE]: {
    label: 'Phone',
    name: EFIELD_TYPE.PHONE,
    type: 'tel',
    placeholder: 'Телефон',
    rules: [
      {
        required: true,
        message: 'Введите номер телефона',
      },
      {
        pattern: /^\+?\d{10,15}$/,
        message:
          'Проверьте правильность ввода, телефонный номер должен включать от 10 до 15 цифр',
      },
    ],
  },
  [EFIELD_TYPE.PASSWORD]: {
    label: 'Password',
    name: EFIELD_TYPE.PASSWORD,
    type: 'password',
    placeholder: 'Пароль',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [
      {
        required: true,
        message: 'Введите пароль',
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
        message: `Пароль может включать в себя только символы латиницы (от 8 до 40)  
				в верхнем и нижнем регистрах и цифры`,
      },
    ],
  },
  [EFIELD_TYPE.OLD_PASSWORD]: {
    label: 'Old password',
    name: EFIELD_TYPE.OLD_PASSWORD,
    type: 'password',
    placeholder: 'Старый пароль',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [
      {
        required: true,
        message: 'Введите старый пароль',
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
        message: `Пароль может включать в себя только символы латиницы (от 8 до 40)  
				в верхнем и нижнем регистрах и цифры`,
      },
    ],
  },
  [EFIELD_TYPE.NEW_PASSWORD]: {
    label: 'New password',
    name: EFIELD_TYPE.NEW_PASSWORD,
    type: 'password',
    placeholder: 'Новый пароль',
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [
      {
        required: true,
        message: 'Введите новый пароль',
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
        message: `Пароль может включать в себя только символы латиницы (от 8 до 40)  
				в верхнем и нижнем регистрах и цифры`,
      },
    ],
  },
}
