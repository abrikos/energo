import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/site/store';
import { Link } from 'react-router-dom';

import { Loader } from '@smartplatform/ui';

import InteractiveMap from './InteractiveMap';

import './styles.scss';

export const InteractiveMapLi = [
	{
		link: '',
		name: 'Абыйский улус',
	},
	{
		link: '',
		name: 'Анабарский улус',
	},
	{
		link: '',
		name: 'Алданский улус',
	},
	{
		link: '',
		name: 'Аллаиховский улус',
	},
	{
		link: './branches',
		name: 'Булунский улус',
	},
	{
		link: '',
		name: 'Верхоянский улус',
	},
	{
		link: '',
		name: 'Верхнеколымский улус',
	},
	{
		link: '',
		name: 'Жиганский улус',
	},
	{
		link: '',
		name: 'Кобяйский улус',
	},
	{
		link: '',
		name: 'Момский улус',
	},
	{
		link: '',
		name: 'Нижнеколымский улус',
	},
	{
		link: '',
		name: 'Оймяконский улус',
	},
	{
		link: '',
		name: 'Оленекский улус',
	},
	{
		link: '',
		name: 'Олекминский улус',
	},
	{
		link: '',
		name: 'Среднеколымский улус',
	},
	{
		link: '',
		name: 'Усть-Янский улус',
	},
	{
		link: '',
		name: 'Эвено-Бытантайский улус',
	},
];

const ListBranches = ({ branches }) =>
	branches.map(branch => (
		<li key={`branch-${branch.id}`}>
			<Link to={`/branches/${branch.id}`} className="WeServeLi">
				{branch.name}
			</Link>
		</li>
	));
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
		return (
			<div className="container">
				<div className="row align-items-center">
					<div className="col ClassNameSection"> Мы обслуживаем </div>
				</div>
				<div className="row">
					{this.branches ? (
						<div className="col-5">
							<ListBranches branches={this.branches} />
						</div>
					) : (
						<Loader />
					)}
					<div className="col-7">
						<InteractiveMap />
					</div>
				</div>
			</div>
		);
	}
}
