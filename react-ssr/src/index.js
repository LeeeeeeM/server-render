import React from 'react'
import {
  hydrate
} from 'react-dom'
import App from './App'
import getFacts from './facts'

setTimeout(() => {
  getFacts('client').then(facts => {
      hydrate( <App facts = {facts} />,
        document.querySelector('#root'))
      })
  }, 3000
)