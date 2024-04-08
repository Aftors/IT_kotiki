import { notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearNotificationInfo,
  notificationSelector,
} from '../../store/slices/notification.slice'
import { Fragment, useEffect } from 'react'
import { BACKGROUND } from '../../constants/color'

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()
  const { isOpen, data } = useSelector(notificationSelector)

  useEffect(() => {
    isOpen
      ? api[data.type]({
          message: data.text,
          onClose: () => dispatch(clearNotificationInfo()),
          placement: 'bottom',
          style: { background: BACKGROUND },
        })
      : null
  }, [isOpen])

  return <Fragment>{contextHolder}</Fragment>
}
