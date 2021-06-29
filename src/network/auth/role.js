import { request } from '../request';

// 获取所有角色
const getRole = () => {
	return request({
		url: 'roles'
	}, 'get')
}
// 添加角色
const postRole = (form) => {
	return request({
		url: 'roles',
		data: {
			...form
		}
	}, 'post')
}
// 删除角色
const deleteRole = (roleId) => {
	return request({
		url: `roles/${roleId}`
	}, 'delete')
}
// 修改角色信息
const patchRole = (form) => {
	return request({
		url: `roles/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}
// 获取角色用户列表
const getRoleUsers = (roleId, form) => {
	return request({
		url: `roles/${roleId}/users`,
		params: {
			...form
		}
	}, 'get')
}
// 给用户设置角色
const postRoleUser = (form) => {
	return request({
		url: `roles/${form.roleId}/users/${form.id}`,
		data: {
			...form
		}
	}, 'post')
}
// 将用户从角色中删除
const deleteRoleUser = (form) => {
	return request({
		url: `roles/${form.roleId}/users/${form.id}`,
	}, 'delete')
}
// 给用户添加角色列表
const putUserRoles = (uid, RoleArray) => {
	return request({
		url: `roles/users/${uid}`,
		data: RoleArray
	}, 'put')
}
export {
	getRole,
	postRole,
	deleteRole,
	patchRole,
	getRoleUsers,
	postRoleUser,
	deleteRoleUser,
	putUserRoles
}