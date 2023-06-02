import axios from 'axios';
import { Notification } from '../store';

const ApiHelper = axios.create({
	// baseURL: API_URL
	timeout: 300
});

const responseHandle = response => {
	if(response.data.alert) 
		Notification.info(response.data.alert)
	return response.data;
};

const errorHandle = error => {
	error.response && error.response.data.code && Notification.error(error.response.data.code);
	return Promise.reject(error.message);
};

ApiHelper.interceptors.response.use(responseHandle, errorHandle);

export const setAuthorization = authorization => {
	ApiHelper.interceptors.request.use(
		request => {
			request.headers["Authorization"] = authorization;
			return request;
		},
		error => error
	)
}

export default ApiHelper;