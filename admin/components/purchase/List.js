import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Button } from '@smartplatform/ui';

@observer
export default class PurchasenList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Purchase.find();
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
					<Button label="Добавить категорию" onClick={() => this.props.history.push('/admin/purchases/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="category" label="Название категории" />
				</Table>
			</div>
		);
	}
}
