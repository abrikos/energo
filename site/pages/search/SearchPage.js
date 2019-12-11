import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import store from 'root/site/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Loader } from '@smartplatform/ui';

import './styles.scss';

const SearchPage = props => {
	const [searchString, setSearchString] = useState(
		(store.route.params && store.route.params.s) || store.history.location.search.slice(3)
	);
	const [result, setResult] = useState();
	const [loader, setLoader] = useState();

	useEffect(() => {
		search();
	}, [searchString]);

	const search = async e => {
		if (searchString === '') {
			setResult(false);
			return;
		}
		setLoader(true);

		const articles = await store.model.Article.find({
			where: {
				name: { regexp: '/' + searchString + '/i' },
				status: true,
			},
		});

		const vacancies = await store.model.Vacancy.find({
			where: {
				title: { regexp: '/' + searchString + '/i' },
				published: true,
			},
		});

		setResult({ articles, vacancies });

		setLoader(false);
	};

	const renderResult = () => {
		if (result && Object.values(result).filter(e => e.totalCount > 0).length > 0) {
			const { articles, vacancies } = result;

			const articlesList =
				articles.totalCount > 0 ? (
					<>
						<h4 className="search-results__header"> Новости </h4>
						<ul>
							{articles.map(article => (
								<li key={article.id}>
									<Link to={`/news/${article.id}`}>{article.name} </Link>
								</li>
							))}
						</ul>
					</>
				) : null;

			const vacanciesList =
				vacancies.totalCount > 0 ? (
					<>
						<h4 className="search-results__header"> Вакансии </h4>
						<ul>
							{vacancies.map(vacancy => (
								<li key={vacancy.id}>
									<Link to={`/news/${vacancy.id}`}>{vacancy.title} </Link>
								</li>
							))}
						</ul>
					</>
				) : null;

			return (
				<>
					{articlesList}
					{vacanciesList}
				</>
			);
		}
		return <>Ничего не найдено</>;
	};

	console.log(result);

	return (
		<div className="MainBackGroundClient">
			<div className="container" style={{ minHeight: '50vh' }}>
				<h4 className="ClassNameSection client">Поиск</h4>

				<div className="search-bar__wrapper">
					<input onChange={e => setSearchString(e.target.value)} value={searchString} />
					<FontAwesomeIcon icon={faSearch} className="btn-search" />
				</div>
				<div className="search-results">{loader ? <Loader /> : renderResult()}</div>
			</div>
		</div>
	);
};

export default SearchPage;
