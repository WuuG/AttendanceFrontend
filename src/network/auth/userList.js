import { request } from '../request';

const getUsers = (params) => {
	return request({
		url: 'users',
		params: {
			...params
		},
	}, 'get')
}

const patchUser = (form) => {
	return request({
		url: `users/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}

const putUserAvatar = (id, form) => {
	return request({
		url: `users/${id}/avatar`,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: form
	}, 'put')
}

const postUser = (form) => {
	return request({
		url: 'users',
		data: form
	}, 'post')
}
const deleteUser = (uid) => {
	return request({
		url: `users/${uid}`,
	}, 'delete')
}
class UserQuery {
	constructor(query) {
		this.curPage = query.pageIndex
		this.pageSize = query.pageSize
		this.search = query.key
	}
}

export {
	getUsers,
	patchUser,
	putUserAvatar,
	postUser,
	deleteUser,
	UserQuery
}