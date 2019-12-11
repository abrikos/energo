import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class RealizationPage extends React.Component {
	@observable realization;

	async componentWillMount() {
		const realization = await store.model.Realization.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.realization = realization;
	}

	render() {
		if (!this.realization) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.realization.map(realization => (
										<li key={`realization/${realization.id}`}>
											<Link to={`/realization/${realization.id}`}> {realization.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.realization.map(realization => (
									<React.Fragment key={`route-${realization.id}`}>
										<Route
											path={`/realization/${realization.id}`}
											exact
											render={() => (
												<Records page="realization" categoryId={realization.id} title={realization.category} />
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
