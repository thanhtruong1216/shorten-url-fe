import axios from "axios"
import "./App.css"
import "antd/dist/antd.css"
import { Button, Input, message, Table } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

const columns = [
  {
    title: "Shorten Url",
    dataIndex: "shorten_url",
    key: "shorten_url",
  },
  {
    title: "Action",
    render: () => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "1rem" }}>
            <EditOutlined />
          </div>
          <div>
            <DeleteOutlined />
          </div>
        </div>
      )
    },
  },
]

function App() {
  const [url, setUrl] = useState("")
  const [shortenUrls, setShortenUrls] = useState([])

  const createLink = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/links",
      data: { link: { url } },
    })
      .then(res => {
        console.log("rs", res)
        if (res.data && res.data.status === 200) {
          message.success("Shorten Url generated")
        } else {
          message.error("Generate Shorten Url Failed")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const handleUrlValue = e => setUrl(e.target.value)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/links",
    }).then(res => setShortenUrls(res.data.result))
  }, [])

  return (
    <div className="App" style={{ padding: "5rem" }}>
      <div style={{ display: "flex" }}>
        <Input placeholder="Basic usage" onChange={handleUrlValue} />
        <Button type="primary" onClick={createLink}>
          Create link
        </Button>
      </div>

      <Table dataSource={shortenUrls} columns={columns} rowKey="id" />
    </div>
  )
}

export default App
