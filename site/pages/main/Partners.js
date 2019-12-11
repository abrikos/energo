import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, toJS } from 'mobx';
import Slider from 'react-slick';
import ReactSVG from 'react-svg';
import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';

import partnerArrow from './img/partnerArrow.svg';
import img from './img/new1.jpg';

import './styles.scss';

const PrevArrow = ({ onClick }) => {
	const style = {
		top: '50px',
		left: '-100px',
		position: 'absolute',
		cursor: 'pointer',
	};
	return <ReactSVG src={partnerArrow} style={style} onClick={onClick} />;
};

const NextArrow = ({ onClick }) => {
	const style = {
		top: '50px',
		right: '-100px',
		position: 'absolute',
		cursor: 'pointer',
		transform: 'rotate(180deg)',
	};
	return <ReactSVG src={partnerArrow} style={style} onClick={onClick} />;
};

const Slide = ({ slide, ...props }) => {
	const handleClick = () => { };
	const image = slide.thumbnail ? slide.downloadFile('thumbnail') : img;

	const link = `http://${slide.link}`;
	return (
		<div {...props}>
			<a href={link} rel="noopener noreferrer" target="_blank" title={slide.name}>
				<img src={image} alt="asdfasd" className="carusel-image" onClick={() => handleClick()} />
			</a>
			<p className="partnername">{slide.name}</p>
		</div>
	);
};

@observer
export default class Partners extends React.Component {
	@observable records;

	async componentDidMount() {
		this.init();
	}

	init = async () => {
		const records = await store.model.Partner.find();
		this.records = records;
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}
		const slidesToShow = this.records.totalCount <= 5 ? this.records.totalCount : 5;
		const settings = {
			infinite: true,
			slidesToShow,
			slidesToScroll: 1,
			autoplay: true,
			speed: 1000,
			autoplaySpeed: 1000,
			cssEase: 'linear',
			pauseOnHover: true,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />,
			// rtl: true,
			responsive: [

				{
					breakpoint: 900,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						initialSlide: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				}
			]
		};

		return (
			<div className="PartnersClass" >
				<div className="container">
					<div className="row align-items-center">						
					</div>
					<div style={{ padding: '0 10%' }}>
						<Slider {...settings}>
							{this.records.map((record, index) => (
								<Slide key={`slide-${index}`} slide={record} />
							))}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}
