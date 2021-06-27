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
const deleteRole = (roleId) => {
	return request({
		url: `role/${roleId}`
	}, 'delete')
}
export {
	getRole,
	postRole,
	deleteRole
}