import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import EditorHelp from '../EditoHelp';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, Input, Button, Row, Icon } from '@smartplatform/ui';

import './styles.scss';
@withRouter
@observer
export default class AboutCompany extends React.Component {
	@observable aboutCompany;
	@observable trends;
	@observable trend;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const aboutCompany = await store.model.AboutCompany.find();
		if (aboutCompany.totalCount === 0) {
			this.aboutCompany = new store.model.AboutCompany();
			await this.aboutCompany.save();
		} else {
			this.aboutCompany = aboutCompany[0];
		}
		this.trends = await this.aboutCompany.trends();
	};

	@action setTrendContent = record => {
		const value = record.target.value;

		this.trend = value;
		console.log(this.trend);
	};

	@action removeTrend = async id => {
		await this.aboutCompany.trends.destroyById(id);
		const trends = await this.aboutCompany.trends();
		this.trends = trends;
	};

	@action addStation = async () => {
		if (!this.trend) {
			this.error = 'Введите информацию о направлении';
			return;
		} else {
			this.error = null;
		}
		await this.aboutCompany.trends.create({ text: this.trend });

		const trends = await this.aboutCompany.trends();
		this.trends = trends;
		this.trend = '';
	};

	render() {
		const renderStations = () => {
			if (!this.trends) {
				return (
					<div>
						<h2>Направления:</h2>
						<p> Сохраните запись, чтобы добавить направления</p>
					</div>
				);
			}

			return (
				<div className="form-field">
					<h2>Направления:</h2>

					<ul className="trends-list">
						{this.trends.map((trend, index) => (
							<li key={trend.id}>
								<div>№ {index + 1}. </div>
								<textarea
									rows="8"
									cols="45"
									value={this.trends[index].text}
									onChange={e => (this.trends[index].text = e.target.value)}
								/>
								<div>
									<Button label="Сохранить изменения" onClick={() => this.trends[index].save()} />

									<Icon
										className="delete-file-btn delete-image"
										icon="trash"
										onClick={() => this.removeTrend(trend.id)}
									/>
								</div>
							</li>
						))}
					</ul>
					<textarea rows="8" cols="45" value={this.trend} onChange={e => this.setTrendContent(e)} />
					<div>
						{this.error ? <p>{this.error}</p> : null}
						<Button label="Добавить направление" onClick={this.addStation} />
					</div>
				</div>
			);
		};

		if (!this.aboutCompany) {
			return <Loader />;
		}
		const title = () => <h2> Ифнормация о компании </h2>;

		const onSave = () => {
			this.trends.forEach(element => {
				element.save();
			});
		};

		return (
			<div>
				{title()}
				<EditorHelp />
				<Form record={this.aboutCompany} onSave={onSave} stay rootPath="/admin">
					<Field property="mainText" label="">
						<SlateEditor noImages />
					</Field>
					{renderStations()}
				</Form>
			</div>
		);
	}
}
