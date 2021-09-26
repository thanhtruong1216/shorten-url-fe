import axios from "axios"
import { message, Table, Pagination } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

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
      width: "60%",
      render: record => {
        return (
          <div>
            <Link
              to={{
                pathname: `/links/${record.id}/stats`,
              }}
            >
              {record.shorten_url}
            </Link>
          </div>
        )
      },
    },
    {
      title: "Action",
      width: "20%",
      render: record => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "1rem" }}>
              <Link
                to={{
                  pathname: `/links/${record.id}/edit`,
                  state: { slug: record.slug, title: record.title },
                }}
              >
                <EditOutlined />
              </Link>
            </div>
            <div onClick={() => handleDestroyUrl(record.id)}>
              <DeleteOutlined />
            </div>
          </div>
        )
      },
    },
  ]

  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [shortenUrls, setShortenUrls] = useState([])

  const handleDestroyUrl = id => {
    axios({
      method: "delete",
      url: `http://localhost:3000/links/${id}`,
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
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

  const createLink = values => {
    axios({
      method: "post",
      url: "http://localhost:3000/links",
      data: { link: { url: values.url } },
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
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

  const getPageNumber = page => {
    setCurrentPage(page)
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3000/links?page=${currentPage}&page_size=5`,
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then(res => {
      setShortenUrls(res.data.result)
      setTotal(res.data.total)
    })
  }, [currentPage])

  return (
    <>
      <div className="App" style={{ padding: "5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <CreateLinkForm createLink={createLink} />
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
