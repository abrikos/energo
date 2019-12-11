import React from 'react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from 'root/site/store';

import { HtmlValue, jsonToHTML, Loader } from '@smartplatform/ui';

import './styles.scss';

@withRouter
@observer
export default class SingleBranch extends React.Component {
	@observable branch;

	componentDidMount() {
		this.init();
	}

	@action init = async () => {
		const { id } = this.props.match.params;
		console.log(id);
		const brach = await store.model.Branch.findById(id, {
			include: [
				{
					relation: 'stations',
				},
			],
		});
		console.log(brach);
		console.log(brach.stations());
		this.branch = brach;
	};

	render() {
		if (!this.branch) {
			return (
				<div className="MainBackGroundClient">
					<Loader />
				</div>
			);
		}

		const {
			name,
			address,
			head,
			power,
			info,
			email,
			headPhone,
			engineer,
			engineerPhone,
		} = this.branch;
		const stations = this.branch.stations();
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<h2 className="ClassNameSection client">{name}</h2>

					<div className="row">
						<div className="col-4 white1">
							<ul className="push">
								Перечень обслуживаемых станций:
								{stations.map(station => (
									<li key={`station - ${station.id}`}>{station.name}</li>
								))}
							</ul>
						</div>
						<div className="col-8 bransh">
							<p>Общая установленная электрическая мощность – {power} кВт</p>
							<HtmlValue value={jsonToHTML(info)} />
						</div>
					</div>
					<div className="row">
						<div className="col-5">
							<p className="ClassNameSection client">Адрес</p>

							<ul className="push brach">
								<li>{address}</li>
								<li>e-mail – {email}</li>
							</ul>
						</div>
						<div className="col-4">
							<p className="ClassNameSection client">Руководитель</p>
							<ul className="push brach">
								<li>{head}</li>
								<li>Телефон {headPhone}</li>
							</ul>
						</div>
						<div className="col-3">
							<p className="ClassNameSection client">Главный инженер </p>

							<ul className="push brach">
								<li>{engineer}</li>
								<li>Телефон {engineerPhone}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
