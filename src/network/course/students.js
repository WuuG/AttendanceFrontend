import { request } from '../request';

const getStudents = (courseId, form) => {
	return request({
		url: `courses/${courseId}/students`,
		params: {
			...form
		}
	}, 'get')
}
const getCourseById = (id) => {
	return request({
		url: `courses/${id}`,
	}, 'get')
}

export {
	getStudents,
	getCourseById
}