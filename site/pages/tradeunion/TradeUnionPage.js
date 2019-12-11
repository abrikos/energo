import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class TradeUnionPage extends React.Component {
	@observable tradeunion;

	async componentWillMount() {
		const tradeunion = await store.model.TradeUnion.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.tradeunion = tradeunion;
	}

	render() {
		if (!this.tradeunion) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.tradeunion.map(tradeunion => (
										<li key={`tradeunion/${tradeunion.id}`}>
											<Link to={`/tradeunion/${tradeunion.id}`}> {tradeunion.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.tradeunion.map(tradeunion => (
									<React.Fragment key={`route-${tradeunion.id}`}>
										<Route
											path={`/tradeunion/${tradeunion.id}`}
											exact
											render={() => (
												<Records page="tradeunion" categoryId={tradeunion.id} title={tradeunion.category} />
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
