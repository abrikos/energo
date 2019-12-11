import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';
import { Records } from '../../components/record';

@observer
export default class ElectricalsafetiesPage extends React.Component {
	@observable electricalsafety;

	async componentWillMount() {
		const electricalsafety = await store.model.ElectricalSafety.find({
			where: { or: [{ hide: null }, { hide: false }] },
		});
		this.electricalsafety = electricalsafety;
	}

	render() {
		if (!this.electricalsafety) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.electricalsafety.map(electricalsafety => (
										<li key={`electricalsafety/${electricalsafety.id}`}>
											<Link to={`/electricalsafeties/${electricalsafety.id}`}> {electricalsafety.category} </Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.electricalsafety.map(electricalsafety => (
									<React.Fragment key={`route-${electricalsafety.id}`}>
										<Route
											path={`/electricalsafeties/${electricalsafety.id}`}
											exact
											render={() => (
												<Records
													page="electricalsafety"
													categoryId={electricalsafety.id}
													title={electricalsafety.category}
												/>
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
