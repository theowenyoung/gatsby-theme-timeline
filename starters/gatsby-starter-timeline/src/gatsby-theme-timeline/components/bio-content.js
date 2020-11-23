import React, { Fragment } from "react"
import { Link } from "theme-ui"

/**
 * Shadow me to add your own bio content
 */

const BioContent = () => (
  <Fragment>
    Words by <Link href="/">Owen Young</Link>.
    <br />
    Freelancer / Perfectionism / Workflow lover /{" "}
    <Link href="/en">English</Link> /<Link href="/zh">中文</Link>
  </Fragment>
)

export default BioContent
