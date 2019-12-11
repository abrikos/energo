import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Table, Column, Loader, Image, Button } from '@smartplatform/ui';

@observer
export default class VacancyList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Vacancy.find();
		console.log(records);
		this.records = records;
	}

	publish = record => {
		const { removeAt, published } = record;

		if (published && (Date.parse(removeAt) > Date.now() || !removeAt)) {
			return <FontAwesomeIcon icon={faCheck} />;
		}
		return <FontAwesomeIcon icon={faTimes} />;
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}
		return (
			<div>
				<div className="filters">
					<Button label="Добавить вакансию" onClick={() => this.props.history.push('/admin/vacancies/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="title" label="Заголовок" />

					<Column property="createdAt" label="Дата" />
					<Column property="published" label="Опубликовано" computed={this.publish} />
				</Table>
			</div>
		);
	}
}
