import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, NumberInput, SlateEditor, Input, Button, Row, Icon } from '@smartplatform/ui';

import './styles.scss';
@withRouter
@observer
export default class BranchEdit extends React.Component {
	@observable record;
	@observable station;
	@observable branchStations;
	@observable error;
	@observable id;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;

		let record;
		if (!isNaN(id)) {
			record = await store.model.Branch.findById(id);
			this.id = id;
			this.branchStations = await record.stations();
		} else {
			record = new store.model.Branch();
		}
		this.record = record;
		console.log(this.record);
	};

	@action setStationName = record => {
		const value = record.target.value;

		this.station = value;
		console.log(this.station);
	};

	@action removeStation = async id => {
		console.log('got id', id);
		await this.record.stations.destroyById(id);
		const stations = await this.record.stations();
		this.branchStations = stations;
		// console.log(this.branchStations);
	};

	@action addStation = async () => {
		if (!this.station) {
			this.error = 'Введите название станции';
			return;
		} else {
			this.error = null;
		}
		await this.record.stations.create({ name: this.station });

		const stations = await this.record.stations();
		this.branchStations = stations;
		this.station = '';
	};

	render() {
		const onSave = record => {
			if (this.branchStations) {
				this.props.history.push('/admin/branches');
			}
			this.branchStations = this.branchStations ? this.branchStations : [];
		};

		const renderStations = () => {
			if (!this.branchStations) {
				return (
					<div>
						<h2>Перечень обслуживаемых станций:</h2>
						<p> Сохраните запись, чтобы добавить станции</p>
					</div>
				);
			}

			return (
				<div className="form-field">
					<h2>Перечень обслуживаемых станций:</h2>

					<ul className="branches-list">
						{this.branchStations.map(station => (
							<li key={station.id}>
								{station.name}
								<Icon
									className="delete-file-btn delete-image"
									icon="trash"
									onClick={() => this.removeStation(station.id)}
								/>
							</li>
						))}
					</ul>
					<Input value={this.station} onChange={e => this.setStationName(e)} />
					<div>
						{this.error ? <p>{this.error}</p> : null}
						<Button label="Добавить станцию" onClick={this.addStation} />
					</div>
				</div>
			);
		};

		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Филиал: {this.record.name}</h1>;
			} else {
				return <h1>Новый филиал</h1>;
			}
		};
		console.log('stations', this.branchStations);
		return (
			<div>
				{title()}
				<Form record={this.record} stay onSave={onSave} rootPath="/admin">
					<Field property="name" label="Название" />
					<Field property="info" label="Дополнительная информация">
						<SlateEditor noImages />
					</Field>
					<Row>
						<Field property="address" label="Адрес" />
						<Field property="email" label="Email" />
					</Row>
					<Row>
						<Field property="head" label="Директор" />
						<Field property="headPhone" label="Телефон директора" />
					</Row>

					<Row>
						<Field property="engineer" label="Главный инженер" />
						<Field property="engineerPhone" label="Телефон главного инженера" />
					</Row>

					<Field property="power" label="Мощность, кВт">
						<NumberInput />
					</Field>

					{renderStations()}
				</Form>
			</div>
		);
	}
}
