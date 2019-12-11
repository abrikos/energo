import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import store from 'root/site/store';
import { Loader } from '@smartplatform/ui';

import './styles.scss';

// import img1 from './img/gal1.jpg';

// import img2 from './img/gal2.jpg';

// import img3 from './img/gal3.jpg';

// import img4 from './img/gal4.jpg';

// export const ComnGalleryFile = [
// 	{
// 		image: img1,
// 		title: 'Сахаэнерго проводит рейды по выявлению фактов хищения электроэнергии',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// 	{
// 		image: img2,
// 		title:
// 			'Специалисты Сахаэнерго за 2 года изготовили более 80 блок-модулей для дизельных электростанций',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// 	{
// 		image: img3,
// 		title: 'МОЭСК создала прозрачный энергоучет в "Умном квартале" в Марьино',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// 	{
// 		image: img4,
// 		title:
// 			'Выработка АЭС снижает цену электроэнергии для всех потребителей европейской части России',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// 	{
// 		image: img3,
// 		title: 'АО «Сахаэнерго» ввело в эксплуатацию две солнечные электростанции в Якутии',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// 	{
// 		image: img1,
// 		title:
// 			'Специалисты Сахаэнерго за 2 года изготовили более 80 блок-модулей для дизельных электростанций',
// 		date: '02.04.2019',
// 		link: '#',
// 	},
// ];

@observer
export default class ComnGallery extends React.Component {
	@observable gallery;

	async componentDidMount() {
		const gallery = await store.model.Gallery.find();

		this.gallery = gallery;
	}

	render() {
		if (!this.gallery) {
			return <Loader />;
		}

		return this.gallery.map(album => (
			<div key={`gallery-${album.id}`} className="col-4">
				<div className="GridGallery">
					<Link to={`/gallery/${album.id}`}>
						<img src={album.downloadFile('thumbnail')} />
						<div className="hover-desc">
							<div className="hover-text">
								<h5>{album.title}</h5>
								<p>{moment(album.createdAt).format('DD.MM.YYYY')}</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		));
	}
}
