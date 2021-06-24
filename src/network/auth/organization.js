import { request } from '../request';

const getOrganization = (orgId) => {
	return request({
		url: `organizations/${orgId}`
	}, 'get')
}
const getSchools = (curPage, pageSize, form) => {
	return request({
		url: `organizations/schools`,
		params: {
			curPage,
			pageSize,
			...form
		}
	}, 'get')
}
const postOrganization = (form) => {
	return request({
		url: `organizations`,
		data: {
			...form
		}
	}, 'post')
}

export {
	getOrganization,
	getSchools,
	postOrganization
}