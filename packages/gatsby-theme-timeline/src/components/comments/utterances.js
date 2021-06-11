/** @jsx jsx */
import React, { Component } from "react"
import { jsx, Themed } from "theme-ui"
import { Global, css } from "@emotion/react"
export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.commentBox = React.createRef()
  }
  componentDidMount() {
    const userConfig = this.props.config || {}
    const { theme, repo, issueTerm, label } = userConfig
    const config = {
      theme: theme || `github-light`,
      repo: repo,
      issueTerm: issueTerm,
      label: label,
    }
    const scriptEl = document.createElement(`script`)
    scriptEl.setAttribute(`src`, `https://utteranc.es/client.js`)
    scriptEl.setAttribute(`crossorigin`, `anonymous`)
    scriptEl.setAttribute(`async`, true)
    scriptEl.setAttribute(`theme`, config.theme)
    scriptEl.setAttribute(`issue-term`, config.issueTerm || `pathname`)
    if (config.repo) {
      scriptEl.setAttribute(`repo`, config.repo)
    }

    if (config.label) {
      scriptEl.setAttribute(`label`, config.label)
    }
    this.commentBox.current.appendChild(scriptEl)
  }

  render() {
    return (
      <Themed.div>
        <Global
          styles={css`
            .utterances {
              max-width: 100%;
            }
          `}
        />
        <div ref={this.commentBox}></div>
      </Themed.div>
    )
  }
}
