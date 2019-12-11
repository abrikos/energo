import React from 'react';
import MainMenu from './MainMenu';
import Navbar from './Navbar';
import TopBar from './TopBar';

import './styles.scss';

export default class Header extends React.Component {
	render() {
		return (
			<>
				<TopBar />
				<Navbar />
				<MainMenu />
			</>
		);
	}
}
