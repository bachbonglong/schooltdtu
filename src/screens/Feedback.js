import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getStorage } from "../Utils";

const feedbackData = [
  {
    id: "1",
    date: "2023-09-01 08:00 AM",
    teacher: "Nguyễn Thị A",
    praise: 5,
    criticism: 1,
    comment: "Học sinh tiến bộ trong học tập và thể chất.",
  },
  {
    id: "2",
    date: "2023-09-02 09:30 AM",
    teacher: "Trần Văn B",
    praise: 3,
    criticism: 2,
    comment: "Học sinh cần cải thiện tinh thần học tập.",
  },
  // Add more feedback here
];

const FeedbackItem = ({ date, teacher, praise, criticism, comment }) => (
  <View style={styles.feedbackItem}>
    <Text style={styles.feedbackDate}>{date}</Text>
    <Text style={styles.teacherName}>{`Đánh giá bởi: ${teacher}`}</Text>
    <View style={styles.feedbackStats}>
      <Text style={styles.feedbackStatLabel}>Khen ngợi:</Text>
      <Text style={styles.feedbackStatValue}>{praise}</Text>
    </View>
    <View style={styles.feedbackStats}>
      <Text style={styles.feedbackStatLabel}>Chê trách:</Text>
      <Text style={styles.feedbackStatValue}>{criticism}</Text>
    </View>
    <Text style={styles.feedbackComment}>{comment}</Text>
  </View>
);

const TeacherFeedbackScreen = ({ role }) => {
  const [showCreateButton, setShowCreateButton] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const isShow = await getRole();
      if (isShow === true || isShow === false) {
        setShowCreateButton(isShow);
      }
      return null;
    }, 100);
  }, []);

  const getRole = async () => {
    const role = await getStorage("username", "");
    const substring = "gv";
    return role.includes(substring);
  };

  const renderFeedbackItem = ({ item }) => (
    <FeedbackItem
      date={item.date}
      teacher={item.teacher}
      praise={item.praise}
      criticism={item.criticism}
      comment={item.comment}
    />
  );

  return (
    <View style={styles.container}>
      {showCreateButton && (
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Tạo đánh giá</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={feedbackData}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  createButton: {
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    margin: 16,
    alignSelf: "flex-end",
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  flatList: {
    padding: 16,
  },
  feedbackItem: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackDate: {
    fontSize: 16,
    marginBottom: 8,
    color: "#777",
  },
  teacherName: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  feedbackStats: {
    flexDirection: "row",
    marginBottom: 4,
  },
  feedbackStatLabel: {
    marginRight: 8,
    color: "#555",
  },
  feedbackStatValue: {
    fontWeight: "bold",
  },
  feedbackComment: {
    fontSize: 16,
  },
});

export default TeacherFeedbackScreen;
