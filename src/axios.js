import axios from 'axios'; 

const instance = axios.create({
    baseURL: "http://localhost:5001/clone-3eacf/us-central1/api"  //the api (cloud fnctionn URL)
})

export default instance;
