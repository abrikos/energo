import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

import { Button, Popup } from "@smartplatform/ui";

import RequiestForm from "./RequestForm";
import { Fax, Phone } from "./icons";

import "./styles.scss";

@observer
export default class TopBar extends React.Component {
  @observable showRequestForm = false;

  @action openPopup = () => {
    this.showRequestForm = true;
  };

  @action closePopup = () => {
    this.showRequestForm = false;
  };

  render() {
    return (
      <div className="topbar">
        <Fax className="topbar-icon" />

        <Phone className="topbar-icon" />
        <Button label="Отпривать заявку " onClick={this.openPopup} />
        {this.showRequestForm && (
          <Popup onClose={this.closePopup}>
            <div> Popup content</div>
            <RequiestForm />
          </Popup>
        )}
      </div>
    );
  }
}
