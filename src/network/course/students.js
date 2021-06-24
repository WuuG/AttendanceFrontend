import { request } from '../request';

const getStudents = (courseId) => {
	return request({
		url: `courses/${courseId}/students`
	}, 'get')
}
const getCourseById = (id) => {
	return request({
		url: `courses/${id}`
	}, 'get')
}

export {
	getStudents,
	getCourseById
}