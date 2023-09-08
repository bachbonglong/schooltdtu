import React from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Text,
  Keyboard,
} from "react-native";

// galio component
import { Block, Button, Input, NavBar, Toast } from "galio-framework";
import theme from "../theme";
import { ScaleSize, getStorage, setStorage } from "../Utils.js";
import { CallAPIAuthentication, CallNewAPI } from "../Utils/requestAPI";
import { Popup, Root } from "popup-ui";
import Spinner from "react-native-loading-spinner-overlay";

const { width } = Dimensions.get("window");

class ChangePass extends React.Component {
  constructor(props) {
    super();
    this.state = {
      access_token: props?.route?.params?.access_token,
      password: props?.route?.params?.password,
      new_password: "",
      username: props?.route?.params?.username,
      spinner: false,
    };
  }

  componentDidMount() {
    this.setState({ password: this.props?.route?.params?.password });
  }

  handleLogin = () => {
    const { navigation } = this.props;
    const { new_password, password, access_token, username } = this.state;
    Keyboard.dismiss();
    if (!new_password) {
      Popup.show({
        type: "Warning",
        title: "Warning",
        button: true,
        textBody: "Old Password is not empty",
        buttonText: "Ok",
      });
    } else if (!password) {
      Popup.show({
        type: "Warning",
        title: "Warning",
        button: true,
        textBody: "New Password is not empty",
        buttonText: "Ok",
      });
    } else {
      this.setState({ spinner: true });
      CallNewAPI(
        access_token,
        `users/accounts/change-password/${username}/`,
        { old_password: password, new_password: new_password },
        "PUT",
        (res) => {
          this.setState({ spinner: false });
          if (res.message !== "Password changed successfully.") {
            Popup.show({
              type: "Danger",
              title: "Warning",
              button: true,
              textBody: res?.message || "Check Old Password or password",
              buttonText: "Ok",
            });
          } else {
            setStorage("access_token", res?.access_token);
            navigation.navigate("App");
          }
        }
      );
    }
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { new_password, password } = this.state;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <Spinner
          visible={this.state.spinner}
          size={"large"}
          textStyle={styles.spinnerTextStyle}
        />
        <NavBar
          style={
            Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block
            center
            style={{
              marginTop: theme.SIZES.BASE * 1.875,
            }}
          >
            <Block
              row
              center
              space="between"
              style={{ marginVertical: ScaleSize(30) }}
            >
              <Text style={{ fontSize: ScaleSize(30) }}>{"Change Pass"}</Text>
            </Block>
          </Block>
          <Block style={{}}>
            <Input
              value={password}
              rounded
              color={theme.COLORS.BLACK}
              placeholder="Old Pass"
              autoCapitalize="none"
              style={{ width: width * 0.9, color: theme.COLORS.BLACK }}
              onChangeText={(text) => this.handleChange("username", text)}
            />
            <Input
              value={new_password}
              rounded
              color={theme.COLORS.BLACK}
              password
              viewPass
              placeholder="New Password"
              style={{ width: width * 0.9, color: theme.COLORS.BLACK }}
              onChangeText={(text) => this.handleChange("new_password", text)}
            />
          </Block>
          <Block flex style={{ marginTop: ScaleSize(50) }}>
            <Button round color="error" onPress={this.handleLogin}>
              Sign up
            </Button>
            <Button color="transparent" shadowless>
              <Text
                style={{
                  height: ScaleSize(50),
                  textAlign: "center",
                  marginTop: ScaleSize(40),
                }}
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
              >
                {"Update Pass when first time login"}
              </Text>
            </Button>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
});

export default ChangePass;
