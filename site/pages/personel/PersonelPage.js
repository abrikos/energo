import React from 'react';
import PersonelFeed from './PersonelFeed.js';
import { Route, Link } from 'react-router-dom';

import PersonelOnePage from './PersonelOnePage';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import store from 'root/site/store';

import './styles.scss';

@observer
export default class PersonelPage extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Vacancy.find({
			where: {
				and: [{ or: [{ removeAt: { gt: Date.now() } }, { removeAt: null }] }, { published: true }],
			},
		});
		console.log(this.props.location);
		if (records.totalCount > 0) {
			if (this.props.location.pathname === '/personel') {
				// this.props.history.push(`/personel/${records[0].id}`);
			}
			// this.records = records;
		}
		this.records = records;
	}

	render() {
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row">
						<div className="col-4 ">
							<div className="BlockButton">
								<ul className="purchases">
									{this.records && this.records.totalCount > 0 ? (
										this.records.map(record => (
											<li key={`record/${record.id}`}>
												<Link to={`/personel/${record.id}`}> {record.title} </Link>
											</li>
										))
									) : (
										<div>Записи не найдены</div>
									)}
								</ul>
							</div>
						</div>
						<div className="col-8">
							<div className="container">
								<Route path="/personel/:id" exact render={() => <PersonelOnePage />} />
							</div>
						</div>
					</div>
				</div>
			</div>

			// <div className="MainBackGroundClient">
			// 	<div className="container">
			// 		<Route path="/personel/" exact render={() => <PersonelFeed />} />
			// 		<Route path="/personel/:id" exact render={() => <PersonelOnePage />} />
			// 	</div>
			// </div>
		);
	}
}
