import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class TariffPage extends React.Component {
	@observable tariff;

	async componentWillMount() {
		const tariff = await store.model.Tariff.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.tariff = tariff;
	}

	render() {
		if (!this.tariff) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.tariff.map(tariff => (
										<li key={`tariff/${tariff.id}`}>
											<Link to={`/tariff/${tariff.id}`}> {tariff.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.tariff.map(tariff => (
									<React.Fragment key={`route-${tariff.id}`}>
										<Route
											path={`/tariff/${tariff.id}`}
											exact
											render={() => (
												<Records page="tariff" categoryId={tariff.id} title={tariff.category} />
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
