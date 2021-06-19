/** @jsx jsx */

import { jsx, Themed, Link } from "theme-ui"
import { useEffect, useState } from "react"
const Redirect = () => {
  const [url, setUrl] = useState(``)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlQuery = urlParams.get(`url`)
    setUrl(urlQuery)
    setTimeout(() => {
      window.location.replace(url)
    }, 10)
  }, [url])
  return (
    <Themed.root>
      <div sx={{ overflowWrap: `break-word`, pb: 6 }}>
        <span>{`Opening `}</span>
        <Link sx={{ fontSize: 0 }} href={url}>
          {url}
        </Link>
      </div>
    </Themed.root>
  )
}

export default Redirect
