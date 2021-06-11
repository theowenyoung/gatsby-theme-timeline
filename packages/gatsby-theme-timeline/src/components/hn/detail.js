/** @jsx jsx */

import { jsx, Themed, Link as LinkUI } from "theme-ui"

const Detail = ({ item }) => {
  const { url, datetime, author, thirdPartyId } = item
  return (
    <Themed.root>
      <div>
        <div className="hn-card" data-id={thirdPartyId}>
          <Themed.blockquote>
            <Themed.p>{item.title}</Themed.p>
            &mdash; {author} {` `}
            <LinkUI href={url}>{datetime}</LinkUI>
          </Themed.blockquote>
        </div>
      </div>
    </Themed.root>
  )
}

export default Detail
