import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { ScaleSize } from "../Utils";
import moment from "moment";
import { Icon } from "galio-framework";

const randomImage = [
  "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
  "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  "https://cdn3.vectorstock.com/i/1000x1000/23/22/new-woman-avatar-icon-flat-vector-19152322.jpg",
];

const DetailComment = (props) => {
  const { params } = props?.route;
  const { comments = [] } = params || {};
  console.debug(comments);
  const [modalVisible, setModalVisible] = useState(false);

  function getRandomItemsFromArray(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const CommentItem2 = ({ comment }) => (
    <View style={[styles.commentItem]}>
      {console.debug("=-item", comment)}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: getRandomItemsFromArray(randomImage, 1)[0],
          }}
          style={styles.avatar}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentName}>
            {"Id Author Comment: " + comment?.author}
          </Text>
          <Text style={styles.commentText}>{comment?.content}</Text>
        </View>
      </View>
      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.commentAction}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentAction}>
          <Text>Phản hồi</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="Nhập bình luận..." style={styles.commentInput} />
    </View>
  );

  const renderCommentItem = ({ item, index }) => (
    <CommentItem2 comment={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.comment_id}
            ListEmptyComponent={() => {
              return (
                <View style={styles.emptyContainer}>
                  <Image
                    source={{
                      uri: "https://img.mservice.com.vn/app/img/authentication/ic_empty_document.png",
                    }}
                    resizeMode="contain"
                    style={{ height: 120, width: 125 }}
                  />
                  <Text style={styles.textEmpty}>{"No comment "}</Text>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.modalContainer2}>
          <TextInput
            placeholder="Nhập bình luận..."
            style={styles.commentInput}
          />
          <View style={{ bottom: 8, left: 10 }}>
            <Icon name={"paper-plane"} family="font-awesome" size={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: "#FF5733",
    marginBottom: 16,
    borderRadius: 8,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  teacherName: {
    fontSize: 18,
    color: "white",
    marginBottom: 8,
  },
  note: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  createPost: {
    flexDirection: "row",
    marginBottom: 16,
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
  createButton: {
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  postItem: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    flex: 1,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  likeIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  editDeleteSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    bottom: 4,
    paddingBottom: ScaleSize(20),
  },
  actionText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  commentItem: {
    backgroundColor: "#F7F7F7",
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer2: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: ScaleSize(30),
    flexDirection: "row",
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  commentItem: {
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: "center",
  },
  openModalButton: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  commentText: {
    color: "gray",
    paddingVertical: ScaleSize(20),
    maxWidth: ScaleSize(300),
  },
  commentActions: {
    paddingVertical: ScaleSize(10),
    flexDirection: "row",
    left: 50,
  },
  commentAction: {
    marginRight: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    width: ScaleSize(300),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailComment;
