import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-reactapp.firebaseio.com/'
});

export default instance;
