/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import ItemDate from "./item-date"
export default function ({ item }) {
  const { channelUrl, channel } = item
  return (
    <footer sx={{ display: `flex` }}>
      <ItemDate item={item}></ItemDate>
      <span
        sx={{
          color: `textMuted`,
          display: `inline-block`,
          mx: 1,
          flexShrink: 0,
        }}
      >
        ·
      </span>
      {channelUrl ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: `textMuted`,
            overflow: `hidden`,
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            display: `inline-block`,
          }}
          href={channelUrl}
        >
          {`${channel}`}
        </Link>
      ) : (
        <span
          sx={{
            color: `textMuted`,
            overflow: `hidden`,
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            display: `inline-block`,
          }}
        >
          {channel}
        </span>
      )}
    </footer>
  )
}
