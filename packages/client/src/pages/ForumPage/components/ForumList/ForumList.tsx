import { FC, useEffect, useState } from 'react'
import ForumTopic from '../../../../components/ForumTopic/ForumTopic'
import { Button, Form as AForm, Form, Input, Modal } from 'antd'
import styled from 'styled-components'
import { ForumPageTitle, ForumTopicsContainer } from '../../ForumPage'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../../store/slices/userSlice/user.slice'
import axios from 'axios'
import { topicsUrl } from '../../../../utils/api/consts'

type FieldType = {
  title: string;
  description?: string;
};

const ForumButton = styled(Button)`
  margin: 0 0 66px;
  border: none;
`

const FormButton = styled(Button)`
  border: none;
`

export const ForumList: FC = () => {
  const [form] = AForm.useForm()
  const { id: id_user } = useSelector(userSelector)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [topics, setTopics] = useState([])

  async function handleSubmit(body) {
    try {
      await axios.post(topicsUrl, { ...body, id_user }, {
        withCredentials: true
      })
      setIsOpenModal(false)
      await getTopics()
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getTopics() {
    try {
      const res = await axios.get(topicsUrl, {
        withCredentials: true
      })
      setTopics(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <>
      <ForumPageTitle level={1}>Форумы</ForumPageTitle>
      <ForumTopicsContainer>
        {topics?.map(
          ({ title, id, description }) => (
            <ForumTopic
              topicTitle={title}
              key={id}
              description={description}
              id={id}
            />
          )
        )}
      </ForumTopicsContainer>
      <ForumButton onClick={() => setIsOpenModal(true)} block>Создать тему</ForumButton>
      <Modal title='Добавить новый топик' okText='Добавить' open={isOpenModal} footer={[]}
             onCancel={() => setIsOpenModal(false)}>
        <Form
          form={form}
          name='newTopic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          validateTrigger={['onSubmit']}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Название'
            name='title'
            rules={[{ required: true, message: 'Введите название топика' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Описание'
            name='description'
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <FormButton htmlType='submit'>
              Добавить
            </FormButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
