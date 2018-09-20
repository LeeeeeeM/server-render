const host = process.env.HOST || '127.0.0.1'
const env = process.env.NODE_ENV || 'development'
const port = 8090

export default {
  host,
  env,
  port
}