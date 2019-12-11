import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';

import './styles.scss';

@withRouter
@observer
export default class Sidebar extends React.Component {
	@observable news;

	async componentDidMount() {
		const news = await store.model.Article.find({
			limit: 3,
			order: 'createdAt DESC'
		});

		this.news = news;
		console.log(this.news);
	}

	render() {
		if (!this.news) {
			return <Loader />;
		}

		const SidebarNewsList = () =>
			this.news.map(article => {
				const { name, createdAt, id } = article;
				const image = article.downloadFile('thumbnail');

				return (
					<div key={`sidebar-news-${id}`}>
						<Link className="sidebar-news__item"
							// style={{ cursor: 'pointer' }}
							// onClick={() => this.props.history.push(`/news/${id}`)}
							to={`/news/${id}`}
						>
							<div className="media">
								<div className="mr-3">
									<img src={image} />
								</div>
								<div className="media-body">
									<h5 className="ClassNameSection mt-0"> {name} </h5>
									<h6 className="mt-1">Дата: {moment(createdAt).format('DD.MM.YYYY')}</h6>
								</div>
							</div>
						</Link>
					</div>
				);
			});

		return (
			<div className="sidebar">
				<h2 className="ClassNameSection client">Новости</h2>
				{SidebarNewsList()}
			</div>
		);
	}
}
