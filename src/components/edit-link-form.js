import { Form, Input, Button, Modal, message } from "antd"
import axios from "axios"
import { useState, useEffect } from "react"

function EditLinkForm(props) {
  const [linkDetail, setLinkDetail] = useState({})

  const handleCancel = () => {
    props.closeModal()
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/links/${props.match.params.id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then(res => {
      setLinkDetail(res.data && res.data.result)
    })
  }, [props.match.params.id])

  const handleSaveUrl = values => {
    const { slug, title } = values
    axios({
      method: "patch",
      url: `http://localhost:3000/links/${props.match.params.id}`,
      data: { link: { slug, title } },
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Url Updated")
          handleCancel()
        } else {
          res.data && res.data.errors.map(error => message.error(error))
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  if (!linkDetail.link) {
    return null
  }

  const { slug, title } = linkDetail.link

  return (
    <>
      <Modal
        width="800px"
        style={{ maxHeight: "100px !important" }}
        title="Edit Link"
        visible
        onCancel={handleCancel}
        wrapClassName="custom-modal no-padding footer-center ant-modal-borderless title-center vertical-center-modal"
        footer={[]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={handleSaveUrl}
          initialValues={{ slug, title }}
          onFinishFailed={props.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Title" name="title" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Please input your slug!" }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditLinkForm
