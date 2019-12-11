import React from 'react';
import "./styles.scss";

export const ProcurementFile = [
  {
  	 
  	 	title: "Положение о закупке продукции для нужд АО «Сахаэнерго»",
  		date: "29.03.2018 г.",
			linkname: "Положение о закупке продукции для нужд АО «Сахаэнерго»",
			link: "#",
  },
    
    {
  		title: "Методика оценки деловой репутации и финансового состояния участников закупочных процедур АО Сахаэн",
  		date: "21.10.2015 г.",
			linkname: "Методика оценки деловой репутации и финансового состояния участников закупочных процедур АО Сахаэнерго",
			link: "#",
  },
];

const ProcurementFileList = ProcurementFile.map((ProcurementFile, index) =>
 <div key={index} > <div className="BlockButtonList"> 
 <h4> {ProcurementFile.title} </h4>
 	<p> {ProcurementFile.date} </p>
	 <a href={ProcurementFile.link}>
 	 {ProcurementFile.linkname} </a> 
		</div>
		</div>
);

export default class Procurement extends React.Component {

    render() {
        return (
					<div className="BlockButton">
        <h2 className="ClassNameSection client">Управление закупочной деятельностью</h2>
           {ProcurementFileList}</div>
							
        	);
    }
}