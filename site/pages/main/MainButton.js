import React from 'react';
import './styles.scss';
import img1 from './img/V1.png';
import img2 from './img/V2.png';
import img3 from './img/V3.png';
import img4 from './img/V4.png';
import img5 from './img/V5.png';

export const MainButtonArr = [
	{
		image: img1,
		name: 'Электроэнергия',
	},

	{
		image: img2,
		name: 'Малая энергетика',
	},
	{
		image: img3,
		name: 'Дизельные электростанции',
	},
	{
		image: img4,
		name: 'Солнечные электростанции',
	},
	{
		image: img5,		
		name: 'Ветроэлектростанции',
	},
];

const listItemsMainButton = MainButtonArr.map(MainButtonArr => (
	<div key={MainButtonArr.name} className="col-4">
		<div className="MainButtonName">
			<div className="MainButtonImg">
				<img src={MainButtonArr.image} />
			</div>
			{MainButtonArr.name}
		</div>
	</div>
));

export default class MainButton extends React.Component {
	render() {
		return (
			<div className="container button">
				<div className="row justify-content-center">{listItemsMainButton}</div>
			</div>
		);
	}
}
