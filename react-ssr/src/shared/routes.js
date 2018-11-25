import Grid from './component/Grid'
import Home from './component/Home'
import { fetchUserRepos } from './API'

const routes = [{
  path: '/',
  exact: true,
  component: Home,
  fetchInitialData() {
    return new Promise(reslove => {
      resolve()
    })
  }
}, {
  path: '/users/:user',
  component: Grid,
  fetchInitialData(user) {
    return fetchUserRepos(user)
  }
}]

export default routes