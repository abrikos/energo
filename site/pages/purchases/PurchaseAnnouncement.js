import React from 'react';
import "./styles.scss";

export const AnnouncementFile = [
  {
  	 
  	 	title: "Положение о закупке продукции для нужд АО «Сахаэнерго»",
  		date: "13.03.2014 г.",
      linkname: "Скачать ГКПЗ на 2014 год",
      link: "#",
  },
    
    {
     
      title: "Положение о закупке продукции для нужд АО «Сахаэнерго»",
      date: "13.03.2014 г.",
      linkname: "Скачать ГКПЗ на 2014 год",
      link: "#",
  },
];

const AnnouncementFileList = AnnouncementFile.map((AnnouncementFile, index) =>
 <div key={index}>
 <div className="BlockButtonList"> 
 <h2> {AnnouncementFile.title} </h2>
 	<p> {AnnouncementFile.date} </p>

   <a href={AnnouncementFile.link}>
 	 {AnnouncementFile.linkname} </a>
 </div>
    </div>
);

export default class PurchaseAnnouncement extends React.Component {

    render() {
        return (
          <div className="BlockButton">
          <h2 className="ClassNameSection client">Анонсирование закупок</h2>
              {AnnouncementFileList}</div>
						
        	);
    }
}