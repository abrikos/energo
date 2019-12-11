import React from 'react';
import { Sidebar } from '../../components/sidebar';
import './styles.scss';


export default class EnergeticsPage extends React.Component {
	render() {
		return (
			<div className="MainBackGroundClient">
			<div className="container">
				<div className="row">
					<div className="col-8">
						<h3 className="ClassNameSection client">Антикоррупционная политика</h3>

						
					<div className="BlockButtonList">
						<h2> Кодекс корпоративной этики АО "Сахаэнерго" </h2>
						<p> 23.01.2018 </p>
						
							<div className="article-content__wrapper">
							<a href="#">
						Кодекс корпоративной этики АО "Сахаэнерго"
						</a>
							</div>
						
						
					</div>
<div className="BlockButtonList">
						<h2> Антикоррупционная политика АО "Сахаэнерго" </h2>
						<p> 23.01.2018 </p>
						
							<div className="article-content__wrapper">
							<a href="#">
							Антикоррупционная политика АО "Сахаэнерго"
						</a>
							</div>
						
						
					</div>
				
					<div className="BlockButtonList">
						<h2> Правила работы линии доверия группы РусГидро </h2>
						<p> 23.01.2018 </p>
						
							<div className="article-content__wrapper">
							<a href="#">
							Правила работы линии доверия группы РусГидро
						</a>
							</div>
						
						
					</div>

					

					</div>
					<div className="col-4">
						<Sidebar />
					</div>
				</div>
			</div>
			</div>
		);
	}
}
