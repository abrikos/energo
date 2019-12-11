import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

import { PAGES } from './pages';
import store from 'root/site/store';
import './styles.scss';

import img from './001.jpg';
@observer
export default class Navbar extends React.Component {
	@observable currentPage;

	componentDidMount() {
		this.currentPage = store.route.path;
	}

	@action setPage = page => {
		this.currentPage = page;
	};

	render() {
		const renderMenuItems = () => {
			return PAGES.map(page => (
				<li
					key={page.link}
					className={`navbar-item ${this.currentPage === page.link ? 'active' : ''}`}
				>
					<Link className="navbar-link" to={page.link} onClick={() => this.setPage(page.link)}>
						{page.name}
					</Link>
				</li>
			));
		};

		return (
			<nav className="top-navbar navbar-expand-lg ">
				<ul className="navbar-nav">{renderMenuItems()}</ul>
			</nav>
		);
	}
}
