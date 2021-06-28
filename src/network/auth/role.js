import { request } from '../request';

const getRole = () => {
	return request({
		url: 'roles'
	}, 'get')
}
const postRole = (form) => {
	return request({
		url: 'roles',
		data: {
			...form
		}
	}, 'post')
}
const deleteRole = (roleId) => {
	return request({
		url: `roles/${roleId}`
	}, 'delete')
}
const patchRole = (form) => {
	return request({
		url: `roles/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}
const getRoleUsers = (roleId, form) => {
	return request({
		url: `roles/${roleId}/users`,
		params: {
			...form
		}
	}, 'get')
}
const postRoleUser = (form) => {
	return request({
		url: `roles/users/${form.id}/${form.roleId}`,
		form: {
			...form
		}
	}, 'post')
}
const deleteRoleUser = (form) => {
	return request({
		url: `roles/users/${form.id}/${form.roleId}`,
		form: {
			...form
		}
	}, 'delete')
}
export {
	getRole,
	postRole,
	deleteRole,
	patchRole,
	getRoleUsers,
	postRoleUser,
	deleteRoleUser
}