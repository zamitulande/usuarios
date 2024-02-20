import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://0.0.0.0:8080/api/',
    headers: {
        "Content-type": "application/json"
      }
});

export default axiosClient;