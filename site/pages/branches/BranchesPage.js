import React from 'react';

import { Route } from 'react-router-dom';

import './styles.scss';

import Single from './Single';
import List from './List';

export default class BranchesPage extends React.Component {
	render() {
		return (
			<div>
				<Route exact path="/branches/:id" render={() => <Single />} />
				<Route exact path="/branches/" render={() => <List />} />
			</div>
		);
	}
}
