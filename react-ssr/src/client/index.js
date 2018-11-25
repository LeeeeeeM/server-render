import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../shared/App'

console.log(window.__$INITIAL_DATA__)

hydrate(
  <BrowserRouter>
    <App data={window.__$INITIAL_DATA__.data} info={window.__$INITIAL_DATA__.info} />
  </BrowserRouter>,
  document.querySelector('#root'))

Promise.resolve().then(() => {
  // remove 初始化数据
  window.__$INITIAL_DATA__ = void 0
})