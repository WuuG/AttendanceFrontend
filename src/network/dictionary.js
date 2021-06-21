import { request } from './request';

const getDictionaries = (curPage, pageSize) => {
	return request({
		url: 'dictionaries',
		data: {
			...arguments
		}
	}, 'get')
}

export {
	getDictionaries
}