import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class MainSliderList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.MainSlider.find();
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
					<Button label="Добавить слайдер" onClick={() => this.props.history.push('/admin/mainsliders/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="thumbnail" label="Слайд">
						<Image />
					</Column>
					<Column property="name" label="Название ссылки" />
					<Column property="link" label="ссылка" />
				</Table>
			</div>
		);
	}
}
