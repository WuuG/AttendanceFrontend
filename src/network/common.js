class Query {
	constructor(query) {
		this.curPage = query.pageIndex
		this.pageSize = query.pageSize
		this.search = query.key
	}
}

export {
	Query
}