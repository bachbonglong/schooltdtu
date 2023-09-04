import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import AutoDragSortableView from "../widget/AutoDragSortableView";
import { TEST_DATA } from "../data/base/BaseConstant";
import { TouchableOpacity } from "react-native";
import { theme } from "galio-framework";

import Constants from "expo-constants";
import { Popup } from "popup-ui";
import { ScaleSize } from "../Utils";
import { TouchableNativeFeedback } from "react-native";

const { statusBarHeight } = Constants;

const { width } = Dimensions.get("screen");

const parentWidth = width;
const childrenWidth = width / 3 - 20;
const childrenHeight = 48 * 4;
const headerViewHeight = 160;
const bottomViewHeight = 40;

export default class AutomaticSlidingThreePage extends Component {
  constructor(props) {
    super();

    this.state = {
      data: TEST_DATA,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <AutoDragSortableView
          dataSource={this.state.data}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth}
          marginChildrenBottom={10}
          marginChildrenRight={10}
          marginChildrenLeft={10}
          marginChildrenTop={10}
          childrenHeight={childrenHeight}
          onDataChange={(data) => {
            if (data.length != this.state.data.length) {
              this.setState({
                data: data,
              });
            }
          }}
          keyExtractor={(item, index) => item.txt} // FlatList作用一样，优化
          renderItem={(item, index) => {
            return this.renderItem(item, index);
          }}
        />
      </SafeAreaView>
    );
  }

  renderItem(item, index) {
    const { navigation } = this.props;
    return (
      <View style={[styles.item]}>
        <View style={styles.itemInnerContainer}>
          <TouchableOpacity
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
            <Image
              style={[styles.itemIcon, { tintColor: item.tintColor }]}
              source={item.icon}
            />
          </TouchableOpacity>
          <Text style={styles.itemText}>{item.txt}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#2ecc71",
    borderBottomWidth: 2,
  },
  header_title: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f39c12",
    borderRadius: 20,
  },
  item_icon_swipe: {
    width: childrenWidth * 0.7,
    height: childrenWidth * 0.7,
    backgroundColor: "#fff",
    borderRadius: childrenWidth * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  item_icon: {
    width: childrenWidth * 0.5,
    height: childrenWidth * 0.5,
    resizeMode: "contain",
  },
  item_text_swipe: {
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  item_text: {
    color: "#444",
    fontSize: 14,
    fontWeight: "bold",
  },

  aheader: {
    height: headerViewHeight,
    flexDirection: "row",
    borderBottomColor: "#2ecc71",
    borderBottomWidth: 2,
    zIndex: 100,
    backgroundColor: "#fff",
  },
  aheader_img: {
    width: headerViewHeight * 0.6,
    height: headerViewHeight * 0.6,
    resizeMode: "cover",
    borderRadius: headerViewHeight * 0.3,
    marginLeft: 16,
    marginTop: 10,
  },
  aheader_context: {
    marginLeft: 8,
    height: headerViewHeight * 0.4,
    marginTop: 10,
  },
  aheader_title: {
    color: "#333",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  aheader_desc: {
    color: "#444",
    fontSize: 16,
    width: width - headerViewHeight * 0.6 - 32,
  },
  abottom: {
    justifyContent: "center",
    alignItems: "center",
    height: bottomViewHeight,
    backgroundColor: "#fff",
    zIndex: 100,
    borderTopColor: "#2ecc71",
    borderTopWidth: 2,
  },
  abottom_desc: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
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
    borderColor: "#000",
    borderRadius: ScaleSize(30),
  },
  square: {
    width: 50,
    height: 50,
  },
  itemTitle: {
    marginTop: 5,
    fontSize: 16, // Thay đổi kích thước chữ ở đây
    color: "#333", // Thay đổi màu chữ ở đây
    textAlign: "center",
  },

  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderRadius: ScaleSize(20),
    elevation: 5, // Add elevation for shadow (Android)
    shadowColor: "#000", // Add shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Adjust shadow opacity
    shadowRadius: 4, // Adjust shadow radius
  },
  item: {
    width: childrenWidth,
    height: ScaleSize(150),
    backgroundColor: "#fff",
    borderRadius: 45,
    overflow: "hidden", // Hide overflow content
  },
  itemInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5FF",
  },
  itemIcon: {
    width: childrenWidth * 0.5,
    height: childrenWidth * 0.5,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
