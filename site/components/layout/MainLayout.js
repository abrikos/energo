import React from 'react';

import './styles.scss';

import { Header, Footer } from '../../components';

export default class MainLayout extends React.Component {
	render() {
		return (
			<div>
				<Header />

				{this.props.children}
				<Footer />
			</div>
		);
	}
}
