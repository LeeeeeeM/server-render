import axios from 'axios';
export default function getFacts() {
    return axios({
        url: 'http://localhost:8091/facts',
        method: 'get'
    }).then(res => res.data);
}