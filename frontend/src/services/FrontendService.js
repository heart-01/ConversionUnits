import axios from 'axios'

const FrontendService = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
})

export default FrontendService