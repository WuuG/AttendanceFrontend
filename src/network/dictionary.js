import { request } from './request';

const getDictionaries = (curPage, pageSize) => {
	return request({
		url: 'dictionaries',
		params: {
			curPage,
			pageSize,
			orderBy: 'createTime'
		}
	}, 'get')
}
const postDictionaries = (form) => {
	return request({
		url: 'dictionaries',
		data: {
			...form
		}
	}, 'post')
}
const patchDictionary = (form) => {
	return request({
		url: `dictionaries/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}
const patchDetail = (dicId, form) => {
	return request({
		url: `dictionaries/${dicId}/${form.id}`,
		data: {
			...form
		}
	}, 'patch')
}

class AddForm {
	constructor(form) {
		this.form = { ...form }
		if (this.form.details.length > 0) {
			this.transformation()
			this.addDefault()
		}
		console.log(this.form);
	}
	// 先进行转型将字符串转为Boolean
	transformation() {
		this.form.details.forEach(detail => {
			for (const x in detail) {
				if (x !== 'default' && x !== 'hidden') {
					continue;
				}
				detail[x] = detail[x] === '是' ? true : false;
			}
		})
	}
	addDefault() {
		let flag = false
		this.form.details.forEach((detail) => {
			if (detail.default === true) {
				this.form.defaultValue = detail.value;
				this.form.defaultName = detail.name;
				flag = true
			}
		});
		if (flag) return
		this.form.defaultValue = this.form.details[0].value;
		this.form.defaultName = this.form.details[0].name;
	}
}
class DetailForm {
	constructor(form) {
		this.form = { ...form }
		for (const x in this.form) {
			if (x !== 'default' && x !== 'hidden') {
				continue
			}
			this.form[x] = this.form[x] == 'true' ? true : false
		}
	}
}

export {
	getDictionaries,
	postDictionaries,
	patchDictionary,
	patchDetail,
	AddForm,
	DetailForm
}