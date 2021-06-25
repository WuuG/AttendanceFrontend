import { request } from '../request';

const getUsers = (params) => {
	return request({
		url: 'http://172.17.169.27:8080/users',
		params: {
			...params
		},
	}, 'get')
}

class UserQuery {
	constructor(query) {
		this.curPage = query.pageIndex
		this.pageSize = query.pageSize
		this.key = query.pageSize
	}
}

export {
	getUsers,
	UserQuery
}