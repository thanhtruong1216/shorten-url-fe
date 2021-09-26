import axios from "axios"
import { Form, Input, Button, Checkbox, message } from "antd"

function SignUp() {
  const onFinish = values => {
    const { email, password } = values

    axios({
      method: "post",
      url: `http://localhost:3000/users`,
      data: { user: { email, password } },
    })
      .then(res => {
        if (res.data && res.data.id) {
          window.location.href = "/sign_in"
          message.success("Sign up successfully")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default SignUp
