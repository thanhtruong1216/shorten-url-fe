import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Card } from "antd"
import dayjs from "dayjs"

import apiUrl from "../helpers/api-url"

function Stats(props) {
  const [linkDetail, setLinkDetail] = useState({})

  const handleCancel = () => {
    props.closeModal()
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `${apiUrl}/links/${props.match.params.id}`,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then(res => {
      if (res.data && res.data.result) {
        setLinkDetail(res.data.result)
      }
    }, {})
  })

  const { short_link, total_clicks } = linkDetail

  const displayDateTime = datetime => dayjs(datetime).format(`ddd, MMM DD, YYYY hh:mm:ss ZZ`)

  return (
    <>
      <Modal
        width="70%"
        style={{ maxHeight: "100px !important" }}
        title="Link Stats"
        visible
        onCancel={handleCancel}
        wrapClassName="custom-modal no-padding footer-center ant-modal-borderless title-center vertical-center-modal"
        footer={[]}
      >
        <Card>
          <div>
            <h4>Origin link</h4>
            <p>{linkDetail?.link?.url}</p>
          </div>
          <div>
            <h4>Short link</h4>
            <a href={short_link} target="_blank" rel="noreferrer">
              {short_link}
            </a>
          </div>
        </Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card title="Total clicks" style={{ width: "100%" }}>
            <p>{total_clicks}</p>
          </Card>
          <Card title="Created at" style={{ width: "100%" }}>
            <p>{displayDateTime(linkDetail?.link?.created_at)}</p>
          </Card>
          <Card title="Updated at" style={{ width: "100%" }}>
            <p>{displayDateTime(linkDetail?.link?.updated_at)}</p>
          </Card>
        </div>
      </Modal>
    </>
  )
}

export default Stats
