import React from 'react';
import "./styles.scss";

export const ContractDetailsFile = [
  {
    link: "#",
    linkname: "Сведения о заключенных договорах на 10.04.2016",
  },

  {
    link: "#",
    linkname: "Сведения о заключенных договорах на 10.03.2016",
  },
];

const ContractDetailsList = ContractDetailsFile.map((ContractDetailsFile, index) =>
  <li> <a href={ContractDetailsFile.link}>
    {ContractDetailsFile.linkname} </a> </li>

);

export default class ContractDetails extends React.Component {

  render() {
    return (
      <div className="BlockButton">
        <h2 className="ClassNameSection client">Сведения о заключенных договорах, изменениях заключенных договоров</h2>
        <ul className="push dogovor">
          {ContractDetailsList}

        </ul>  </div>
    );
  }
}