import React from 'react';
import { withRouter } from 'react-router-dom';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { Loader } from '@smartplatform/ui';

import './styles.scss';

const PER_PAGE = 5;
@withRouter
@observer
export default class CouncilPageFeed extends React.Component {
	@observable news = [];
	@observable newsPage = 1;

	async componentDidMount() {
		this.loadNews();
	}

	@action loadNews = async () => {
		const news = await store.model.Council.find({
			where: {
				status: true,
			},
			skip: (this.newsPage - 1) * PER_PAGE,
			limit: PER_PAGE,
		});
		this.newsLength = news.totalCount;
		this.news.push(...news);
	};

	@action loadMore = () => {
		this.newsPage++;
		this.loadNews();
	};
	render() {
		const NewsFeedList = () => {
			if (this.news.length === 0) {
				return <Loader />;
			}
			return this.news.map(council => (
				<div key={`council-${council.id}`}>
					<div className="media">
						<div className="mr-3">
							<img
								className="news-list__image"
								alt={council.name}
								src={council.downloadFile('thumbnail')}
							/>
						</div>
						<div className="media-body">
							<h5
							onClick={() => this.props.history.push(`/council/${council.id}`)}
							className="ClassNameSection mt-0"> {council.name} </h5>
							<h6 className="mt-0">Дата: {moment(council.createdAt).format('DD.MM.YY')}</h6>
							<p className="mt-0">{council.subheader}</p>
							{/* <button
								type="button"
								className="btn btn-link mt-0"
								
							>
								читать далее
							</button> */}
						</div>
					</div>
				</div>
			));
		};
		return (
			<div>
				{NewsFeedList()}

				{this.news.length !== this.newsLength && (
					<button className="btn btn-primary news" type="submit" onClick={this.loadMore}>
						Загрузить еще
					</button>
				)}
			</div>
		);
	}
}
