import { FC } from 'react'
import { Avatar, Flex, GetProp, message, Upload, UploadProps } from 'antd'
import { imgUrl } from '../../../utils/api/consts'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import {
  loadingAvatarSelector,
  userSelector,
} from '../../../store/slices/userSlice/user.slice'
import { useAppDispatch } from '../../../store/store'
import { changeUserAvatar } from '../../../store/slices/userSlice/user.thunk'
import { WHITE_TEXT } from '../../../constants/color'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const ProfileAvatar: FC = () => {
  const { avatar } = useSelector(userSelector)
  const isLoading = useSelector(loadingAvatarSelector)
  const dispatch = useAppDispatch()

  const handleChange: UploadProps['onChange'] = info => {
    dispatch(changeUserAvatar(info.file.originFileObj))
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        color: WHITE_TEXT,
      }}
      type="button">
      {isLoading ? <LoadingOutlined /> : <UserOutlined />}
      <div style={{ marginTop: 8 }}>загрузить</div>
    </button>
  )

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <Flex>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {avatar ? (
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={`${imgUrl}${avatar}`}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  )
}
