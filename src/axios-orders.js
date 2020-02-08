import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stomaprogram.firebaseio.com/'
});

export default instance;