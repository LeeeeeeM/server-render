import path from 'path'
import fs from 'fs'

import Router from 'koa-router'
import React from 'react'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { matchPath, StaticRouter, match } from 'react-router-dom'
import App from '../shared/App'
import routes from '../shared/routes'

const indexPage = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8')
const router = new Router()

router.get('/api/fetchInfo', async (context, next) => {
  const where = context.query.from
  const info = {
    from: `request from ${where}`,
    time: `time: ${new Date()}`
  }
  context.type = 'application/json'
  context.body = info
})

router.get('/api/fetchUserRepos', async (context, next) => {
  const user = context.query.user
  const repos = [{
    name: user,
    owner: {
      login: user
    },
    forks_count: 1000,
    stargazers_count: 1000,
    html_url: `https://github.com/${user}`
  }]
  context.type = 'application/json'
  context.body = repos
})

router.get('*', async (context, next) => {
  const matchParams = matchPath(context.path, {path: '/users/:user'}).params
  console.log(matchParams)
  const activeRoute = routes.find(route => matchPath(context.path, route)) || {}
  const promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData : Promise.resolve
  const data = await promise()
  const html = renderToString(
    <StaticRouter context={{data}} location={context.url}><App data={data} /></StaticRouter>
  )
  const finalHtml = indexPage.replace('<!-- :: APP :: -->', html).replace('\'<!-- :: DATA :: -->\'', serialize({
    data
  }))
  context.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  context.type = 'text/html'
  context.body = finalHtml
})

export default router