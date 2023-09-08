import React, { Component } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Akira } from "react-native-textinput-effects";
import { ScaleSize } from "../Utils";
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Spinner from "react-native-loading-spinner-overlay";

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
    name: "Sinh học",
    id: "sinhhoc",
    value: "",
  },
  {
    name: "Hóa học",
    id: "hoahoc",
    value: "",
  },
  {
    name: "Vật lý",
    id: "vatly",
    value: "",
  },
  {
    name: "Địa lý",
    id: "dialy",
    value: "",
  },
  {
    name: "Lịch sử",
    id: "lichsu",
    value: "",
  },
];

export default class DuDoanChonKhoi extends Component {
  constructor(params) {
    super();

    this.state = {
      toan: "",
      ngoaingu: "",
      nguvan: "",
      sinhhoc: "",
      vatly: "",
      dialy: "",
      lichsu: "",
      hoahoc: "",
      finalDescription: "",
      suggest: "",
      isSuggest: false,
      loading: false,
      suggest2: "",
    };
  }

  handleChange = (name, value) => {
    if (value === "" || (parseFloat(value) >= 1 && parseFloat(value) <= 10)) {
      this.setState({ [name]: value });
    } else {
      // Hiển thị cảnh báo nếu giá trị không hợp lệ
      alert("Lỗi Vui lòng nhập giá trị từ 1 đến 10");
      this.setState({ [name]: "" });
    }
  };

  handleButton = () => {
    const { dialy, lichsu, ngoaingu, nguvan, sinhhoc, toan, vatly, hoahoc } =
      this.state;

    // Tạo một mảng chứa các môn học và điểm thi của bạn
    const subjectsData = [
      { name: "Toán", value: toan },
      { name: "Ngữ Văn", value: nguvan },
      { name: "Vật lý", value: vatly },
      { name: "Sinh học", value: sinhhoc },
      { name: "Địa lý", value: dialy },
      { name: "Lịch sử", value: lichsu },
      { name: "Ngoại Ngữ", value: ngoaingu },
      { name: "Hóa học", value: hoahoc },
    ];

    // Tạo một mảng chứa các môn học có điểm
    const scoredSubjects = subjectsData.filter(
      (subject) => subject.value !== ""
    );

    // Tạo các câu mô tả dựa trên điểm thi của từng môn
    const descriptions = scoredSubjects.map((subject) => {
      return `${subject.name} ${subject.value}`;
    });

    // Tạo câu mô tả cuối cùng
    const finalDescription = `Với điểm thi tôi dự đoán đại học là ${descriptions.join(
      ", "
    )} thì tôi nên chọn khối nào ?`;

    this.setState({ loading: true });
    this.generateResponseFromGPT(finalDescription);
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

  generateResponseFromGPT = async (userMessage) => {
    const apiKey = "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";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: userMessage }],
        model: "gpt-3.5-turbo",
      }),
    });
    const responseBody = await response.json();
    console.debug(responseBody?.choices[0]?.message?.content);
    if (responseBody?.choices[0]?.message?.content) {
      this.setState({
        loading: false,
        isSuggest: true,
        suggest: responseBody.choices[0].message.content,
      });
    }
  };

  generateResponseFromGPT2 = async () => {
    this.setState(
      {
        isSuggest: false,
      },
      () => {
        this.setState({ loading: true });
      }
    );
    console.debug("=-=vào rồi nè");
    const apiKey = "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";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "Với số điểm trên tôi cung cấp, tôi nên chọn ngành nghề gì hợp lý với mình",
          },
        ],
        model: "gpt-3.5-turbo",
      }),
    });
    console.debug("=-=response", response);
    const responseBody = await response.json();
    console.debug(responseBody?.choices[0]?.message?.content);
    if (responseBody?.choices[0]?.message?.content) {
      this.setState({
        loading: false,
        isSuggest: true,
        suggest2: responseBody?.choices[0]?.message?.content,
      });
    }
  };

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
            this.setState({
              finalDescription: "",
              isSuggest: false,
              suggest2: "",
            });
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
                {"Tư vấn chọn khôi"}
              </Text>
            </View>
            <Text style={styles.feedbackText}>
              {
                "Dựa vào số điểm của bạn cung cấp, và những điểm mạnh của bạn chúng tôi sẽ đưa ra lời khuyên lựa chọn khối phù hợp cho bạn"
              }
            </Text>
          </Card>
          <FlatList
            data={subjects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={this.renderSubjectInput}
            contentContainerStyle={styles.container}
          />
        </ScrollView>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={this.handleButton}
        >
          <Text style={styles.logoutButtonText}>Dự đoán </Text>
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
    marginBottom: 10,
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
  },
  input: {
    flex: 1,
    borderRadius: 20,
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
    fontSize: ScaleSize(24),
    textAlign: "center",
  },
});
