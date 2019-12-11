import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { PAGES } from './pages';
import store from 'root/site/store';
import './styles.scss';

export default class MainMenu extends React.Component {
	// showSettings(event) {
	// 	event.preventDefault();
	// }

	render() {
		return (
			<Menu id={'sidebar'} className={'my-menu'} right>
				{PAGES.map(page => (
					<Link key={page.link} to={page.link} className="menu-item">
						{page.name}
					</Link>
				))}
			</Menu>
		);
	}
}
