import React from 'react';
import NewsFeed from './NewsFeed.js';
import './styles.scss';
import OnePage from './OnePage.js';
import { Route } from 'react-router-dom';

export default class NewsPage extends React.Component {
	render() {
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<Route path="/news/" exact render={() => <NewsFeed />} />
					<Route path="/news/:id" exact render={() => <OnePage />} />
				</div>
			</div>
		);
	}
}
