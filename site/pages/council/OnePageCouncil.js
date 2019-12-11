import React from 'react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { HtmlValue, jsonToHTML } from '@smartplatform/ui';

import './styles.scss';

// import Sidebar from './Sidebar';
import { Sidebar } from '../../components/sidebar';

@withRouter
@observer
export default class OnePageCouncil extends React.Component {
	@observable article;

	componentDidMount() {
		console.log(this.props);
		store.ui.setPage('/council');
		console.log(store.ui.page);
		this.init();
	}

	componentDidUpdate() {
		store.ui.setPage('/council');
		this.init();
	}

	init = async () => {
		const { id } = this.props.match.params;

		const article = await store.model.Council.findById(id);
		console.log(article);
		this.article = article;
	};

	render() {
		if (!this.article) {
			return <div />;
		}
		const { content, name, createdAt } = this.article;
		const img = this.article.downloadFile('thumbnail');

		return (
			<div className="container">
				<div className="row">
					<div className="col-8">
						<h3 className="ClassNameSection client">{name}</h3>

						<div className="PostImage">
							<img src={img} />
						</div>
						<div className="PostText">
							<h6>Дата: {moment(createdAt).format('DD.MM.YYYY')}</h6>
							<div className="article-content__wrapper">
								<HtmlValue
									value={jsonToHTML(content)}
									style={{ background: 'red' }}
									className="article-content"
								/>
							</div>
						</div>
					</div>
					<div className="col-4">
						<Sidebar />
					</div>
				</div>
			</div>
		);
	}
}
