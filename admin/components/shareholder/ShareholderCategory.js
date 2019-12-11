import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, Attachments, ManyToManySelect } from '@smartplatform/ui';

@withRouter
@observer
export default class SareholderCategory extends React.Component {
	@observable record;
	@observable files;
	@observable id;
	@observable imagePreview;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;
		const categoryId = this.props.category.id;
		store.ui.setPage(categoryId);

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
			record.shareholderId = categoryId;
			files = new store.model.CategoryRecordFile();
		}

		this.record = record;
		this.files = files;
	};

	onSave = async record => {
		this.id && this.props.history.push(`/admin/shareholder/${this.props.category.id}/list`);
		this.files.categoryRecordId = record.id;
		await this.files.save();
		this.id = record.id;
	};

	render() {
		console.log('My fking props', this.props);
		if (!this.record) {
			return <Loader />;
		}

		const controls = (
			<button
				className="btn"
				style={{ marginLeft: '2rem' }}
				onClick={() => this.props.history.goBack()}
			>
				Отмена
			</button>
		);

		const onDelete = () => {
			this.props.history.push(`/admin/shareholder/${this.props.category.id}/list`);
		};
		return (
			<Form record={this.record} onDelete={onDelete} onSave={this.onSave} stay rootPath="/admin">
				<Field property="title" label="Заголовок" />
				<Field property="content" label="Содержание">
					<SlateEditor noImages />
				</Field>
				{/* <Field relation="shareholders" property="category" /> */}
				{this.id && this.files && <Attachments store={store.model} record={this.files} />}

				{!this.id && <div> Создайте запись чтобы добавить файлы</div>}
			</Form>
		);
	}
}
