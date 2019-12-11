import React from 'react';
import { Route } from 'react-router-dom';
import './styles.scss';

import ComnGallery from './ComnGallery';
import Album from './Ablum';

export default class GalleryPage extends React.Component {
	render() {
		return (
			<>
				<div className="fonGallery">
					<div className="container">
						
							<Route exact path="/gallery/" render={() => <ComnGallery />} />

							<Route exact path="/gallery/:id" render={() => <Album />} />
						
					</div>
				</div>
			</>
		);
	}
}
