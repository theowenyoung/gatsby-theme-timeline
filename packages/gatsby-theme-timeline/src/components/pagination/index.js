import React from "react"
import * as ReactUltimatePagination from "react-ultimate-pagination"
import Page from "./page"
import Wrapper from "./wrapper"
import PreviousPageLink from "./previous"
import NextPageLink from "./next"
import Ellipsis from "./elipsis"
import FirstPageLink from "./first"
import LastPageLink from "./last"

const Pagination = (props) => {
  const itemTypeToComponent = {
    PAGE: Page,
    ELLIPSIS: Ellipsis,
    FIRST_PAGE_LINK: FirstPageLink,
    LAST_PAGE_LINK: LastPageLink,
    PREVIOUS_PAGE_LINK: PreviousPageLink,
    NEXT_PAGE_LINK: NextPageLink,
  }
  const itemTypeKeys = Object.keys(itemTypeToComponent)
  itemTypeKeys.forEach((key) => {
    itemTypeToComponent[key] = itemTypeToComponent[key].bind(null, {
      prefix: props.prefix,
      pagePath: props.pagePath || `page`,
      pageContext: props.pageContext,
    })
  })
  const UltimatePagination = ReactUltimatePagination.createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper,
  })

  return <UltimatePagination {...props}></UltimatePagination>
}
export default Pagination
