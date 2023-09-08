import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Keyboard } from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, Keyboard]);

  useEffect(() => {
    sendMessageFirstTime();
  }, []);

  const sendMessage = async () => {
    flatListRef.current.scrollToEnd({ animated: true });
    if (newMessage.trim() === "") return;

    // Lưu trữ tin nhắn của người dùng tạm thời
    const userMessage = { text: newMessage, isUser: true };

    // Thêm tin nhắn của người dùng vào danh sách tin nhắn
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setNewMessage("");
    setIsLoading(true);

    try {
      const response = await generateResponseFromGPT(newMessage);
      // Thêm tin nhắn của AI vào danh sách tin nhắn sau khi nhận phản hồi từ API
      const aiMessage = { text: response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error generating GPT response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageFirstTime = async () => {
    flatListRef.current.scrollToEnd({ animated: true });

    // Lưu trữ tin nhắn của người dùng tạm thời
    const userMessage = { text: newMessage, isUser: true };

    // Thêm tin nhắn của người dùng vào danh sách tin nhắn
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setNewMessage("");
    setIsLoading(true);

    try {
      const response = await generateResponseFromGPT("Xin chào");
      // Thêm tin nhắn của AI vào danh sách tin nhắn sau khi nhận phản hồi từ API
      const aiMessage = { text: response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error generating GPT response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponseFromGPT = async (userMessage) => {
    const apiKey = "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";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: userMessage }],
        model: "gpt-3.5-turbo",
      }),
    });
    const responseBody = await response.json();
    console.debug("=-=responseBody", responseBody);

    return responseBody?.choices[0]?.message?.content;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <View style={item.isUser ? styles.userMessage : styles.botMessage}>
              <Text style={item.isUser ? { color: "white" } : {}}>
                {item.text}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          inverted={false}
          contentContainerStyle={styles.messagesContainer} // Thêm style này
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007BFF" />
            <Text style={styles.loadingText}>Typing...</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            editable={!isLoading}
            onChangeText={(text) => setNewMessage(text)}
            placeholder="Type a message..."
            onSubmitEditing={sendMessage}
          />
          <Button title="Send" onPress={sendMessage} disabled={isLoading} />
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
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  loadingText: {
    marginLeft: 8,
    color: "#777",
  },
});

export default ChatScreen;
