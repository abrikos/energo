import React from 'react';
import MainSlider from './Slider';
import MainButton from './MainButton';
import AboutCompany from './AboutCompany';
import WeServe from './WeServe';
import SubmitApplication from './SubmitApplication';
import './styles.scss';
import SectionNews from './SectionNews';
import Partners from './Partners';

export default class MainPage extends React.Component {
	render() {
		return (
			<>
				<MainSlider />

				<div className="MainBackGround">
					<MainButton />
					<SectionNews />
					<AboutCompany />
					<WeServe />
				</div>

				<SubmitApplication />

				
				<Partners />
			</>
		);
	}
}
