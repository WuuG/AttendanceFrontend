import { request } from '../request';

const getCourse = (curPage, pageSize) => {
	return request({
		url: 'courses',
		params: {
			curPage,
			pageSize
		}
	}, 'get')
}
const postCourse = (form) => {
	return request({
		url: 'courses',
		data: {
			...form
		}
	}, 'post')
}
const getOrganization = (orgId) => {
	return request({
		url: `organizations/${orgId}`
	}, 'get')
}
const putCourseAvatar = (courseId, form) => {
	return request({
		url: `courses/${courseId}/avatar`,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data: form
	}, 'put')
}
const patchCourse = (form) => {
	return request({
		url: `courses/${form.id}`,
		data: form
	}, 'patch')
}
const deleteCourse = (courseId) => {
	return request({
		url: `courses/${courseId}`,
	}, 'delete')
}

export {
	getCourse,
	postCourse,
	getOrganization,
	putCourseAvatar,
	patchCourse,
	deleteCourse
}