import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage("");

    try {
      const response = await generateResponseFromGPT(newMessage);
      setMessages([...messages, { text: response, isUser: false }]);
    } catch (error) {
      console.error("Error generating GPT response:", error);
    }
  };

  const generateResponseFromGPT = async (userMessage) => {
    const apiKey = "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";
    const prompt = `User: ${userMessage}\nGPT: `;
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 50,
        }),
      }
    );
    const responseBody = await response.json();
    return "GPT Maintenance";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={{ flex: 1, lexDirection: "column" }}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={item.isUser ? styles.userMessage : styles.botMessage}>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#777",
    marginRight: 8,
    paddingLeft: 12,
    borderRadius: 8,
    color: "#333",
    fontSize: 14,
  },
});

export default ChatScreen;
