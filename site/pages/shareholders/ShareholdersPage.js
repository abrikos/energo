import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class ShareholdersPage extends React.Component {
	@observable shareholders;

	async componentWillMount() {
		const shareholders = await store.model.Shareholder.find({ where: { or: [{ hide: null }, { hide: false }] } });
		this.shareholders = shareholders;
	}

	render() {
		if (!this.shareholders) {
			// return <Loader />;
			return <div />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.shareholders.map(shareholder => (
										<li key={`shareholders/${shareholder.id}`}>
											<Link to={`/shareholders/${shareholder.id}`}> {shareholder.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.shareholders.map(shareholder => (
									<React.Fragment key={`route-${shareholder.id}`}>
										<Route
											path={`/shareholders/${shareholder.id}`}
											exact
											render={() => (
												<Records page="shareholder" categoryId={shareholder.id} title={shareholder.category} />
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
