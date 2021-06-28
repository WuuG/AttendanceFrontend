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
const patchRole = (form) => {
	return request({
		url: `role/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}
const getRoleUsers = (roleId, form) => {
	return request({
		url: `role/${roleId}/users`,
		params: {
			...form
		}
	}, 'get')
}

export {
	getRole,
	postRole,
	deleteRole,
	patchRole,
	getRoleUsers
}