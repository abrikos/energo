import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class ConnectionPage extends React.Component {
	@observable connection;

	async componentWillMount() {
		const connection = await store.model.Connection.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.connection = connection;
	}

	render() {
		if (!this.connection) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.connection.map(connection => (
										<li key={`connection/${connection.id}`}>
											<Link to={`/connection/${connection.id}`}> {connection.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.connection.map(connection => (
									<React.Fragment key={`route-${connection.id}`}>
										<Route
											path={`/connection/${connection.id}`}
											exact
											render={() => (
												<Records page="connection" categoryId={connection.id} title={connection.category} />
											)}
										/>
									</React.Fragment>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
