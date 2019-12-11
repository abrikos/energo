import qs from 'qs';
import { createBrowserHistory } from 'history';
import { observable } from 'mobx';
import { Rest, ModelStore } from '@smartplatform/model-store';
import { RouteStore } from '@smartplatform/route-store';
import { LocalStore } from '@smartplatform/local-store';
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

	adminPath = '/admin';

	constructor() {
		this.history = createBrowserHistory();
		this.local = new LocalStore();
		this.ui = new UIStore();

		this.rest = new Rest();
		this.model = new ModelStore({
			transport: this.rest,
			cache: true,
			autoConnect: false,
		});

		this.route = new RouteStore({
			history: this.history,
			decode: qs.parse,
			encode: qs.stringify,
		});

		this.local.extend({
			mapLayers: {
				Emergency: 1,
				MetroStation: 2,
				Park: 4,
				MetroLine: 5,
			},
		});
		this.local.save();

		this.model.connect(store => {
			store.plurals = {};
			Object.values(store).forEach(value => {
				if (value && value.INFO && value.INFO.plural) {
					store.plurals[value.INFO.plural.toLowerCase()] = value;
					value.prototype.downloadNginxFile = function(property) {
						return this.downloadFile(property)
							.replace('/api/containers/', '/storage/')
							.replace('/download', '');
					};
				}
			});
		});
	}
}

window.APP_STORE = new AppStore();

export default window.APP_STORE;
