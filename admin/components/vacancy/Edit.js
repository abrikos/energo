import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, Row, Inpu } from '@smartplatform/ui';

@withRouter
@observer
export default class VacancyEdit extends React.Component {
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
		if (!isNaN(id)) {
			record = await store.model.Vacancy.findById(id);
			this.id = id;
		} else {
			record = new store.model.Vacancy();
			record.published = false;
		}
		this.record = record;
		console.log('this record', this.record);
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Вакансия: {this.record.title}</h1>;
			} else {
				return <h1>Новая вакансия</h1>;
			}
		};

		return (
			<div>
				{title()}
				<Form record={this.record} rootPath="/admin">
					<Field property="title" label="Заголовок" />
					<Field property="description" label="Описание вакансии">
						<SlateEditor noImages />
					</Field>
					<Row>
						<Field property="education" label="Образование" />
						<Field property="scope" label="Сфера образования" />
					</Row>
					<Row>
						<Field property="speciality" label="Специальность" />
						<Field property="experience" label="Стаж работы" />
					</Row>

					<Field property="skills" label="Дополнительные специальные навыки">
						<SlateEditor noImages />
					</Field>
					<Field property="pc" label="Уровень владения ПК">
						<SlateEditor noImages />
					</Field>
					<Field property="additional" label="Дополнительные обязанности">
						<SlateEditor noImages />
					</Field>
					<Field property="personal" label="Персональные качества">
						<SlateEditor noImages />
					</Field>
					<Field property="contacts" label="Контакты">
						<SlateEditor noImages />
					</Field>
					<Row>
					<Field type="boolean" property="published" label="Опубликовано" />
					<Field property="removeAt" label="Дата снятия с публикации" />
					</Row>
				</Form>
			</div>
		);
	}
}
