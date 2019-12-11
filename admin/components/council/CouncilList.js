import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class CouncilList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Council.find();
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
					<Button label="Добавить публикацию" onClick={() => this.props.history.push('/admin/councils/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="name" label="Название" />
					<Column property="subheader" label="Подзаголовок" />

					<Column property="thumbnail" label="Миниатюра">
						<Image />
					</Column>
					<Column property="status" label="Опубликовано" />
				</Table>
			</div>
		);
	}
}
