import React from 'react';
import { Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import '@smartplatform/ui/src/styles/vars.scss';
// import Login from './Login';
import { DragDropContext } from '@smartplatform/ui';

import * as Components from './components';

import 'bootstrap-4-grid/scss/grid.scss';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './styles/main.scss';

import UILayer from './UILayer';

import store from './store';
import t from '../i18n';

// import './styles/main.scss';

@observer
export default class App extends React.Component {
	render() {
		return (
			<DragDropContext>
				<Router history={store.history}>
					{store.model.isInitialized && (
						<Components.MainLayout>
							{/* <Components.Header />					 */}
							<UILayer />
							{/* <Components.Footer /> */}
						</Components.MainLayout>
					)}
				</Router>
			</DragDropContext>
		);
	}
}
