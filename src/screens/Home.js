import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from "react-native";
import {
  Button,
  Block,
  Text,
  Input,
  Icon,
  NavBar,
  theme,
} from "galio-framework";

import { Product } from "../components/";

import Constants from "expo-constants";
import { Popup } from "popup-ui";

const { statusBarHeight } = Constants;

const { width } = Dimensions.get("screen");

const DS_CN = [
  {
    title: "Thông tin cá nhân",
    screen: "PROFILE",
    image: require("../../assets/imgs/man.png"),
  },

  {
    title: "Thông báo",
    screen: "Notifications",
    image: require("../../assets/imgs/notification.png"),
  },
  {
    title: "Lớp bộ môn",
    screen: "CLASS SUBJECT",
    image: require("../../assets/imgs/training.png"),
  },
  {
    title: "Lớp chủ nhiệm",
    image: require("../../assets/imgs/presentation.png"),
  },
  {
    title: "Đánh giá",
    screen: "Feedback",
    image: require("../../assets/imgs/feedback.png"),
  },
  {
    title: "Bảng điểm",
    screen: "SCORE",
    image: require("../../assets/imgs/scoreboard.png"),
  },
  {
    title: "Tư vấn",
    screen: "CHAT GPT",
    image: require("../../assets/imgs/bubble-chat.png"),
  },
];

export default class Home extends React.Component {
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Pro")}
      />
    );
  };

  renderProducts = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        style={[
          { paddingTop: 10, marginTop: 5, backgroundColor: "white" },
          styles.products,
        ]}
        data={DS_CN}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    );
  };

  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.screen) {
            navigation?.navigate(item.screen);
          } else {
            Popup.show({
              type: "Warning",
              title: "Warning",
              button: true,
              textBody: "Feature updating",
              buttonText: "Ok",
              callback: null,
            });
          }
        }}
      >
        <View style={styles.square}>
          {item.image && (
            <Image
              style={{ width: 50, height: 50 }}
              resizeMode="center"
              source={item.image}
            />
          )}
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        <StatusBar barStyle="light-content" />
        <Block style={styles.navbar}></Block>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
  },
  square: {
    width: 50,
    height: 50,
  },
  itemTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});
