import React from 'react'
import {
  render
} from 'react-dom'
import App from './App'
import getFacts from './facts'

setTimeout(() => {
  getFacts('client').then(facts => {
      render( <App facts = {facts}
        />, document.querySelector('#root'))
      })
  }, 2000
)