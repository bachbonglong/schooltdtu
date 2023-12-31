import React, { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const feedbackData = [
  {
    teacher: "Teacher 1",
    content: "Good job in the last class. Keep it up!",
    feedbackType: "positive",
  },
  {
    teacher: "Teacher 2",
    content: "You need to improve your participation.",
    feedbackType: "negative",
  },
  {
    teacher: "Teacher 3",
    content: "Excellent work. You're a dedicated student.",
    feedbackType: "positive",
  },
  {
    teacher: "Teacher 4",
    content: "Excellent work. You're a dedicated student.",
    feedbackType: "positive",
  },
  {
    teacher: "Teacher 5",
    content: "Excellent work. You're a dedicated student.",
    feedbackType: "positive",
  },
  {
    teacher: "Teacher 6",
    content: "Excellent work. You're a dedicated student.",
    feedbackType: "positive",
  },
  // Add more feedback items with feedbackType as "positive" or "negative"
];

export default class FeedbackScreen extends Component {
  renderFeedbackCards() {
    return feedbackData.map((item, index) => (
      <Animatable.View
        key={index}
        animation="fadeInUp" // Apply a fade-in animation
        duration={1000} // Animation duration in milliseconds
        style={styles.feedbackContainer}
      >
        <Card
          containerStyle={[
            styles.cardContainer,
            item.feedbackType === "positive"
              ? styles.positiveCard
              : styles.negativeCard,
          ]}
        >
          <View style={styles.teacherInfo}>
            <Text h4 style={styles.teacherText}>
              {item.teacher}
            </Text>
          </View>
          <Text style={styles.feedbackText}>{item.content}</Text>
        </Card>
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
  feedbackContainer: {
    margin: 10,
  },
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
    width: 50,
    height: 50,
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
