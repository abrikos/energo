import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class OtherPage extends React.Component {
	@observable other;

	async componentWillMount() {
		const other = await store.model.Other.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.other = other;
	}

	render() {
		if (!this.other) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.other.map(other => (
										<li key={`other/${other.id}`}>
											<Link to={`/other/${other.id}`}> {other.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.other.map(other => (
									<React.Fragment key={`route-${other.id}`}>
										<Route
											path={`/other/${other.id}`}
											exact
											render={() => (
												<Records page="other" categoryId={other.id} title={other.category} />
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
