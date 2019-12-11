import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, Row } from '@smartplatform/ui';

@withRouter
@observer
export default class CompanyInfoEdit extends React.Component {
	@observable record;
	@observable id;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;

		let record;
		record = await store.model.CompanyInfo.find();
		record = record[0];
		if (!record) {
			record = new store.model.CompanyInfo();
		}
		this.record = record;
		console.log('this record', this.record);
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}

		return (
			<div>
				<Form record={this.record} stay>
					<Row>
						<Field property="year" label="Год основания" />
						<Field property="yearDesctiption" label="Год основания Осписание" />
					</Row>
					<Row>
						<Field property="regions" label="Регионы" />
						<Field property="regionsDescription" label="Регионы Описание" />
					</Row>
					<Row>
						<Field property="stations" label="Станции" />
						<Field property="stationsDescription" label="Станции Описание" />
					</Row>
					<Row>
						<Field property="electricPower" label="Электрическая мощность" />
						<Field property="electricPowerDescription" label="Электрическая мощность Описание" />
					</Row>
					<Row>
						<Field property="heatPower" label="Тепловая мощность" />
						<Field property="heatPowerDescription" label="Тепловая мощность Описание" />
					</Row>
					<Row>
						<Field property="length" label="Длина линий" />
						<Field property="lengthDescription" label="Длина линий Описание" />
					</Row>
					<Row>
						<Field property="substations" label="Подстанции" />
						<Field property="substationsDescription" label="Подстанции Описание" />
					</Row>
				</Form>
			</div>
		);
	}
}
