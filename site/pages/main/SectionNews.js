import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/site/store';
import moment from 'moment';
import { Loader } from '@smartplatform/ui';
import { withRouter } from 'react-router-dom';

import img1 from './img/new1.jpg';
import './styles.scss';

@withRouter
@observer
export default class SectionNews extends React.Component {
	@observable mainNews;
	@observable otherNews;

	async componentDidMount() {
		const news = await store.model.Article.find({ order: 'createdAt DESC', limit: 5 });
		this.mainNews = news[0];
		this.otherNews = news.slice(1, news.length);
	}

	navigateToNews = id => {
		this.props.history.push(`/news/${id}`);
	};

	render() {
		const renderMainNews = () => {
			if (!this.mainNews) {
				return <Loader />;
			}

			const article = this.mainNews;
			const name = article.name;
			const date = moment(article.createdAt).format('DD MMMM YYYY');

			const img = article.downloadFile('thumbnail');
			return (
				<>
					<img src={img} alt={name} />
					<div className="ClassBigNewsBG" />
					<div className="ClassBigNewsName" onClick={() => this.navigateToNews(article.id)}>
						{name}
						<p>{date}</p>
					</div>
				</>
			);
		};

		const renderOtherNews = () => {
			if (!this.otherNews) {
				return <Loader />;
			}
			return this.otherNews.map(article => (
				<div className="OtherNews" key={`article-${article.id}`} onClick={() => this.navigateToNews(article.id)}>
					<p> {article.name} </p>
				</div>
			));
		};
		return (
			<div className="newsClass">
				<div className="container">
					<div className="row align-items-center">
						<div className="col ClassNameSection"> Новости </div>
						<div className="col-auto center-block ClassFurtherSection">
							<a href="./news"> Все новости </a>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-8 ClassBigNews">{renderMainNews()}</div>
						<div className="col-4">{renderOtherNews()}</div>
					</div>
				</div>
			</div>
		);
	}
}
