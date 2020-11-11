/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"

export default function ({ permalink }) {
  return (
    <LinkUI
      href={`https://www.reddit.com${permalink}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View on Reddit
    </LinkUI>
  )
}
