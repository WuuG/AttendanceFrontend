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
	UserQuery
}