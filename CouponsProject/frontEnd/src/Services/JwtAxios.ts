import axios from 'axios';
import store from '../Redux/Store';

const JwtAxios = axios.create();
JwtAxios.interceptors.request.use(request => {
    request.headers = {
        token: "Bearer " + store.getState().authState.client.token,
    };

    return request;
});

export default JwtAxios;