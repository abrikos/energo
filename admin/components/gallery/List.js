import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class GalleryList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Gallery.find();
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
					<Button label="Добавить альбом" onClick={() => this.props.history.push('/admin/galleries/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="title" label="Заголовок" />

					{/* <Column property="status" label="Опубликовано" /> */}
				</Table>
			</div>
		);
	}
}
