import { request } from '../request';

const getRole = () => {
	return request({
		url: 'role'
	}, 'get')
}
const postRole = (form) => {
	return request({
		url: 'role',
		data: {
			...form
		}
	}, 'post')
}
export {
	getRole,
	postRole
}