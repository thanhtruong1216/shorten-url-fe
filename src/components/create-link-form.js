import { Form, Input, Button } from "antd"

function CreateLinkForm(props) {
  return (
    <>
      <Form onFinish={props.createLink} style={{ display: "flex" }}>
        <Form.Item name="url" rules={[{ required: true, message: "Please input your url!" }]}>
          <Input placeholder="Enter your url here..." style={{ maxWidth: "50vw", width: "500px" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create link
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateLinkForm
