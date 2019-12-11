import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class PurchasesPage extends React.Component {
	@observable purchases;

	async componentWillMount() {
		const purchases = await store.model.Purchase.find({ where: { or: [{ hide: null }, { hide: false }] } });
		this.purchases = purchases;
	}

	render() {
		if (!this.purchases) {
			return <Loader />;
		}

		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.purchases.map(purchase => (
										<li key={`purchases-${purchase.id}`}>
											<Link to={`/purchases/${purchase.id}`}> {purchase.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.purchases.map(purchase => (
									<React.Fragment key={`route-${purchase.id}`}>
										<Route
											path={`/purchases/${purchase.id}`}
											exact
											render={() => <Records page="purchase" categoryId={purchase.id} title={purchase.category} />}
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
