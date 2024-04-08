import { Button, Form as AForm, Input } from 'antd'
import { EFIELD_TYPE } from './models/models'
import { EPAGE_TYPE } from '../../models/models'
import { FORM_CONFIG } from './constants/FormConfig'
import { FC, Fragment } from 'react'
import { FIELD_CONFIG } from './constants/FieldConfig'

interface IProps<T> {
  type: EPAGE_TYPE
  onSubmit: (unknown) => Promise<void>
  initialData?: T
}

export const Form: FC = <T,>({ type, onSubmit, initialData }: IProps<T>) => {
  const [form] = AForm.useForm()
  const CONFIG = FORM_CONFIG[type]
  const PASSWORD_FIELDS = [
    EFIELD_TYPE.PASSWORD,
    EFIELD_TYPE.OLD_PASSWORD,
    EFIELD_TYPE.NEW_PASSWORD,
  ]

  const handleSubmit = values => {
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
        <Button
          style={{
            width: '100%',
            marginTop: '20px',
            border: 'none',
          }}
          htmlType="submit">
          {CONFIG.submitBtnText}
        </Button>
      </AForm.Item>
    </AForm>
  )
}
