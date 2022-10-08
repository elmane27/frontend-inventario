import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: 'https://app-backend-iud.herokuapp.com/'
});

export {
    axiosIntance
}