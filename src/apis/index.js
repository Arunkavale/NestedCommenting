import axios from 'axios';


export default axios.create({
    baseURL:"http://localhost:3443/api/v1/",
    headers:{
        "user_auth":JSON.parse(localStorage.getItem('user_auth'))
    }
});