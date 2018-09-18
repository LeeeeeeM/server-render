import React from 'react'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import serialize from 'serialize-javascript'
import {
  renderToString
} from 'react-dom/server'
import App from './src/App'
import getFacts from './src/facts'

const app = new express()
const indexPage = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8')
app.use(express.static('public'))

app.get('/facts', cors(), (req, res, next) => {
  const where = req.query.from
  const a = [{
    text: `request from ${where}`
  }, {
    text: `time: ${new Date()}`
  }]
  res.json(a)
})

app.get('/', (req, res) => {
  getFacts('server').then(facts => {
    const html = renderToString( < App facts = {facts} />)
    const finalHtml = indexPage.replace('<!-- :: APP :: -->', html).replace('\'<!-- :: DATA :: -->\'', serialize(facts))
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
    res.send(finalHtml)
  }).catch(e => {
    res.send(indexPage)
  })
})

app.listen(8091, '0.0.0.0', () => {
  console.log('server start on 8091')
})