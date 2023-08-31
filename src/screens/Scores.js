import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from "react-native";
import { ScaleSize } from "../Utils";

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
  // Add more subjects here
];

const App = () => {
  const [selectedSemester, setSelectedSemester] = useState("Học kì 1");
  const [selectedYear, setSelectedYear] = useState("2023");
  const studentName = "Nguyễn Văn A"; // Tên học sinh
  const teacherName = "Nguyễn Thị B"; // Tên giáo viên chủ nhiệm
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Học kì:</Text>
      </TouchableOpacity>
      <Picker
        selectedValue={selectedSemester}
        onValueChange={(itemValue) => setSelectedSemester(itemValue)}
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
        <Text style={styles.optionText}>Học sinh: {studentName}</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>
          Giáo viên chủ nhiệm: {teacherName}
        </Text>
      </View>
      {renderHeader()}
      <FlatList
        data={data}
        style={{ bottom: 100 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    flex: 1,
    marginRight: 8,
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
});

export default App;
