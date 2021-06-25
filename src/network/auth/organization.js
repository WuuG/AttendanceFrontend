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
const deleteOrganization = (orgId) => {
	return request({
		url: `organizations/${orgId}`,
	}, 'delete')
}
const editeOrganization = (orgId, form) => {
	return request({
		url: `organizations/${orgId}`,
		data: form
	}, 'patch')
}

export {
	getOrganization,
	getSchools,
	postOrganization,
	deleteOrganization,
	editeOrganization
}