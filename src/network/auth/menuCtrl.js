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

/** 
 * 菜单排序
 * @pid 父节点id
 * @MenuArray 字节点所有菜单id的数组。
*/
const putMenuOrders = (pid, MenuArray) => {
	return request({
		url: `menus/${pid}/orders`,
		data: MenuArray
	}, 'put')
}
export {
	getMenus,
	postMenu,
	patchMenu,
	deleteMenu,
	getMymenus,
	putMenuOrders
}