import React from 'react'

function From (props) {
  const info = props.info
  return (
    <ul>
      <li>{info.from}</li>
      <li>{info.time}</li>
    </ul>
  )
}

export default From
