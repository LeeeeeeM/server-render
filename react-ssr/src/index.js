import React from 'react'
import {
  hydrate
} from 'react-dom'
import App from './App'
import getFacts from './facts'

hydrate(<App facts = {window.__$INITIAL_DATA__} />,
  document.querySelector('#root'))

setTimeout(() => {
  getFacts('client').then(facts => {
      hydrate( <App facts = {facts} />,
        document.querySelector('#root'))
      })
  }, 1500
)