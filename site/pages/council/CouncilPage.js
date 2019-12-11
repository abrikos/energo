import React from 'react';
import CouncilPageFeed from './CouncilPageFeed.js';
import './styles.scss';
import OnePageCouncil from './OnePageCouncil.js';
import { Route } from 'react-router-dom';

export default class CouncilPage extends React.Component {
	render() {
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<Route path="/council/" exact render={() => <CouncilPageFeed />} />
					<Route path="/council/:id" exact render={() => <OnePageCouncil />} />
				</div>
			</div>
		);
	}
}
