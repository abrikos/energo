import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, FileInput } from '@smartplatform/ui';

@withRouter
@observer
export default class ArticleEdit extends React.Component {
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
			record = await store.model.Article.findById(id);
			this.id = id;
			this.imagePreview = record.thumbnail ? record.downloadFile('thumbnail') : null;
		} else {
			record = new store.model.Article();
			record.status = false;
		}
		this.record = record;
		console.log('this record', this.record, this.imagePreview);
		console.log(await this.record.editorAttachments());
	};

	@action handleImageInput = image => {
		this.imagePreview = image && image.preview;
	};

	@action deleteImage = () => {
		this.imagePreview = null;
	};

	editorInstance = instance => {
		this.editor = instance;
	};

	handleProgress = (file, event) => {
		if (this.editor) {
			this.editor.onUploadProgress(file, event.percent);
		}
	};

	handleEnd = (error, result, attachment, callback) => {
		if (error) {
			console.warn('error uploading file', error);
		} else {
			const url = attachment.downloadFile('filename');
			if (this.editor) {
				this.editor.onUploadEnd(attachment['filename']);
			}
			callback(url);
		}
	};

	uploader = async (file, callback) => {
		const attachment = new store.model.Attachment({
			filename: file.name,
		});

		console.log(attachment);

		try {
			await attachment.save();
			// const editorAttachments = await this.record.editorAttachments
			this.record.editorAttachments.add(attachment.id);
			attachment
				.uploadFile('filename', file)
				.on('progress', event => this.handleProgress(file, event))
				.end((error, result) => this.handleEnd(error, result, attachment, callback));
		} catch (error) {
			console.error('somthing wrong', error);
		}
	};

	@action save = async record => {
		// console.log('saving record', record);
		this.id && this.props.history.push('/admin/articles');
		// await record.save();
		this.id = record.id;
		// console.log('saved');
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Публикация: {this.record.name}</h1>;
			} else {
				return <h1>Новая публикация</h1>;
			}
		};

		return (
			<div>
				{title()}
				<Form record={this.record} onSave={this.save} rootPath="/admin" stay>
					<Field property="name" label="Название" />
					<Field property="subheader" label="Подзаголовок" />
					{this.id ? (
						<Field property="content" label="Содержание">
							<SlateEditor uploader={this.uploader} instance={this.editorInstance} />
						</Field>
					) : (
						<div> Создайте публикацию, чтобы добавить содержимое</div>
					)}
					<Field type="boolean" property="status" label="Опубликовано" />

					<Field property="thumbnail">
						<FileInput
							label="Миниатюра"
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
