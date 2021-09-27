import axios from "axios"
import { Form, Input, Button, message } from "antd"

import apiUrl from "../helpers/api-url"

function SignIn() {
  const onFinish = values => {
    const { email, password } = values

    axios({
      method: "post",
      url: `${apiUrl}/auth/login`,
      data: { user: { email, password } },
    })
      .then(res => {
        if (res.status === 200 && res.data.token) {
          window.location.href = `/links`
          localStorage.setItem("token", res.data.token)
          message.success("Sign in successfully")
        }
      })
      .catch(error => {
        const errorText = (error?.response?.data?.errors || ["Something went wrong!"]).join(", ")
        message.error(errorText)
      })
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  return (
    <>
      <div style={{ paddingTop: "5rem" }}>
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
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

export default SignIn
