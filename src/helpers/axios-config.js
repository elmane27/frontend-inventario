import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: 'http://ec2-13-58-202-151.us-east-2.compute.amazonaws.com:4000/'
});

export {
    axiosIntance
}