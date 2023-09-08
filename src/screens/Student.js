import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaleSize, getStorage } from "../Utils";
import RBSheet from "react-native-raw-bottom-sheet";
import { CallNewAPI } from "../Utils/requestAPI";
import Spinner from "react-native-loading-spinner-overlay";

const TOP10 = [
  {
    name: "1. Add Score Student ",
  },
  {
    name: "2. Feedback Student",
  },
];

const Student = (props) => {
  const { route } = props;
  const { params } = route;
  const refRBSheet = useRef(null);
  const [classData, setClassData] = useState([]);
  const [value, setValue] = useState("");
  const [spinner, setSpinner] = useState(false);

  const _renderItem = (itemData, item) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          const access_token = await getStorage("access_token", "");
          setValue(item);
          setSpinner(true);
          CallNewAPI(
            access_token,
            `classroom/${params?.class}/student/${item?.username}/add-score/`,
            {
              student: item?.username,
              classroom: params?.class,
              score_system_1: "8.5,7.0,9.5",
              score_system_2: "[9.0,8.0,7.5]",
              score_system_3: "8.8",
            },
            "POST",
            (res) => {
              setSpinner(false);
              console.debug("=-=res", res);
              refRBSheet.current.close();
            }
          );
        }}
        style={{
          marginVertical: ScaleSize(10),
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{itemData?.item.name}</Text>
      </TouchableOpacity>
    );
  };

  const SubjectItem = ({ item, props, index }) => (
    <TouchableOpacity
      style={[
        styles.subjectItem,
        { backgroundColor: index % 2 == 0 ? "purple" : "green" },
      ]}
      activeOpacity={0.8}
      onPress={() => {
        refRBSheet.current.open();
      }}
    >
      {/* <Image source={{ uri: teacherImage }} style={styles.teacherImage} /> */}
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>
          {"ID Student: "}{" "}
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>{item?.id}</Text>
        </Text>
        <Text style={styles.subjectName}>
          {"Name Student: "}{" "}
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>
            {item?.first_name + item?.last_name}
          </Text>
        </Text>
        <Text style={styles.subjectName}>
          {"Email: "}{" "}
          <Text style={{ fontWeight: "normal", fontSize: 18 }}>
            {item?.email}
          </Text>
        </Text>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={150}
        openDuration={250}
        customStyles={{
          container: {},
        }}
      >
        <FlatList
          data={TOP10}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(itemData) => _renderItem(itemData, item)}
          contentContainerStyle={styles.container}
        />
      </RBSheet>
    </TouchableOpacity>
  );

  const renderSubjectItem = ({ item, index }) => (
    <SubjectItem item={item} props={props} index={index} />
  );

  return (
    <View style={styles.container}>
      <Spinner visible={spinner} size={"large"} />

      <FlatList
        data={params?.data}
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
    backgroundColor: "green",
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

export default Student;
