import React from "react"
import Item from "./item"

const Items = ({ data }) => {
  const nodes = data.allItem.nodes
  return (
    <main>
      {nodes.map((node, index) => (
        <Item key={`item-${index}`} {...node}></Item>
      ))}
    </main>
  )
}

export default Items
