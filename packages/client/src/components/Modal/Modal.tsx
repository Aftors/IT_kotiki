import { Modal as AModal, Typography } from 'antd'
import { IModalProps } from './models/models'
import { MODAL_CONFIG } from './constants/ModalConfig'

export const Modal: React.FC<IModalProps> = ({ type, count, ...props }) => {
  const { content, title, okText, cancelText } = MODAL_CONFIG[type]

  return (
    <AModal title={title} okText={okText} cancelText={cancelText} {...props}>
      <Typography>Убито врагов: {count}</Typography>
      {content}
    </AModal>
  )
}
