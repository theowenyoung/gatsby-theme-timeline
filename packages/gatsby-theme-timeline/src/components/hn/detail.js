/** @jsx jsx */

import { jsx, Styled, Link as LinkUI } from "theme-ui"

const Detail = ({ item }) => {
  const { hnId, datetime, author } = item
  return (
    <Styled.root>
      <div>
        <div className="hn-card" data-id={hnId}>
          <Styled.blockquote>
            <Styled.p>{item.title}</Styled.p>
            &mdash; {author} {` `}
            <LinkUI href={`https://news.ycombinator.com/item?id=${hnId}`}>
              {datetime}
            </LinkUI>
          </Styled.blockquote>
        </div>
      </div>
    </Styled.root>
  )
}

export default Detail
