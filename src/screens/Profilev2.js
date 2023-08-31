import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScaleSize } from "../Utils";
import theme from "../theme";

export default UserProfileScreen = (props) => {
  const handleLogout = () => {
    const { navigation } = props;
    navigation.navigate("LOGIN");
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>Tên: Nguyễn Hoàng Huy</Text>
        <Text style={styles.email}>Email: huy.hoang@gmail.com</Text>
        <Text style={styles.university}>Trường THPT Hồ Chí Minh</Text>
        <Text style={styles.major}>Date of Birth: 20/12/2002</Text>
        <Text style={styles.age}>Age: 22</Text>
        <Text style={styles.location}>Location: HCM city </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: ScaleSize(80),
  },
  background: {
    backgroundColor: "#FFA45B",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: ScaleSize(230),
    height: ScaleSize(230),
    borderRadius: 60,
    marginBottom: 10,
  },
  userInfo: {
    marginTop: -80,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  university: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  major: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  age: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#FF764B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: ScaleSize(200),
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: ScaleSize(24),
    textAlign: "center",
  },
});
