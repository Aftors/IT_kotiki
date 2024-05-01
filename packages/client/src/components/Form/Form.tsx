import { Button, Form as AForm, Input } from 'antd'
import { EFIELD_TYPE } from './models/models'
import { FORM_CONFIG } from './constants/FormConfig'
import { Fragment } from 'react'
import { FIELD_CONFIG } from './constants/FieldConfig'
import styled from 'styled-components'
import { Store } from 'antd/es/form/interface'

type Type = string | number

export interface IProps<T> {
  type: Type
  onSubmit: (unknown) => void
  initialData?: T
}

export const Form: FC<IProps<unknown>> = <T,>({
  type,
  onSubmit,
  initialData,
}: IProps<T>) => {
  const [form] = AForm.useForm()
  const CONFIG = FORM_CONFIG[type]
  const PASSWORD_FIELDS = [
    EFIELD_TYPE.PASSWORD,
    EFIELD_TYPE.OLD_PASSWORD,
    EFIELD_TYPE.NEW_PASSWORD,
  ]

  const handleSubmit = (values: unknown) => {
    onSubmit(values)
  }

  return (
    <AForm form={form} onFinish={handleSubmit} initialValues={initialData}>
      {CONFIG.fields.map(fieldType => {
        const {
          name,
          rules,
          placeholder,
          type,
          prefix = null,
        } = FIELD_CONFIG[fieldType]
        return (
          <Fragment key={name}>
            <AForm.Item<Record<EFIELD_TYPE, string>>
              name={name}
              rules={rules}
              validateTrigger={['onSubmit', 'onBlur', 'onFocus']}>
              {PASSWORD_FIELDS.includes(name) ? (
                <Input.Password prefix={prefix} placeholder={placeholder} />
              ) : (
                <Input prefix={prefix} type={type} placeholder={placeholder} />
              )}
            </AForm.Item>
          </Fragment>
        )
      })}
      <AForm.Item style={{ textAlign: 'center' }}>
        <FormButton htmlType="submit">{CONFIG.submitBtnText}</FormButton>
      </AForm.Item>
    </AForm>
  )
}
