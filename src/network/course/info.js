import { request } from '../request';

const getCourse = (curPage, pageSize) => {
	return request({
		url: 'courses',
		params: {
			curPage,
			pageSize
		}
	})
}

export {
	getCourse,
}