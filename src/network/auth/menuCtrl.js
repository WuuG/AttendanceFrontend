import { request } from '../request';

const getMenus = () => {
	return request({
		url: 'menus',
	}, 'get')
}

export {
	getMenus
}