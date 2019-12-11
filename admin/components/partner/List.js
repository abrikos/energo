import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class PartnersList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Partner.find();
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
					<Button label="Добавить партнера" onClick={() => this.props.history.push('/admin/partners/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="name" label="Название партнера" />
					<Column property="link" label="ссылка" />
					<Column property="thumbnail" label="Изображение">
						<Image />
					</Column>
				</Table>
			</div>
		);
	}
}
