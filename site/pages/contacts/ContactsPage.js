import React from 'react';
import './styles.scss';
// import FormRequest from '../../components/FormRequest';
import * as Components from '../../components';

import karta from './img/contacts_map.jpg';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

export default class ContactsPage extends React.Component {
	render() {
		return (
			<div className="fon">
				<div className="row">
					<div className="col-xl-12">
						{/*<img className="map" src={karta} />*/}
						<LeafletMap
							center={[62.045691, 129.763154]}
							zoom={16}
							maxZoom={17}
							attributionControl={true}
							zoomControl={true}
							doubleClickZoom={true}
							scrollWheelZoom={true}
							dragging={true}
							animate={true}
							easeLinearity={0.35}
						>
							<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
							<Marker position={[62.045691, 129.763154]}>
								<Popup>
									<p>
										АО «Сахаэнерго» <br />
										Адрес: 677000 г. Якутск, пер. Энергетиков,2
									</p>
								</Popup>
							</Marker>
						</LeafletMap>
					</div>
					<div className="col-xl-6">
						<div className="area">
							<h4 className="ClassNameSection">Руководство</h4>
							<ol className="push">
								<li>
									Исполнительный директор -{' '}
									<span className="medium">Ивлев Алексей Анатольевич</span>
								</li>
								<li>
									Первый заместитель исполнительного директора, главный инженер -{' '}
									<span className="medium">Кондратьев Петр Семенович</span>
								</li>
								<li>
									Заместитель исполнительного директора по экономике и финансам -{' '}
									<span className="medium">Алексеев Гаврил Николаевич</span>
								</li>
								<li>
									Заместитель исполнительного директора по ресурсообеспечению производства -{' '}
									<span className="medium">Куртуяхов Сергей Николаевич</span>
								</li>
								<li>
									Главный бухгалтер -<span className="medium">Левина Анна Валерьевна </span>
								</li>
							</ol>
						</div>
					</div>
					<div className="col-xl-6 contact">
						<div className="ContainerSubmitApp">
							<h4 className="ClassNameSection bgwhite">Контакты</h4>
							<span className="medium">АО «Сахаэнерго»</span>
							<p>
								<span className="medium">Адрес:</span> 677000 г. Якутск, пер. Энергетиков,2
							</p>
							<span className="medium">Телефон</span> (4112) 21-01-15
							<p>
								<span className="medium">Факс</span> (4112) 49-72-49
							</p>
							<p>
								<span className="medium">Эл почта</span> mail@sakhaenergo.ru
							</p>
						</div>
						<div className="grey">
							<div>
								<h4 className="ClassNameSection">Напишите нам</h4>
								<Components.FormRequest />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
