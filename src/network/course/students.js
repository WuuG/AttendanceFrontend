import { request } from '../request';

const getStudents = (courseId) => {
	return request({
		url: `courses/${courseId}/students`
	}, 'get')
}

export {
	getStudents
}