import { request } from '../request';

const getRole = () => {
	return request({
		url: 'role'
	}, 'get')
}