import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from "react-native";
import { ScaleSize, getStorage } from "../Utils";
import { Table } from "react-native-table-component";
import { Row } from "react-native-table-component";
import { Rows } from "react-native-table-component";
import { CallAPIAuthentication, CallNewAPI } from "../Utils/requestAPI";

const data = [
  {
    subject: "Toán",
    scores: { score1: "8 ", score2: "9 ", score3: 7 },
  },
  {
    subject: "Lý",
    scores: { score1: "7 ", score2: "8 ", score3: 6 },
  },
  {
    subject: "Hóa",
    scores: { score1: "9 ", score2: "9", score3: 8 },
  },
];

const tableHead = [
  "Subject",
  "score_system_1",
  "score_system_2",
  "score_system_3",
];
const tableData = [
  ["Toán", "2", "3", "4"],
  ["Lý", "3", "4", "5"],
  ["Hóa", "2", "3", "2"],
  ["Văn", "5", "4", "3"],
  ["Sử", "2", "3", "4"],
  ["Địa", "6", "5", "3"],
  ["Tiếng anh", "9", "4", "5"],
];

const App = (props) => {
  const [selectedSemester, setSelectedSemester] = useState("Học kì 1");
  const [selectedYear, setSelectedYear] = useState("2023");

  const [studentName, setStudent] = useState("");
  const [score, setScore] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const username = await getStorage("username", "");
      const access_token = await getStorage("access_token", "");
      setStudent(username);
      CallNewAPI(
        access_token,
        `classroom/student/${username}/scores/2023/1`,
        "",
        "GET",
        (res) => {
          console.debug(res);
          setScore([
            [
              res[0].classroom,
              res[0].score_system_1,
              String(res[0].score_system_2).replace("[", "").replace("]", ""),
              res[0].score_system_3,
            ],
          ]);
        }
      );
    }, 100);
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Học kì:</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedSemester}
        onValueChange={(itemValue) => otsetSelectedSemester(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Học kì 1" value="Học kì 1" />
        <Picker.Item label="Học kì 2" value="Học kì 2" />
      </Picker>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Năm học:</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="2023" value="2023" />
        <Picker.Item label="2024" value="2024" />
      </Picker>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.subjectCell}>
        <Text style={styles.subjectText}>{item.subject}</Text>
      </View>
      <View style={styles.scoreCell}>
        <Text style={styles.scoreText}>{item.scores.score1}</Text>
      </View>
      <View style={styles.scoreCell}>
        <Text style={styles.scoreText}>{item.scores.score2}</Text>
      </View>
      <View style={styles.scoreCell}>
        <Text style={styles.scoreText}>{item.scores.score3}</Text>
      </View>
      <View style={styles.averageCell}>
        <Text style={styles.scoreText}>
          {(
            (parseFloat(item.scores.score1) +
              parseFloat(item.scores.score2) +
              parseFloat(item.scores.score3)) /
            3
          ).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ width: 200, marginBottom: ScaleSize(20) }}>
        <Text style={styles.optionText}>Student: {studentName}</Text>
      </View>
      <View style={{ width: 200, marginBottom: ScaleSize(20) }}>
        <Text style={styles.optionText}>Year: 2023</Text>
      </View>
      <View style={{ width: 200, marginBottom: ScaleSize(20) }}>
        <Text style={styles.optionText}>Semester: 1</Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={score} textStyle={styles.text} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    bottom: 200,
  },
  option: {
    marginRight: 8,
    marginBottom: ScaleSize(50),
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    flex: 1,
    height: 10,
    bottom: 100,
    marginRight: ScaleSize(0),
    right: ScaleSize(20),
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  subjectCell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  subjectText: {
    textAlign: "center",
  },
  scoreCell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  scoreText: {
    textAlign: "center",
  },
  averageCell: {
    flex: 1,
    padding: 8,
  },

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});

export default App;
