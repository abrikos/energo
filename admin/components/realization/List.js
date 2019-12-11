import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Button } from '@smartplatform/ui';

import CategoryList from '../table/CategoryList';

@observer
export default class RealizationList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Realization.find();
		console.log(records);
		this.records = records;
	}

	render() {
		if (!this.records) {
			return <Loader />;
		}
		return (
			<div>
				<div className="filters">
					<Button label="Добавить категорию" onClick={() => this.props.history.push('/admin/realizations/new')} />
				</div>
				<CategoryList records={this.records} />
			</div>
		);
	}
}
