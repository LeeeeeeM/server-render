import React from 'react'

function Grid (props) {
  const repos = props.data
  return (
    <ul style={{display: 'flex', flexWrap: 'wrap'}}>
      {repos.map(({name, owner, forks_count, stargazers_count, html_url}) => {
        return (<div key={name} style={{margin: 10}}>
          <ul>
            <li><a href={html_url}>{owner.login} / {name}</a></li>
            <li>forkTimes: {forks_count}</li>
            <li>starTimes: {stargazers_count}</li>
          </ul>
        </div>)
      })}
    </ul>
  )
}

export default Grid