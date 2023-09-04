import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native";

const feedbackData = [
  {
    teacher: "Tư vấn chọn khối",
    content:
      "Dựa vào số điểm của bạn cung cấp, và những điểm mạnh của bạn chúng tôi sẽ đưa ra lời khuyên lựa chọn khối phù hợp cho bạn",
    feedbackType: "positive",
    screen: "Prediction Industry Sector",
  },
  {
    teacher: "Lấy điểm chuẩn thông tin Trường",
    content:
      "Dựa vào mã trường chúng tôi sẽ cung cấp điểm chuẩn từng ngành môn học và cách thức xét tuyển của trường đó.",
    feedbackType: "negative",
    screen: "Get Info University",
  },

  {
    teacher: "Tính nhanh điểm xét tốt nghiệp",
    content:
      "Dựa vào bảng điểm bảng cung cấp tôi sẽ tính nhanh điểm tốt nghiệp một cách chính xác nhất",
    feedbackType: "negative",
    screen: "Quick Calculator",
  },

  // Add more feedback items with feedbackType as "positive" or "negative"
];

export default class SpellScreen extends Component {
  renderFeedbackCards() {
    return feedbackData.map((item, index) => (
      <Animatable.View
        key={index}
        animation="fadeInUp" // Apply a fade-in animation
        duration={1000} // Animation duration in milliseconds
        style={styles.feedbackContainer}
      >
        <TouchableOpacity
          onPress={() => {
            this.props?.navigation.navigate(item?.screen);
          }}
        >
          <Card containerStyle={[styles.cardContainer, styles.positiveCard]}>
            <View style={styles.teacherInfo}>
              <Text h4 style={styles.teacherText}>
                {item.teacher}
              </Text>
            </View>
            <Text style={styles.feedbackText}>{item.content}</Text>
          </Card>
        </TouchableOpacity>
      </Animatable.View>
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderFeedbackCards()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  feedbackContainer: {},
  cardContainer: {
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  positiveCard: {
    backgroundColor: "#4CAF50", // Green background for positive feedback
  },
  negativeCard: {
    backgroundColor: "#F44336", // Red background for negative feedback
  },
  teacherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  teacherText: {
    color: "#fff", // White text color
  },
  feedbackText: {
    color: "#fff", // White text color
  },
  feedbackCountText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
  },
  feedbackCountCard: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 10,
  },
  feedbackCount: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
