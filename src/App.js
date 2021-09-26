import axios from "axios"
import { message, Table, Pagination, Typography, Button } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { Link } from "react-router-dom"
import CreateLinkForm from "./components/create-link-form"

import "./App.css"
import "antd/dist/antd.css"

function App() {
  const columns = [
    {
      title: "Title",
      width: "20%",
      key: "title",
      index: "title",
      render: record => <p>{record.title}</p>,
    },
    {
      title: "Shorten Url",
      width: "50%",
      render: record => {
        return (
          <div>
            <a href={record.shorten_url} target="_blank">
              {record.shorten_url}
            </a>
          </div>
        )
      },
    },
    {
      title: "Total clicks",
      width: "10%",
      render: record => {
        return <div>{record.total_clicks}</div>
      },
    },
    {
      title: "Action",
      width: "20%",
      render: record => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <Link
                to={{
                  pathname: `/links/${record.id}/edit`,
                }}
              >
                <EditOutlined />
              </Link>
            </div>
            <div onClick={() => handleDestroyUrl(record.id)} style={{ padding: "0 1rem" }}>
              <DeleteOutlined />
            </div>
            <Button type="primary">
              <Link
                to={{
                  pathname: `/links/${record.id}/stats`,
                }}
              >
                See details
              </Link>
            </Button>
          </div>
        )
      },
    },
  ]

  const [total, setTotal] = useState(0)
  const [invalidateLinks, setInvalidateLinks] = useState(Date())
  const [currentPage, setCurrentPage] = useState(1)
  const [shortenUrls, setShortenUrls] = useState([])
  const location = useLocation()

  const getPageNumber = page => {
    setCurrentPage(page)
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/links?page=${currentPage}&page_size=5`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then(res => {
      setShortenUrls(res.data.result)
      setTotal(res.data.total)
    })
  }, [currentPage, invalidateLinks, location.href])

  const handleDestroyUrl = id => {
    axios({
      method: "delete",
      url: `http://localhost:3000/links/${id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Url Deleted")
          setInvalidateLinks(Date())
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  const handleCreateLink = values => {
    axios({
      method: "post",
      url: "http://localhost:3000/links",
      data: { link: { url: values.url } },
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (res.data && res.data.status === 200) {
          message.success("Shorten Url generated")
          setInvalidateLinks(Date())
        } else {
          res.data && res.data.errors.map(error => message.error(error))
        }
      })
      .catch(() => message.error("Something went wrong"))
  }

  return (
    <>
      <div className="App" style={{ padding: "5rem" }}>
        <Typography.Title>Shorten Your Link</Typography.Title>

        <div style={{ margin: "2rem 0" }}>
          <CreateLinkForm createLink={handleCreateLink} />
        </div>

        <Table dataSource={shortenUrls} columns={columns} rowKey="id" pagination={false} />

        <Pagination
          style={{ marginTop: "2rem" }}
          defaultCurrent={1}
          total={total}
          defaultPageSize={5}
          onChange={getPageNumber}
          pageSize={5}
        />
      </div>
    </>
  )
}

export default App
