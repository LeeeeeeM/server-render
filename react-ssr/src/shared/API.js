import axios from 'axios'

const logger = (key = 'data') => response => {
    console.info(`获取数据${key}`, JSON.stringify(response[key]))
    return response[key]
}

const warning = err => {
    console.warn(`错误警告:${err}`)
}

export async function fetchInfo(where) {
    return new Promise((resolve, reject) => {
        // 这里可以重构一下
        axios.get(`http://127.0.0.1:8090/api/fetchInfo?from=${where}`)
        .then(logger())
        .then(res => resolve(res))
        .catch(err => {
            warning(err)
            // 看处理，也可以resolve(null)
            reject(null)
        })
    })
}

export function fetchUserRepos (user = 'LeeeeeeM') {
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:8090/api/fetchUserRepos?user=${user}`)
        .then(logger())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            warning(err)
            reject(null)
        })
    })
}