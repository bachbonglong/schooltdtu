import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const subjectsData = [
  {
    id: "1",
    name: "Toán",
    teacher: "Nguyễn Văn A",
    teacherImage:
      "https://media.baamboozle.com/uploads/images/477884/1632789227_114328.png",
  },
  {
    id: "2",
    name: "Lý",
    teacher: "Phạm Thị B",
    teacherImage:
      "https://media.baamboozle.com/uploads/images/477884/1632789227_114328.png",
  },
  {
    id: "3",
    name: "Hóa",
    teacher: "Trần Văn C",
    teacherImage:
      "https://media.baamboozle.com/uploads/images/477884/1632789227_114328.png",
  },
  // Add more subjects here
];

const randomColor = () => {
  const colors = ["#FF5733", "#C70039", "#900C3F", "#581845", "#003366"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const SubjectItem = ({ name, teacher, teacherImage, props }) => (
  <TouchableOpacity
    style={[styles.subjectItem, { backgroundColor: randomColor() }]}
    activeOpacity={0.8}
    onPress={() => {
      const { navigation } = props;
      navigation.navigate("DETAIL CLASS SUBJECT");
    }}
  >
    <Image source={{ uri: teacherImage }} style={styles.teacherImage} />
    <View style={styles.subjectInfo}>
      <Text style={styles.subjectName}>{"Tên môn học: " + name}</Text>
      <Text style={styles.teacherName}>{"Giáo viên: " + teacher}</Text>
    </View>
    <Image
      source={{
        uri: "https://w7.pngwing.com/pngs/955/437/png-transparent-arrow-chevron-right-small-direction-navigation-arrow-icon.png",
      }} // Thay đổi đường dẫn ảnh của mũi tên bên phải
      style={styles.arrowIcon}
    />
  </TouchableOpacity>
);

const ClassObject = (props) => {
  const renderSubjectItem = ({ item }) => (
    <SubjectItem
      name={item.name}
      teacher={item.teacher}
      teacherImage={item.teacherImage}
      props={props}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subjectsData}
        renderItem={renderSubjectItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 16,
  },
  flatListContainer: {
    paddingHorizontal: 8,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  teacherName: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
});

export default ClassObject;
