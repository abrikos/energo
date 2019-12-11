import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Button, Icon, Field, Loader, FileInput } from '@smartplatform/ui';

import './style.scss';

@withRouter
@observer
export default class GalleryEdit extends React.Component {
	@observable id;
	@observable gallery;
	@observable images;
	@observable imagePreview;
	@observable image;

	componentDidMount() {
		this.init();
	}

	@action init = async () => {
		const id = this.props.match.params.id;
		let gallery;
		let images;
		if (!isNaN(id)) {
			gallery = await store.model.Gallery.findById(id, {
				include: [
					{
						relation: 'images',
					},
				],
			});
			images = await gallery.images();

			this.imagePreview = gallery.thumbnail ? gallery.downloadFile('thumbnail') : null;
			this.id = id;
		} else {
			gallery = new store.model.Gallery();
		}

		this.gallery = gallery;
		console.log(this.gallery);

		this.images = images;
	};

	beforeSave = record => {
		// record.gameId = this.gameId;
	};

	handleEnd = (error, result, attachment, callback) => {
		if (error) {
			console.warn('error uploading file', error);
		} else {
			console.log('file uploaded', attachment.filename);
		}
	};

	@action imageUploader = async (files, callback) => {
		for (const file of files) {
			const fileType = file.type.split('/')[0];
			if (fileType !== 'image') {
				console.error('file is not image', file.name);
				continue;
			}
			const attachment = new store.model.Attachment({
				filename: file.name,
			});

			await attachment.save().then(res => {
				console.log(res);
				this.gallery.images.add(attachment.id);
				attachment
					.uploadFile('filename', file)
					.end((error, result) => this.handleEnd(error, result, attachment, callback));
			});
			this.images = await this.gallery.images();
			console.log('new images', await this.gallery.images());
		}
	};

	@action handleImageInput = image => {
		this.image = image;
		this.imagePreview = image && image.preview;
	};

	@action deleteImage = () => {
		this.imagePreview = null;
	};

	@action deleteImageFromGallery = async image => {
		await image.deleteFile('filename');
		this.gallery.images.remove(image.id);
		this.images = await this.gallery.images();
	};

	@action renderImages = () => {
		return (
			<React.Fragment>
				{this.images.map(image => {
					const fileImage = image.downloadFile('filename');

					return (
						<div key={`image-${image.id}`} className="game-results-image">
							<img src={fileImage} alt="" />
							<Icon
								className="delete-file-btn delete-image"
								icon="trash"
								onClick={() => this.deleteImageFromGallery(image)}
							/>
						</div>
					);
				})}
			</React.Fragment>
		);
	};

	@action onSave = async record => {
		this.id && this.props.history.push(`/admin/galleries/`);

		this.id = record.id;
		this.images = await record.images();
	};

	render() {
		console.log(this.images);
		if (!this.gallery) {
			return <Loader />;
		}
		const onDelete = () => {
			this.props.history.push(`/admin/galleries/`);
		};

		return (
			<Form onSave={this.onSave} record={this.gallery} onDelete={onDelete} rootPath="/admin" stay>
				<Field property="title" label="Заголовок альбома" required />

				{this.id && (
					<Field property="thumbnail">
						<FileInput
							label="Обложка альбома"
							onChange={this.handleImageInput}
							onDelete={this.deleteImage}
						/>
					</Field>
				)}

				{this.imagePreview && (
					<div>
						<img alt="" style={{ width: '250px' }} src={this.imagePreview} />
					</div>
				)}
				{this.images && (
					<div>
						<h3>Изображения альбома</h3>
						<div className="game-results-image-wrapper">
							{this.images && this.images.length !== 0 && this.renderImages()}
						</div>

						<Dropzone onDrop={this.imageUploader.bind(this)} className="drop-zone">
							<Button className="btn-primary" type="button" label="Добавить изображения" />
						</Dropzone>
					</div>
				)}

				{!this.id && <div> Создайте запись чтобы добвать файлы</div>}
			</Form>
		);
	}
}
