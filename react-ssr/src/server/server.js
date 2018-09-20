/**
 * 系统模块
 */
import fs from 'fs'
import path from 'path'

/**
 * 第三方模块
 */
import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import cors from '@koa/cors'

/**
 * 自定义模块
 */
import conf from './conf'
import router from './router'

const start = async () => {
  const app = new Koa()
  app.use(KoaStatic(path.resolve(process.cwd(), 'public')))
  app.use(cors())
  app.use(KoaBody({
    formLimit: '10kb',
    jsonLimit: '10kb',
    textLimit: '10kb'
  }))

  app.use(router.routes(), router.allowedMethods())

  app.listen(conf.port, conf.host, () => {
    console.log(`server start at port: ${conf.port}`)
  })
}

start()