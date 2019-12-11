import React from 'react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { HtmlValue, jsonToHTML, Loader } from '@smartplatform/ui';

import './styles.scss';

// import Sidebar from './Sidebar';
import { Sidebar } from '../../components/sidebar';

@withRouter
@observer
export default class PersonelOnePage extends React.Component {
	@observable vacancy;

	componentDidMount() {
		this.init();
	}

	componentDidUpdate() {
		this.init();
	}

	@action init = async () => {
		const id = this.props.match.params.id;
		console.log(id);
		const vacancy = await store.model.Vacancy.findById(id);
		console.log(id, vacancy);
		this.vacancy = vacancy;
	};

	render() {
		if (!this.vacancy) {
			return <Loader />;
		}
		const {
			id,
			title,
			description,
			education,
			scope,
			speciality,
			skills,
			experience,
			pc,
			additional,
			personal,
			contacts,
			createdAt,
		} = this.vacancy;

		return (
			<div className="container">
				<div className="row">
					{/* <div className="col-8"> */}
					<div>
						<h3>{title}</h3>
						<h6>
							Дата объявления: <strong>{moment(createdAt).format('DD.MM.YY')}</strong>
						</h6>
						<HtmlValue value={jsonToHTML(description)} className="article-content" />
					</div>
					<table className="table">
						<thead>
							<tr>
								<th style={{ width: '30%' }} scope="col" />
								<th scope="col" />
							</tr>
						</thead>
						<tbody>
							{education && (
								<tr>
									<th scope="row">Образование</th>
									<td>
										<HtmlValue value={jsonToHTML(education)} className="article-content" />
									</td>
								</tr>
							)}
							{scope && (
								<tr>
									<th scope="row">Сфера образования</th>
									<td>{scope}</td>
								</tr>
							)}
							{speciality && (
								<tr>
									<th scope="row">Специальность или квалификация по диплому</th>
									<td>{speciality}</td>
								</tr>
							)}

							{skills && (
								<tr>
									<th scope="row">Дополнительные специальные знания, навыки</th>
									<td>
										<HtmlValue value={jsonToHTML(skills)} className="article-content" />
									</td>
								</tr>
							)}
							{experience && (
								<tr>
									<th scope="row">Стаж работы в определенной сфере деятельности</th>
									<td>{experience}</td>
								</tr>
							)}
							{pc && (
								<tr>
									<th scope="row">Уровень владения ПК</th>
									<td>
										<HtmlValue value={jsonToHTML(pc)} className="article-content" />
									</td>
								</tr>
							)}
							{additional && (
								<tr>
									<th scope="row">Должностные обязанности (перечень основных функций)</th>
									<td>
										<HtmlValue value={jsonToHTML(additional)} className="article-content" />
									</td>
								</tr>
							)}
							{personal && (
								<tr>
									<th scope="row">Личные качества</th>
									<td>
										<HtmlValue value={jsonToHTML(personal)} className="article-content" />
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<HtmlValue value={jsonToHTML(contacts)} className="article-content" />
				</div>
				{/* <div className="col-4">
						<Sidebar />
					</div> */}
				{/* </div> */}
			</div>
		);
	}
}
