import React from "react"
import DetailPage from "../../components/detail-page"

const DetailWrapper = ({ location, data }) => {
  const { previous, next } = data
  return (
    <DetailPage
      data={data}
      location={location}
      previous={previous}
      next={next}
    />
  )
}

export default DetailWrapper
