/** @jsx jsx */

import { jsx, Styled, Link as LinkUI } from "theme-ui"

const Detail = ({ item }) => {
  const { url, datetime, author, thirdPartyId } = item
  return (
    <Styled.root>
      <div>
        <div className="hn-card" data-id={thirdPartyId}>
          <Styled.blockquote>
            <Styled.p>{item.title}</Styled.p>
            &mdash; {author} {` `}
            <LinkUI href={url}>{datetime}</LinkUI>
          </Styled.blockquote>
        </div>
      </div>
    </Styled.root>
  )
}

export default Detail
