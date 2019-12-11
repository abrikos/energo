import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/fontawesome-free-solid';

import store from 'root/site/store';
import { Loader, Popup } from '@smartplatform/ui';

@withRouter
@observer
export default class Album extends React.Component {
	@observable imageToShow;
	@observable album;

	async componentDidMount() {
		const { id } = this.props.match.params;

		const album = await store.model.Gallery.findById(id, {
			include: [
				{
					relation: 'images',
				},
			],
		});
		this.album = album;
	}

	@action closeModal = () => {
		this.imageToShow = null;
	};

	// @action prevImage = () => {
	// 	let { images, image } = this.imageToShow;
	// 	const imagePosition = images.indexOf(image);
	// 	const prevPosition = imagePosition - 1 < 0 ? images.length - 1 : imagePosition - 1;
	// 	this.imageToShow.image = images[prevPosition];
	// };

	// @action nextImage = () => {
	// 	let { images, image } = this.imageToShow;
	// 	const imagePosition = images.indexOf(image);
	// 	const nextPosition = imagePosition + 1 > images.length - 1 ? 0 : imagePosition + 1;
	// 	this.imageToShow.image = images[nextPosition];
	// };

	@action showImage = (image, images) => {
		this.imageToShow = { image, images };
	};

	renderPopup = () => (
		<Popup onClose={this.closeModal}>
			{/* <div className="news-list__popup-arrows">
				<button onClick={this.prevImage} className="slide-arrow slide-arrow__prev" />
				<button onClick={this.nextImage} className="slide-arrow slide-arrow__next" />
			</div> */}
			<div className="popup__wrapper">
				<img src={this.imageToShow.image.downloadFile('filename')} className="popup__image" />
			</div>
		</Popup>
	);

	render() {
		if (!this.album) {
			return <Loader />;
		}
		const images = this.album.images();
		console.log(images);
		return (
			<div className="GridGallery">
				<div className="album-image-wrapper">
					{images.map(image => {
						const filename = image.downloadFile('filename');
						return (
							<div key={`image-${image.id}`} className="album-image">
								<img src={filename} onClick={() => this.showImage(image, images)} />
							</div>
						);
					})}
				</div>

				{this.imageToShow && this.renderPopup()}
			</div>
		);
	}
}
