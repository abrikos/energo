import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, Attachments } from '@smartplatform/ui';

@withRouter
@observer
export default class InformationCategory extends React.Component {
	@observable record;
	@observable files;
	@observable id;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;
		const categoryId = this.props.category.id;
		store.ui.setPage(categoryId);

		console.log(id);
		let files;
		let record;
		if (!isNaN(id)) {
			record = await store.model.CategoryRecord.findById(id);
			files = await store.model.CategoryRecordFile.find({ where: { categoryRecordId: id } });
			if (files.totalCount === 0) {
				files = new store.model.CategoryRecordFile();
				files.categoryRecordId = id;
				await files.save();
			} else {
				files = files[0];
			}
			this.id = id;
		} else {
			record = new store.model.CategoryRecord();
			record.informationId = categoryId;
			files = new store.model.CategoryRecordFile();
		}

		this.record = record;
		this.files = files;
	};

	@action onSave = async record => {
		this.id && this.props.history.push(`/admin/information_tabs/${this.props.category.id}/list`);
		this.files.categoryRecordId = record.id;
		await this.files.save();
		this.id = record.id;
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}

		const onDelete = () => {
			this.props.history.push(`/admin/information_tabs/${this.props.category.id}/list`);
		};

		return (
			<div>
				<Form record={this.record} onDelete={onDelete} onSave={this.onSave} stay rootPath="/admin">
					<Field property="title" label="Заголовок" />
					<Field property="content" label="Содержание">
						<SlateEditor noImages />
					</Field>
					{this.id && this.files && <Attachments store={store.model} record={this.files} />}

					{!this.id && <div> Создайте запись чтобы добвать файлы</div>}
				</Form>
			</div>
		);
	}
}
