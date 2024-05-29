import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.20.8:6868/api/',
    headers: {
        "Content-type": "application/json"
      }
});

export default axiosClient;