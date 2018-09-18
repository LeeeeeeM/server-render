import axios from 'axios'
export default function getFacts(where) {
    return axios({
        url: 'http://localhost:8091/facts',
        method: 'get',
        params: {
            from: where
        }
    }).then(res => res.data)
}