import axios from "axios"
import "./App.css"
import "antd/dist/antd.css"
import { Button, Input, message, Table } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

function App() {
  const [editStatus, setEditStatus] = useState(false)
  const [urlUpdate, setUrlUpdate] = useState("")

  const handleChangeEditStatus = () => {
    setEditStatus(true)
  }

  const handleChangeIputUrlUpdate = e => setUrlUpdate(e.target.value)

  const handleSaveUrl = id => {
    axios({
      method: "patch",
      url: `http://localhost:3000/links/${id}`,
      data: { link: { slug: urlUpdate } },
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Url Updated")
        } else if (urlUpdate.length > 9) {
          message.error("Slug length is greater than 9")
        } else if (urlUpdate.length === 0) {
          message.error("Slug can't be blank")
        } else {
          message.error("Cannot update the link")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const handleDestroyUrl = id => {
    axios({
      method: "delete",
      url: `http://localhost:3000/links/${id}`,
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Url Deleted")
        } else {
          message.error("Cannot Delete Url")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const columns = [
    {
      title: "Shorten Url",
      render: record => {
        if (editStatus) {
          const slug = record && record.shorten_url && record.shorten_url.split("/")[3]

          return (
            <div style={{ display: "flex" }}>
              <Input defaultValue={slug} onChange={handleChangeIputUrlUpdate} />
              <Button type="primary" onClick={() => handleSaveUrl(record.id)} style={{ marginRight: "1rem" }}>
                Save
              </Button>
              <Button type="ghost" onClick={() => window.location.reload()}>
                Cancel
              </Button>
            </div>
          )
        } else {
          return <div>{record.shorten_url}</div>
        }
      },
    },
    {
      title: "Action",
      render: record => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "1rem" }} onClick={() => handleChangeEditStatus(record.id)}>
              <EditOutlined />
            </div>
            <div onClick={() => handleDestroyUrl(record.id)}>
              <DeleteOutlined />
            </div>
          </div>
        )
      },
    },
  ]

  const [url, setUrl] = useState("")
  const [shortenUrls, setShortenUrls] = useState([])

  const createLink = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/links",
      data: { link: { url } },
    })
      .then(res => {
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
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <Input placeholder="Enter your url here..." onChange={handleUrlValue} />
        <Button type="primary" onClick={createLink}>
          Create link
        </Button>
      </div>

      <Table dataSource={shortenUrls} columns={columns} rowKey="id" />
    </div>
  )
}

export default App
