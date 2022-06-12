import axios from 'axios'

const BackendService = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
})

BackendService.interceptors.request.use(config => {
    let token = ''
    
    try {
        let userStorage = localStorage.getItem('user')
        let userStorageJSON = JSON.parse(userStorage)
        token = userStorageJSON['token']
    }catch(error){
        console.log(error);
    }

    if(token){
        config.headers.Authorization = "Bearer "+token
    }

    return config 
})

export default BackendService