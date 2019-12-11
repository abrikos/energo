import { action, observable } from 'mobx';

export default class UIStore {
	@observable page = null;
	@observable menuVisible = false;
	@observable showDevConfig = false;

	constructor(store) {
		this.store = store;
	}

	@action setPage = pageName => {
		this.page = pageName;
	};
}
