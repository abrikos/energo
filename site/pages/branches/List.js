import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/site/store';
import { Link } from 'react-router-dom';

import { Loader } from '@smartplatform/ui';
import karta from './img/karta.png';
import './styles.scss';
import InteractiveMap from './InteractiveMap';

@observer
export default class ListBranch extends React.Component {
	@observable branches;

	componentDidMount() {
		this.init();
	}

	@action init = async () => {
		const braches = await store.model.Branch.find({ order: 'name ASC' });

		this.branches = braches;
	};

	render() {
		if (!this.branches) {
			return (
				<div className="MainBackGroundClient">
					<Loader />
				</div>
			);
		}

		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<div className="row align-items-center">
						<div className="col ClassNameSection"> Мы обслуживаем </div>
					</div>
					<div className="row">
						<div className="col-5">
							<ul className="branches-list">
								{this.branches.map(branch => (
									<li key={`branch-${branch.id}`}>
										<Link to={`/branches/${branch.id}`}>{branch.name}</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="col-7">
							<InteractiveMap />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
