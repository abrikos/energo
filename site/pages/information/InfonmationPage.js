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
	@observable information;

	async componentWillMount() {
		const information = await store.model.Information.find({ where: { or: [{ hide: null }, { hide: false }] } });
		const allInformation = await store.model.Information.find();
		console.log('all', allInformation);
		this.information = information;
	}

	render() {
		if (!this.information) {
			return <Loader />;
		}
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.information.map(information => (
										<li key={`information/${information.id}`}>
											<Link to={`/information/${information.id}`}> {information.category} </Link>
										</li>
									))}
									<li>
											<Link to={`/tariff`}> Тарифы </Link>
										</li>
									<li>
											<Link to={`/connection`}> Технологическое присоединение </Link>
										</li>
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								{this.information.map(information => (
									<React.Fragment key={`route-${information.id}`}>
										<Route
											path={`/information/${information.id}`}
											exact
											render={() => (
												<Records page="information" categoryId={information.id} title={information.category} />
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
