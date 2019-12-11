import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, toJS } from 'mobx';
import Slider from 'react-slick';
import ReactSVG from 'react-svg';
import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';

import img from './img/slider1.jpg';

import './styles.scss';

import sliderArrow from './img/SliderArrow.svg';

const PrevArrow = ({ onClick }) => {
	const style = {
		top: '50%',

		position: 'absolute',
		cursor: 'pointer',
		zIndex: '110',
		left: '5%',
	};
	return <ReactSVG src={sliderArrow} style={style} onClick={onClick} />;
};
const NextArrow = ({ onClick }) => {
	const style = {
		top: '50%',

		position: 'absolute',
		cursor: 'pointer',
		zIndex: '110',
		right: '5%',
		transform: 'rotate(180deg)',
	};
	return <ReactSVG src={sliderArrow} style={style} onClick={onClick} />;
};

const Slide = ({ slide, ...props }) => {
	const handleClick = () => {};
	const image = slide.thumbnail ? slide.downloadFile('thumbnail') : img;
	
	
	return (
		<div {...props}>
			<a href={slide.link} rel="noopener noreferrer" target="_blank" title={slide.name}>
				<h2 className="slider-main__title">{slide.name} </h2></a>
				<img src={image} alt="asdfasd" className="MainSlider" onClick={() => handleClick()} />

				{/* <div className="MainSliderTitle">
					<h2>{slide.name}</h2>
				</div> */}
			
		</div>
	);
};

@observer
export default class MainSlider extends React.Component {
	@observable records;

	async componentDidMount() {
		this.init();
	}

	init = async () => {
		const records = await store.model.MainSlider.find();
		this.records = records;
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}
		const slidesToShow = this.records.totalCount <= 1 ? this.records.totalCount : 1;
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />,
			className: "MainSlide",
		};
		return (
			<div>
				<Slider {...settings}>
					{this.records.map((record, index) => (
						<Slide key={`slide-${index}`} slide={record} />
					))}
				</Slider>
			</div>
		);
	}
}
