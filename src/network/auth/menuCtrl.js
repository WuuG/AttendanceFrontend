import { request } from '../request';

const getMenus = () => {
	return request({
		url: 'menus',
	}, 'get')
}

const postMenu = (form) => {
	return request({
		url: 'menus',
		data: {
			...form
		}
	}, 'post')
}

const patchMenu = (form) => {
	return request({
		url: `menus/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}

const deleteMenu = (id) => {
	return request({
		url: `menus/${id}`,
	}, 'delete')
}

const getMymenus = () => {
	return request({
		url: `menus/my`,
	}, 'get')
}
export {
	getMenus,
	postMenu,
	patchMenu,
	deleteMenu,
	getMymenus
}