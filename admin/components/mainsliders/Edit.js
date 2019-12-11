import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, ImageInput, FileInput } from '@smartplatform/ui';

@withRouter
@observer
export default class MainSliderEdit extends React.Component {
	@observable record;
	@observable id;
	@observable imagePreview;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;

		let record;
		if (!isNaN(id)) {
			record = await store.model.MainSlider.findById(id);
			this.id = id;
			this.imagePreview = record.thumbnail ? record.downloadFile('thumbnail') : null;
		} else {
			record = new store.model.MainSlider();
		}
		this.record = record;
		console.log('this record', this.record, this.imagePreview);
	};

	@action handleImageInput = image => {
		this.imagePreview = image && image.preview;
	};

	@action deleteImage = () => {
		this.imagePreview = null;
	};

	save = async record => {
		// console.log('saving record', record);
		await record.save();
		// console.log('saved');
		this.props.history.push('/admin/mainsliders');
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Слайдер: {this.record.name}</h1>;
			} else {
				return <h1>Новый слайдер</h1>;
			}
		};

		return (
			<div>
				{title()}
				<Form record={this.record} onSave={this.save} rootPath="/admin">
					<Field property="name" label="Название" />
					<Field property="link" label="Ссылка" />
					<Field property="thumbnail">
						<FileInput
							label="Изображение"
							onChange={this.handleImageInput}
							onDelete={this.deleteImage}
						/>
					</Field>

					{this.imagePreview && <img style={{ width: '250px' }} src={this.imagePreview} />}
				</Form>
			</div>
		);
	}
}
