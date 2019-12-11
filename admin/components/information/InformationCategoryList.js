import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';
import { withRouter } from 'react-router-dom';

import { Table, Column, Loader, Button } from '@smartplatform/ui';

@withRouter
@observer
export default class InformationCategoryList extends React.Component {
	@observable records;

	componentDidMount() {
		this.init();
	}

	componentDidUpdate() {
		// this.init();
	}

	@action init = async () => {
		const records = await store.model.CategoryRecord.find({
			where: {
				informationId: this.props.category.id,
			},
		});
		store.ui.setPage(this.props.category.id);
		this.records = records;
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}

		const onRowClick = record => {
			this.props.history.push(`/admin/information_tabs/${this.props.category.id}/edit/${record.id}`);
		};

		return (
			<div>
				<div className="filters">
					<Button
						label="Добавить запись"
						onClick={() => this.props.history.push(`/admin/information_tabs/${this.props.category.id}/edit/create`)}
					/>
				</div>
				<Table records={this.records} rootPath="/admin" onRowClick={onRowClick}>
					<Column property="title" label="Заголовок" />
					<Column property="createdAt" label="Дата создания" />
				</Table>
			</div>
		);
	}
}
