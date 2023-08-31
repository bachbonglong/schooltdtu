import { Popup, Root } from "popup-ui";
import React from "react";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export default class PopupMsg extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Root>
        {Popup.show({
          type: "Success",
          title: "Upload complete",
          button: false,
          textBody: "Congrats! Your upload successfully done",
          buttonText: "Ok",
        })}
      </Root>
    );
  }
}
