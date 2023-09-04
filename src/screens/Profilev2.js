import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScaleSize, getStorage } from "../Utils";
import { CallNewAPI } from "../Utils/requestAPI";
import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("");
  const [spinner, setSpinner] = useState(false);

  function getRandomItemsFromArray(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const handleLogout = () => {
    const { navigation } = props;
    navigation.navigate("LOGIN");
  };
  const randomImage = [
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
    "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    "https://cdn3.vectorstock.com/i/1000x1000/23/22/new-woman-avatar-icon-flat-vector-19152322.jpg",
  ];

  useEffect(() => {
    setTimeout(async () => {
      const access_token = await getStorage("access_token", "");
      const username = await getStorage("username", "");
      setUsername(username);
      let user = "";
      if (username.includes("gv")) {
        user = "teachers";
      } else {
        user = "students";
      }
      setSpinner(true);
      CallNewAPI(
        access_token,
        `users/${user}/detail/${username}/`,
        "",
        "GET",
        (res) => {
          console.debug("=-=res", res);
          setSpinner(false);
          if (res) setUserInfo(res);
        }
      );
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={spinner} size={"large"} />
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: getRandomItemsFromArray(randomImage, 1)[0],
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{username}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Birthday </Text>
        <Text style={styles.infoValue}>{userInfo?.birth_date}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone Number </Text>
        <Text style={styles.infoValue}>{userInfo?.phone_number}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Class Join: </Text>
        <Text style={styles.infoValue}>
          {userInfo?.class_join ? userInfo.class_join.join(" ") : ""}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoValue}>{userInfo?.address}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Years of Experiene:</Text>
        <Text style={styles.infoValue}>{userInfo?.years_of_experience}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
          magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa
          sem. Etiam finibus odio quis feugiat facilisis.
        </Text>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },

  logoutButton: {
    alignSelf: "center",
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

export default ProfileScreen;
