import React, { Component } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Akira } from "react-native-textinput-effects";
import { ScaleSize } from "../Utils";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Spinner from "react-native-loading-spinner-overlay";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import RBSheet from "react-native-raw-bottom-sheet";
import { CallAPIAuthentication, CallAPIInfo } from "../Utils/requestAPI";
import { isBuffer, isEmpty } from "lodash";
import { Popup } from "popup-ui";
import { Linking } from "react-native";

const TOP10 = [
  {
    name: "1. Đại học Tôn Đức Thắng ",
    id: "TDTU",
  },
  {
    name: "2. Đại học Quốc gia Thành phố Hồ Chí Minh",
    id: "ĐHQG TPHCM",
  },
  {
    name: "3. Đại học Bách Khoa Thành phố Hồ Chí Minh",
    id: "HCMUT",
  },
  {
    name: "4. Đại học Sư phạm Thành phố Hồ Chí Minh",
    id: "HCMUE",
  },
  {
    name: "5. Đại học Ngoại thương Thành phố Hồ Chí Minh",
    id: "TDTU",
  },

  {
    name: "6. Đại học RMIT Việt Nam",
    id: "RMIT",
  },
  {
    name: "7. Đại học FPT",
    id: "FPTU",
  },
];

export default class GetInfo extends Component {
  constructor(params) {
    super();
    this.state = {
      loading: false,
      value: {},
      valueTemp: "",
      info: [],
    };
  }

  getInfo = async () => {
    this.setState({ loading: true });
    const { value, valueTemp } = this.state;
    const finalValue = !isEmpty(value?.id) ? value?.id : valueTemp;
    await CallAPIInfo(finalValue, (res) => {
      this.setState({ loading: false });

      if (res?.length == 0) {
        Popup.show({
          type: "Warning",
          title: "Warning",
          button: true,
          textBody: "Check ID UNIVERSITY",
          buttonText: "Ok",
        });
      }
      this.setState({ info: res });
      this.setState({ valueTemp: "", value: {} });
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ value: item, valueTemp: "1" });
          this.RBSheet.close();
        }}
        style={{
          marginVertical: ScaleSize(10),
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderSubjectInput = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item?.URL);
        }}
      >
        <Card containerStyle={[styles.cardContainer, styles.positiveCard]}>
          <View style={styles.teacherInfo}>
            <Text h4 style={styles.teacherText}>
              {item?.CODE}
            </Text>
          </View>
          <Text style={styles.feedbackText}>
            {"UNIVESITY: " + item?.UNIVESITY}
          </Text>

          <Text style={styles.feedbackText}>
            {"Điểm chuẩn: " + item?.SCORE}
          </Text>

          <Text style={styles.feedbackText}>
            {"Cách Thức tuyển sinh: " + item?.METHOD}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    const { value, valueTemp, info } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Spinner
          visible={this.state.loading}
          size={"large"}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <Card containerStyle={[styles.cardContainer, styles.positiveCard]}>
            <View style={styles.teacherInfo}>
              <Text h4 style={styles.teacherText}>
                {"Lấy thông tin điểm ngành trường"}
              </Text>
            </View>
            <Text style={styles.feedbackText}>
              {
                "Lấy thông tin điểm theo ngành của Trường một cách nhanh chóng và luôn udpate thường xuyên dựa trên hệ thống trường Đại Học"
              }
            </Text>
          </Card>
          <Akira
            style={styles.input}
            label={"Nhập Mã Trường"}
            borderColor={"#a5d1cc"}
            labelStyle={{ color: "#ac83c4" }}
            onChangeText={(text) => {
              this.setState({ valueTemp: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.open();
            }}
          >
            <Card
              containerStyle={[
                styles.cardContainer,
                ,
                { backgroundColor: "#40E0D0" },
              ]}
            >
              <Text style={[styles.feedbackText, { textAlign: "center" }]}>
                {value?.name
                  ? value?.name
                  : "Chọn thông tin top 7 Mã Trường hot"}
              </Text>
            </Card>
          </TouchableOpacity>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <FlatList
              data={TOP10}
              keyExtractor={(_, index) => index.toString()}
              renderItem={this._renderItem}
              contentContainerStyle={styles.container}
            />
          </RBSheet>
          {info?.length > 0 && (
            <FlatList
              data={info}
              keyExtractor={(_, index) => index.toString()}
              renderItem={this.renderSubjectInput}
              contentContainerStyle={styles.container}
            />
          )}
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor:
                valueTemp || !isEmpty(value) ? "#FF764B" : "grey",
            },
          ]}
          onPress={this.getInfo}
        >
          <Text style={styles.logoutButtonText}>Lấy Thông Tin</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedbackText: {
    color: "white",
    paddingVertical: ScaleSize(10),
  },
  teacherText: {
    color: "#fff",
  },
  teacherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: ScaleSize(20),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: ScaleSize(20),
  },
  cardContainer: {
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  positiveCard: {
    backgroundColor: "#4CAF50", // Green background for positive feedback
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: "#FF764B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: ScaleSize(200),
    marginBottom: ScaleSize(30),
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: ScaleSize(16),
    textAlign: "center",
  },
});
