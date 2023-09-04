import AsyncStorage from "@react-native-community/async-storage";
import { Platform, StatusBar, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export function ScaleSize(fontSize, customWidth, standardScreenHeight = 375) {
  return Math.round((fontSize * (customWidth || width)) / standardScreenHeight);
}

export async function setStorage(keys, value) {
  try {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(keys, value);
  } catch (error) {}
}

export async function getStorage(keys, defaultValue = null) {
  let temp = await AsyncStorage.getItem(keys);
  if (temp == null) return defaultValue;
  try {
    let tempValue = temp;
    return tempValue;
  } catch (error) {
    return temp;
  }
}
