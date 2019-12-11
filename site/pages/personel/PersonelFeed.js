import React from 'react';
import { withRouter } from 'react-router-dom';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { Loader, HtmlValue, jsonToHTML } from '@smartplatform/ui';
import './styles.scss';

const PER_PAGE = 5;

@withRouter
@observer
export default class PersonelFeed extends React.Component {
	@observable vacancies = [];
	@observable page = 1;
	@observable notFound = false;

	async componentDidMount() {
		this.loadVacancies();
	}

	@action loadVacancies = async () => {
		const vacancies = await store.model.Vacancy.find({
			where: {
				published: true,
			},
			skip: (this.page - 1) * PER_PAGE,
			limit: PER_PAGE,
		});

		if (vacancies.totalCount === 0) {
			this.notFound = true;
		}
		this.vacanciesLength = vacancies.totalCount;
		this.vacancies.push(...vacancies);
	};

	@action loadMore = () => {
		this.page++;
		this.loadVacancies();
	};

	render() {
		if (!this.vacancies) {
			return <div />;
		}
		const VacanciesList = () => {
			if (this.notFound) {
				return <div>Записей не найдено</div>;
			}
			if (this.vacancies.length === 0) {
				return <Loader />;
			}
			return this.vacancies.map(vacancy => {
				const { id, title, description, createdAt } = vacancy;

				return (
					<div key={`vacancy-${id}`}>
						<div className="media">
							<div className="mr-3"> </div>
							<div className="media-body">
								<h5 className="ClassNameSection mt-0"> {title} </h5>
								<h6 className="mt-0">Дата: {moment(createdAt).format('DD.MM.YY')}</h6>
								<div className="mt-0">
									<HtmlValue value={jsonToHTML(description)} className="article-content" />
								</div>
								<button
									type="button"
									className="btn btn-link mt-0"
									onClick={() => this.props.history.push(`/personel/${id}`)}
								>
									читать далее
								</button>
							</div>
						</div>
					</div>
				);
			});
		};

		return (
			<div>
				{VacanciesList()}

				{this.vacancies.length > 0 && this.vacancies.length !== this.vacanciesLength && (
					<button className="btn btn-primary news" type="submit" onClick={this.loadMore}>
						Загрузить еще
					</button>
				)}
			</div>
		);
	}
}
