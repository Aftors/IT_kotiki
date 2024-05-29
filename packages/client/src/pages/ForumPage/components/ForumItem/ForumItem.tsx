import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { commentsUrl, topicsUrl } from '../../../../utils/api/consts'
import { ForumPageTitle, ForumTopicsContainer } from '../../ForumPage'
import { Button, Form as AForm, Form, Input, Space, Typography } from 'antd'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../../store/slices/userSlice/user.slice'
import CommentTopic from '../CommentTopic/CommentTopic'

const { Text } = Typography

type FieldType = {
  content: string;
};

const CommentForm = styled(Form)`
  width: 100%;
  margin-top: 20px;
  display: flex;
`

export const ForumItem: FC = () => {
  const [form] = AForm.useForm()
  const [comments, setComments] = useState([])
  const [topic, setTopic] = useState(null)
  const { id: id_user, login: login_user } = useSelector(userSelector)

  const { id } = useParams()

  async function getTopic() {
    try {
      const res = await axios.get(`${topicsUrl}/${id}`, {
        withCredentials: true
      })
      setTopic(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getComments() {
    try {
      const res = await axios.get(`${commentsUrl}?id_topic=${id}`, {
        withCredentials: true
      })
      setComments(res.data.reverse())
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleSubmit(body) {
    try {
      await axios.post(commentsUrl, { ...body, id_topic: topic?.id, id_user, login_user }, {
        withCredentials: true
      })
      form.setFieldsValue(['content'])
      await getComments()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTopic()
    getComments()
  }, [id])


  return (
    <>
      <ForumPageTitle level={1}>{topic?.title}</ForumPageTitle>
      <Text>{topic?.description}</Text>
      <CommentForm name='comment' form={form} onFinish={handleSubmit}>
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item<FieldType> style={{ width: '100%' }} name='content'>
            <Input placeholder='Введите комментарий' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Отправить</Button>
          </Form.Item>
        </Space.Compact>
      </CommentForm>
      <ForumTopicsContainer>
        {comments?.map(
          ({ login_user, id, content, updatedAt }) => (
            <CommentTopic
              author={login_user}
              key={id}
              content={content}
              time={updatedAt}
            />
          )
        )}
      </ForumTopicsContainer>
    </>
  )
}
