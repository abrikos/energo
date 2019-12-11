import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;

		console.log('dashboard!!!');
	}

	render() {
		return <div />;
	}
}
