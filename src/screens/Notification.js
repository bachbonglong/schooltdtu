import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const notificationsData = [
  {
    id: "1",
    title: "Thông báo quan trọng",
    content: "Nội dung thông báo 1...",
    date: "2023-09-01 09:00",
    isRead: true,
  },
  {
    id: "2",
    title: "Thông báo mới",
    content: "Nội dung thông báo 2...",
    date: "2023-09-02 14:30",
    isRead: false,
  },
  // Add more notifications here
];

const NotificationItem = ({ title, content, date, isRead }) => (
  <View
    style={[
      styles.notificationItem,
      isRead ? styles.readItem : styles.unreadItem,
    ]}
  >
    <Text style={styles.notificationTitle}>{title}</Text>
    <Text style={styles.notificationDate}>{date}</Text>
    <Text style={styles.notificationContent}>{content}</Text>
  </View>
);

const NotificationsScreen = () => {
  const renderNotificationItem = ({ item }) => (
    <NotificationItem
      title={item.title}
      content={item.content}
      date={item.date}
      isRead={item.isRead}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
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
  flatList: {
    padding: 16,
  },
  notificationItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  readItem: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
  },
  unreadItem: {
    borderColor: "#FF5733",
    borderWidth: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  notificationContent: {
    fontSize: 16,
  },
});

export default NotificationsScreen;
