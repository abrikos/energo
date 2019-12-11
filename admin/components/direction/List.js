import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class DirectionList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Direction.find();
		this.records = records;
	}

	render() {
		if (!this.records) {
			return <Loader />;
		}
		return (
			<div>
				<div className="filters">
					<Button
						label="Добавить должность"
						onClick={() => this.props.history.push('/admin/directions/new')}
					/>
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="post" label="Название должности" />
					<Column property="name" label="ФИО представителя" />

					<Column property="thumbnail" label="Миниатюра">
						<Image />
					</Column>
				</Table>
			</div>
		);
	}
}
