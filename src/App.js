import axios from "axios"
import "./App.css"
import "antd/dist/antd.css"
import { Button, Input, message, Table, Pagination } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

function App() {
  const columns = [
    {
      title: "Shorten Url",
      width: "60%",
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
          return (
            <div>
              <a href={record.shorten_url} target="_blank" rel="noreferrer">
                {record.shorten_url}
              </a>
            </div>
          )
        }
      },
    },
    {
      title: "Clicks Count",
      width: "20%",
      key: "click_count",
      index: "click_count",
      render: record => <p>{record.click_count}</p>,
    },
    {
      title: "Action",
      width: "20%",
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

  const [editStatus, setEditStatus] = useState(false)
  const [urlUpdate, setUrlUpdate] = useState("")
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrl] = useState("")
  const [shortenUrls, setShortenUrls] = useState([])

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
          window.location.reload()
        } else {
          message.error("Cannot Delete Url")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const createLink = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/links",
      data: { link: { url: url, user_id: 1 } },
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Shorten Url generated")
          window.location.reload()
        } else {
          message.error("Generate Shorten Url Failed")
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const handleUrlValue = e => setUrl(e.target.value)

  const getPageNumber = page => {
    setCurrentPage(page)
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/links?page=${currentPage}&page_size=5`,
    }).then(
      res => {
        setShortenUrls(res.data.result)
        setTotal(res.data.total)
      },
      [shortenUrls],
    )
  })

  return (
    <div className="App" style={{ padding: "5rem" }}>
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <Input placeholder="Enter your url here..." onChange={handleUrlValue} />
        <Button type="primary" onClick={createLink}>
          Create link
        </Button>
      </div>

      <Table dataSource={shortenUrls} columns={columns} rowKey="id" pagination={false} />

      <Pagination
        style={{ marginTop: "2rem" }}
        defaultCurrent={1}
        total={total}
        defaultPageSize={5}
        onChange={page => getPageNumber(page)}
        pageSize={5}
      />
    </div>
  )
}

export default App
