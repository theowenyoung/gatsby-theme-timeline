/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import processString from "react-process-string"

export default function processReactString(body) {
  const finalBody = processString([
    {
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:#(?!\/))([a-zA-Z0-9/_]{1,280})(?:\b(?!#)|$)/,
      fn: (key, result) => {
        return (
          <Link key={key} href={`https://www.youtube.com/hashtag/${result[1]}`}>
            <span> #{result[1]}</span>
          </Link>
        )
      },
    },
    {
      regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      fn: (key, result) => {
        return (
          <Link key={key} href={`${result[0]}`}>
            <span> {result[0]}</span>
          </Link>
        )
      },
    },
  ])(body)
  return finalBody
}
