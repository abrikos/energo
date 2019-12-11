import React from 'react';
import './styles.scss';
import { Route, Link } from 'react-router-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

const AboutCompanyItem = ({ number, description }) => (
	<div className="col-3">
		<div className="ClassNameNumbers">{number}</div>
		<div className="ClassNameDescription">{description} </div>
	</div>
);

export const AboutCompanyNumbers = [
	{
		number: '2000',
		description: 'год основания ОАО «Сахаэнерго»',
	},

	{
		number: '23',
		description: 'района РС (Я) обеспечены теплом и электроэнергией',
	},
	{
		number: '143',
		description: 'электростанций в числе предприятия',
	},
	{
		number: '199,9',
		description: 'общая установленная мощность энергообъектов, МВт',
	},
	{
		number: '92,4',
		description: 'общая установленная мощность тепловой энергии, Гкал/час',
	},
	{
		number: '2072',
		description: 'километров линий электропередачи, обслуживаемых нами',
	},
	{
		number: '827',
		description: 'трансформаторных подстанций',
	},
];

@observer
export default class AboutCompany extends React.Component {
	@observable companyInfo;

	async componentDidMount() {
		const companyInfo = await store.model.CompanyInfo.find();

		this.companyInfo = companyInfo[0];
		console.log(this.companyInfo);
	}

	render() {
		if (!this.companyInfo) {
			return <div />;
		}
		const {
			year,
			yearDesctiption,
			regions,
			regionsDescription,
			stations,
			stationsDescription,
			electricPower,
			electricPowerDescription,
			heatPower,
			heatPowerDescription,
			length,
			lengthDescription,
			substations,
			substationsDescription,
		} = this.companyInfo;

		return (
			<div className="container">
				<div className="row align-items-center">
					<div className="col ClassNameSection"> О компании в цифрах </div>
					<div className="col-auto center-block ClassFurtherSection">
						<a href="./about"> Подробнее о компании </a>
					</div>
				</div>

				{this.companyInfo && (
					<div className="row justify-content-center">
						<AboutCompanyItem number={year} description={yearDesctiption} />
						<AboutCompanyItem number={regions} description={regionsDescription} />
						<AboutCompanyItem number={stations} description={stationsDescription} />
						<AboutCompanyItem number={electricPower} description={electricPowerDescription} />
						<AboutCompanyItem number={heatPower} description={heatPowerDescription} />
						<AboutCompanyItem number={length} description={lengthDescription} />
						<AboutCompanyItem number={substations} description={substationsDescription} />
					</div>
				)}
			</div>
		);
	}
}
