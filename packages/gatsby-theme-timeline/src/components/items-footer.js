/** @jsx jsx */
import { withPrefix } from "gatsby"
import { jsx } from "theme-ui"
import Pagination from "./pagination"
import path from "path"
import kebabCase from "lodash/kebabCase"

const PostFooter = ({ pageContext }) => {
  const { pageType, tag, currentPage, totalPages, basePath } = pageContext
  if (typeof totalPages === `number`) {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hideFirstAndLastPageLinks
        prefix={withPrefix(
          path.join(
            basePath,
            pageType === `tag` ? `tags/${kebabCase(tag)}` : ``
          )
        )}
        pageContext={pageContext}
      ></Pagination>
    )
  } else {
    return null
  }
}

export default PostFooter
