import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { AppContainer } from 'react-hot-loader';
import 'isomorphic-fetch';

import store from './store';
import App from './App';

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

// ReactDOM.render(<App/>, document.getElementById('root'));

const render = (Component) => {
	ReactDOM.render(
		<AppContainer warnings={false}>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	);
};

const init = async () => {
    await store.init();
    render(App);
};

init();

if (module.hot) {
	module.hot.accept();
}
