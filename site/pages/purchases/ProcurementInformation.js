import React from 'react';
import "./styles.scss";

export const ProcurementInformationFile = [
  {
  	 
  	 	title: "Извещение о проведении открытого запроса предложений",
  		date: "28.01.2016 г.",
  		organizer: "Организатор открытого запроса предложений – АО «Сахаэнерго» (677000, Республика Саха (Якутия), г. Якутск, пер. Энергетиков, дом 2, Телефон: (4112) 21-01-15 E-mail mail@sakha.yakute.elektra.ru) настоящим информирует потенциальных участников о проведении открытого запроса предложений на право заключения договора подряда по лоту:",
      lot: "Лот 397.1 Разработка ПСД для Строительство АДЭС-450 кВт в с.Орто-Балаган Оймяконского улуса",
      linkname: "Ссылка на сайте b2b-energo.ru",
      link: "#",
  },
    
    {
     
      title: "Извещение о проведении открытого запроса предложений",
      date: "28.01.2016 г.",
      organizer: "Организатор открытого запроса предложений – АО «Сахаэнерго» (677000, Республика Саха (Якутия), г. Якутск, пер. Энергетиков, дом 2, Телефон: (4112) 21-01-15 E-mail mail@sakha.yakute.elektra.ru) настоящим информирует потенциальных участников о проведении открытого запроса предложений на право заключения договора подряда по лоту:",
      lot: "Лот 397.1 Разработка ПСД для Строительство АДЭС-450 кВт в с.Орто-Балаган Оймяконского улуса",
      linkname: "Ссылка на сайте b2b-energo.ru",
      link: "#",
  },
    
    
];

const ProcurementInformationFileList = ProcurementInformationFile.map((ProcurementInformationFile, index) =>
 <div key={index} >
 <div className="BlockButtonList"> 
 <h2> {ProcurementInformationFile.title} </h2>
 	<p> {ProcurementInformationFile.date} </p>
  <p> {ProcurementInformationFile.organizer} </p>
  <p> {ProcurementInformationFile.lot} </p>
  <a href={ProcurementInformationFile.link}>
 	 {ProcurementInformationFile.linkname} </a>
 </div>
    </div>
);

export default class ProcurementInformation extends React.Component {

    render() {
        return (

            
          <div className="BlockButton">
          <h2 className="ClassNameSection client">Сведения о закупках</h2>
             {ProcurementInformationFileList} </div>

        	);
    }
}