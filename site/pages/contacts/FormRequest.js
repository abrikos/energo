import React from "react";
import "./styles.scss";

import { Form, Field } from "@smartplatform/ui";

const FormRequest = () => {
  return (
    <form className="letter">
      <p className="col-6"><input type="text" placeholder="ФИО" /></p>

      <p className="col-6"><input type="tel" placeholder="Телефон" /></p>
      <p className="col-12"><input type="textarea" placeholder="Сообщение" /></p>

      <p className="col-12"><input type="checkbox"></input>Даю согласие на обработку <a href="#">персональных данных</a> в соответствии Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</p>
      <p className="col-12 contact1" ><button>Отправить</button></p>

    </form>
  );
};

export default FormRequest;
