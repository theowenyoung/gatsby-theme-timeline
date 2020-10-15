import React from "react"
import Detail from "./detail"
const DetailPage = ({ data }) => {
  const detail = data.item
  return <Detail {...detail}></Detail>
}

export default DetailPage
