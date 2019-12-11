import qs from 'qs';
import { createBrowserHistory } from 'history';
import { observable } from 'mobx';
import { Rest, ModelStore } from '@smartplatform/model-store';
import { RouteStore } from '@smartplatform/route-store';
import { LocalStore } from '@smartplatform/local-store';
// import MapStore from './components/map/mapStore';
// import ChatStore from './components/chat/store';
// import NotificationsStore from './components/notifications/store';
import UIStore from './uiStore';

/**
 * Глобальный контейнер сторов
 */
export class AppStore {
	local; // Локальное хранилище
	model; // Хранилище моделей
	route; // Хранилище маршрута браузера
	api; // API обмена с сервером
	admin; // Хранилище @admin
	ui; // ui

	@observable noMap = false;

	adminPath = '/admin';
	subscribers = [];

	constructor() {
		this.history = createBrowserHistory();
		this.ui = new UIStore();

		this.local = new LocalStore();

		this.local.extend({
			updateChat: true,
			connectToSip: true,
			listConfig: this.listConfig,
		});

		this.local.save();

		this.rest = new Rest();
		this.model = new ModelStore({
			transport: this.rest,
			cache: false,
			autoConnect: false,
		});

		this.route = new RouteStore({
			history: this.history,
			decode: qs.parse,
			encode: qs.stringify,
		});
	}

	init = async () => {
		await this.model.connect();
		this.model.plurals = {};
		Object.values(this.model).forEach(value => {
			if (value && value.INFO && value.INFO.plural) {
				this.model.plurals[value.INFO.plural.toLowerCase()] = value;
			}
		});
	};

	subscribeOnHMR = callback => {
		this.subscribers.push(callback);
	};

	unsubscribeOnHMR = callback => {
		const index = this.subscribers.findIndex(cb => cb === callback);
		if (index !== -1) this.subscribers.splice(index, 1);
	};

	fireHMR = () => {
		console.log('fireHMR');
		this.subscribers.forEach(cb => cb());
	};
}

window.APP_STORE = new AppStore();

export default window.APP_STORE;
