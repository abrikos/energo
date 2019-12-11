import { action, observable } from 'mobx';

export default class UIStore {
	@observable page = null;
	@observable menuVisible = false;
	@observable showDevConfig = false;
	@observable showSubmenu = false;

	constructor(store) {
		this.store = store;
	}

	@action setPage = pageName => {
		this.page = pageName;
		this.showSubmenu = false;
	};

	@action setSubmenu = page => {
		this.showSubmenu = this.showSubmenu ? false : page;
	};
}
