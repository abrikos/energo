import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, FileInput } from '@smartplatform/ui';

@withRouter
@observer
export default class DirectionEdit extends React.Component {
	@observable record;
	@observable id;
	@observable imagePreview;
	@observable editor;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;

		let record;
		if (!isNaN(id)) {
			record = await store.model.Direction.findById(id);
			this.id = id;
			this.imagePreview = record.thumbnail ? record.downloadFile('thumbnail') : null;
		} else {
			record = new store.model.Direction();
			record.status = false;
		}
		this.record = record;
	};

	@action handleImageInput = image => {
		this.imagePreview = image && image.preview;
	};

	@action deleteImage = () => {
		this.imagePreview = null;
	};

	@action save = async record => {
		this.id && this.props.history.push('/admin/direction');
		this.id = record.id;
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Должность: {this.record.name}</h1>;
			} else {
				return <h1>Новая должность</h1>;
			}
		};

		return (
			<div>
				{title()}
				<Form record={this.record} onSave={this.save} rootPath="/admin" stay>
					<Field property="post" label="Название должности" />
					<Field property="name" label="ФИО представителя" />

					<Field property="thumbnail">
						<FileInput label="Миниатюра" onChange={this.handleImageInput} onDelete={this.deleteImage} />
					</Field>

					{this.imagePreview && <img alt="Фото" style={{ width: '250px' }} src={this.imagePreview} />}
				</Form>
			</div>
		);
	}
}
