import React from 'react';
import "./styles.scss";

export const ArchiveFile = [
  {
  	 
  	 	title: "Уведомление о выборе Победителя по конкурсу",
  		date: "27.12.2012 г.",
      description: "В целях удовлетворения собственных нужд, заказчик ОАО «Сахаэнерго» 677001 г. Якутск пер. Энергетиков, 2, являющийся Организатором закупки, провело и выбрало Победителей в открытом одноэтапном конкурсе на заключение договоров на выполнение перевозки топлива и угля автомобильным транспортом по 42 лотам:",
      linkname: "Скачать Протокол победителя",
      link: "#",
  },
    
    {
     
      title: "Уведомление о выборе Победителя по конкурсу",
      date: "27.12.2012 г.",
      description: "В целях удовлетворения собственных нужд, заказчик ОАО «Сахаэнерго» 677001 г. Якутск пер. Энергетиков, 2, являющийся Организатором закупки, провело и выбрало Победителей в открытом одноэтапном конкурсе на заключение договоров на выполнение перевозки топлива и угля автомобильным транспортом по 42 лотам:",
      linkname: "Скачать Протокол победителя",
      link: "#",
  },
];

const ArchiveFileList = ArchiveFile.map((ArchiveFile, index) =>
 <div key={index} > <div className="BlockButtonList"> 
 <h4> {ArchiveFile.title} </h4>
 	<p> {ArchiveFile.date} </p>
  <p> {ArchiveFile.description} </p>
   <a href={ArchiveFile.link}>
 	 {ArchiveFile.linkname} </a> </div>
    </div>
);

export default class Archive extends React.Component {

    render() {
        return (
							
                <div className="BlockButton">
        <h2 className="ClassNameSection client">Архив</h2>
           {ArchiveFileList} </div>
                  
        	);
    }
}