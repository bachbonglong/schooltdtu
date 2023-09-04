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

var radio_props = [
  { label: "Hệ THPT          ", value: 0 },
  { label: "Hệ GDTX", value: 1 },
];

const subjects = [
  {
    name: "Toán",
    id: "toan",
    value: "",
  },
  {
    name: "Ngoại Ngữ",
    id: "ngoaingu",
    value: "",
  },
  {
    name: "Ngữ văn",
    id: "nguvan",
    value: "",
  },
  {
    name: "Sinh học (Hoặc GDCD)",
    id: "sinhduc",
    value: "",
  },
  {
    name: "Hóa học (Địa Lí)",
    id: "hoadia",
    value: "",
  },
  {
    name: "Vật lý (Địa Lý)",
    id: "vatdia",
    value: "",
  },
  {
    name: "Điểm TB Cả năm 12",
    id: "tbcanam",
    value: "",
  },
  {
    name: "Điểm khuyến khích (Nếu có)",
    id: "khuyenkhich",
    value: "",
  },
  {
    name: "Điểm ưu tiên ( Nếu có )",
    id: "uutien",
    value: "",
  },
];

export default class QuickCaculator extends Component {
  constructor(params) {
    super();

    this.state = {
      toan: 0,
      ngoaingu: 0,
      nguvan: 0,
      sinhduc: 0,
      hoadia: 0,
      vatdia: 0,
      tbcanam: 0,
      khuyenkhich: 0,
      uutien: 0,
      finalDescription: "",
      suggest: "",
      isSuggest: false,
      loading: false,
      suggest2: "",
      value: 0,
    };
  }

  handleChange = (name, value) => {
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
      this.setState({ [name]: value });
    } else {
      // Hiển thị cảnh báo nếu giá trị không hợp lệ
      alert("Lỗi Vui lòng nhập giá trị từ 1 đến 10");
      this.setState({ [name]: "" });
    }
  };

  handleButton = () => {
    const {
      toan,
      ngoaingu,
      nguvan,
      sinhduc,
      hoadia,
      vatdia,
      tbcanam,
      khuyenkhich,
      uutien,
      value,
    } = this.state;

    // Hệ THPT

    const diemchinh =
      parseFloat(toan) + parseFloat(nguvan) + parseFloat(ngoaingu);

    let diemTBToHop = 0;

    if (sinhduc > 0 && hoadia > 0 && vatdia > 0) {
      diemTBToHop =
        (parseFloat(sinhduc) + parseFloat(hoadia) + parseFloat(vatdia)) / 3;
    } else if (sinhduc > 0 && hoadia > 0) {
      diemTBToHop = (parseFloat(sinhduc) + parseFloat(hoadia)) / 2;
    } else if (sinhduc > 0 || hoadia > 0 || vatdia > 0) {
      diemTBToHop =
        (parseFloat(sinhduc) + parseFloat(hoadia) + parseFloat(vatdia)) / 3;
    }

    const diemTrungBinhNam12 = tbcanam;
    const diemUuTien = parseFloat(uutien);
    const diemKhuyenKhich = parseFloat(khuyenkhich);

    const tongDiem =
      (((diemchinh + diemTBToHop + diemKhuyenKhich) / 4) * 7 +
        diemTrungBinhNam12 * 3) /
        10 +
      diemUuTien;

    // Thực hiện tính điểm và nội dung khuyến nghị ở đây
    const finalDescription = `Tổng điểm của bạn là ${tongDiem}`;
    this.setState({ finalDescription });
  };

  renderSubjectInput = ({ item, index }) => (
    <View style={styles.row}>
      <Akira
        style={styles.input}
        label={item?.name}
        borderColor={"#a5d1cc"}
        labelStyle={{ color: "#ac83c4" }}
        onChangeText={(text) => {
          this.handleChange(item?.id, text);
        }}
      />
      <View style={{ marginHorizontal: 10 }} />
    </View>
  );

  renderPopup = () => {
    const { isSuggest, suggest, suggest2 } = this.state;

    return (
      <ConfirmDialog
        title="Thông báo"
        message={suggest2 ? suggest2 : suggest}
        visible={isSuggest}
        onTouchOutside={() => this.setState({ dialogVisible: false })}
        positiveButton={{
          title: "OK",
          onPress: () => {
            this.setState({ finalDescription: "", isSuggest: false });
          },
        }}
        negativeButton={
          !suggest2
            ? {
                title: "Đưa lời khuyên nghề nghiệp",
                onPress: () => {
                  this.generateResponseFromGPT2();
                },
              }
            : null
        }
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {this.renderPopup()}
        <Spinner
          visible={this.state.loading}
          size={"large"}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <Card containerStyle={[styles.cardContainer, styles.positiveCard]}>
            <View style={styles.teacherInfo}>
              <Text h4 style={styles.teacherText}>
                {"Tính nhanh điểm xét tốt nghiệp"}
              </Text>
            </View>
            <Text style={styles.feedbackText}>
              {this.state.finalDescription}
            </Text>
          </Card>
          <FlatList
            data={subjects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={this.renderSubjectInput}
            contentContainerStyle={styles.container}
          />
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={(value) => {
                this.setState({ value: value });
              }}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={this.handleButton}
        >
          <Text style={styles.logoutButtonText}>Tính toán</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedbackText: {
    color: "#fff",
  },
  teacherText: {
    color: "#fff",
  },
  teacherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: ScaleSize(20),
    left: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 15,
  },
  input: {
    flex: 1,
    borderRadius: 20,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: ScaleSize(20),
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
    marginBottom: ScaleSize(20),
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: ScaleSize(24),
    textAlign: "center",
  },
});
