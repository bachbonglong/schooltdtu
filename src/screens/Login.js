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
import { CallAPIAuthentication } from "../Utils/requestAPI";
import { Popup, Root } from "popup-ui";

const { width } = Dimensions.get("window");

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    const _username = await getStorage("username", "");
    this.setState({ username: _username });
  }

  handleLogin = () => {
    const { navigation } = this.props;
    const { username, password } = this.state;

    // Keyboard.dismiss();
    // if (!username) {
    //   Popup.show({
    //     type: "Warning",
    //     title: "Warning",
    //     button: true,
    //     textBody: "User name empty",
    //     buttonText: "Ok",
    //   });
    // } else if (!password) {
    //   Popup.show({
    //     type: "Warning",
    //     title: "Warning",
    //     button: true,
    //     textBody: "Password empty",
    //     buttonText: "Ok",
    //   });
    // } else {
    //   CallAPIAuthentication({ username, password }, (res) => {
    //     if (res.message !== "Login successful") {
    //       Popup.show({
    //         type: "Danger",
    //         title: "Warning",
    //         button: true,
    //         textBody: res?.message || "Check username or password",
    //         buttonText: "Ok",
    //       });
    //     } else {
    //       setStorage("username", username);
    //       navigation.navigate("App");
    //     }
    //   });
    // }
    setStorage("username", "Admin01");

    navigation.navigate("App");
  };

  render() {
    const { username } = this.state;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
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
              <Text style={{ fontSize: ScaleSize(30) }}>{"Sign up"}</Text>
            </Block>
          </Block>
          <Block style={{}}>
            <Input
              value={username}
              rounded
              color={theme.COLORS.BLACK}
              placeholder="User Name"
              autoCapitalize="none"
              style={{ width: width * 0.9, color: theme.COLORS.BLACK }}
              onChangeText={(text) => this.handleChange("username", text)}
            />
            <Input
              rounded
              color={theme.COLORS.BLACK}
              password
              viewPass
              placeholder="Password"
              style={{ width: width * 0.9, color: theme.COLORS.BLACK }}
              onChangeText={(text) => this.handleChange("password", text)}
            />
            <Text
              color={theme.COLORS.ERROR}
              size={theme.SIZES.FONT * 0.75}
              onPress={() => Alert.alert("Not implemented")}
              style={{
                alignSelf: "flex-end",
                lineHeight: theme.SIZES.FONT * 2,
              }}
            >
              Forgot your password?
            </Text>
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
                {
                  "If you do not have an account, please contact the relevant department for support"
                }
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

export default Login;
