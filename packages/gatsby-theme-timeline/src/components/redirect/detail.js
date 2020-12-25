/** @jsx jsx */

import { jsx, Styled, Link } from "theme-ui"
import { useEffect } from "react"
const Detail = ({ item }) => {
  const { url } = item
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(url)
    }, 10)
  }, [url])
  return (
    <Styled.root>
      <div sx={{ overflowWrap: `break-word`, pb: 6 }}>
        <span>{`Opening `}</span>
        <Link sx={{ fontSize: 0 }} href={url}>
          {url}
        </Link>
      </div>
    </Styled.root>
  )
}

export default Detail
