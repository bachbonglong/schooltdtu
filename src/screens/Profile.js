import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CallNewAPI } from "../Utils/requestAPI";
import { getStorage } from "../Utils";

const Profile = () => {
  useEffect(() => {
    const access_token = getStorage("access_token", "");
    CallNewAPI();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("./path_to_profile_image.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Tên: Nguyễn Hoàng Huy</Text>
      <Text style={styles.email}>Email: huy.hoang@gmail.com</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Age:</Text>
        <Text style={styles.infoValue}>30</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoValue}>New York, USA</Text>
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
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Profile;
