import React from 'react';
import "./styles.scss";
import img1 from './img/new1.jpg';

export const SidebarNews = [
	{
		image: img1,
		title: "Сахаэнерго проводит рейды по выявлению фактов хищения электроэнергии",
		date: "02.04.2019",
		link: "#",

	},
	{
		image: img1,
		title: "Сахаэнерго проводит рейды по выявлению фактов хищения электроэнергии",
		date: "02.04.2019",
		link: "#",
	},
	{
		image: img1,
		title: "Сахаэнерго проводит рейды по выявлению фактов хищения электроэнергии",
		date: "02.04.2019",
		link: "#",
	},


];

const SidebarNewsList = SidebarNews.map((SidebarNews, index) =>
	<div key={index}>
		< a href="#">
			<div className="media">

				< div className="mr-3" > <img src={SidebarNews.image} /> </div>
				<div className="media-body">
					<h5 className="ClassNameSection mt-0"> {SidebarNews.title} </h5>
					<h6 className="mt-1">Дата: {SidebarNews.date}</h6>
				</div>
			</div>
		</a>
	</div>
);

export default class Sidebar extends React.Component {

	render() {
		return (
			<div className="sidebar">
				<h2 className="ClassNameSection client">Новости</h2>
				{SidebarNewsList} </div>

		);
	}
}