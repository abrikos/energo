import React from "react";

import { Form, Field } from "@smartplatform/ui";

const RequestForm = () => {
  return (
    <form>
      <p className="col-4"><input type="text" placeholder="ФИО" /></p>

      <p className="col-4"><input type="tel" placeholder="Телефон" /></p>
      <p className="col-4"><select>
        <option>Услуги</option>
      </select></p>
      <p className="col-8 check"><input type="checkbox"></input>Даю согласие на обработку <a href="#">персональных данных</a> в соответствии Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</p>
      <p className="col-4 send" ><button>Отправить</button></p>

    </form>
  );
};

export default RequestForm;
