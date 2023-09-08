import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CallNewAPI } from "../Utils/requestAPI";
import { ScaleSize, getStorage } from "../Utils";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";

const ClassObject = (props) => {
  const [classData, setClassData] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const access_token = await getStorage("access_token", "");
      setSpinner(true);
      CallNewAPI(access_token, `users/list-classrooms/`, "", "GET", (res) => {
        // if (res) setUserInfo(res);
        setSpinner(false);
        setClassData(res);
      });
    }, 100);
  }, []);

  const randomColor = () => {
    const colors = [
      "#FF5733",
      "#C70039",
      "#900C3F",
      "#581845",
      "#003366",
      "#FF7F50",
      "#B22222",
      "#FF69B4",
      "#808080",
      "#800080",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const SubjectItem = ({ item, props }) => (
    <TouchableOpacity
      style={[styles.subjectItem, { backgroundColor: randomColor() }]}
      activeOpacity={0.8}
      onPress={() => {
        const { navigation } = props;
        navigation.navigate("DETAIL CLASS SUBJECT", { item: item });
      }}
    >
      {/* <Image source={{ uri: teacherImage }} style={styles.teacherImage} /> */}
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>
          {"Info Class: " + item?.class_id}
        </Text>
        <Text style={styles.subjectName}>
          {"Create Date Class: " +
            moment(item?.created_date).format("DD-MM-YYYY")}
        </Text>

        <Text style={{}}>{"Info Class" + item?.info}</Text>
        {/* <Text style={styles.teacherName}>{"Giáo viên: " + teacher}</Text> */}
        <Text style={styles.subjectName}>
          {"School Year: " + item?.school_year}
        </Text>
        <Text style={styles.subjectName}>{"Semester: " + item?.semester}</Text>
      </View>
      <Image
        source={{
          uri: "https://w7.pngwing.com/pngs/955/437/png-transparent-arrow-chevron-right-small-direction-navigation-arrow-icon.png",
        }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  const renderSubjectItem = ({ item }) => (
    <SubjectItem item={item} props={props} />
  );

  return (
    <View style={styles.container}>
      <Spinner visible={spinner} size={"large"} />
      <FlatList
        data={classData}
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
    paddingVertical: ScaleSize(10),
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
