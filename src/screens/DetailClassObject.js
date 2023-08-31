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

const postsData = [
  {
    id: "1",
    subject: "Toán",
    teacher: "Nguyễn Văn A",
    note: "Ghi chú môn học...",
    startDate: "2023-09-01",
    academicYear: "2023",
    semester: "Học kì 1",
    classId: "A001",
    posts: [
      {
        id: "p1",
        content: "Tiêu đề bài viết 1",
        likes: 5,
        comments: [
          { id: "c1", content: "Bình luận 1" },
          { id: "c2", content: "Bình luận 2" },
        ],
      },
      {
        id: "p2",
        content: "Tiêu đề bài viết 2",
        likes: 10,
        comments: [
          { id: "c3", content: "Bình luận 3" },
          { id: "c4", content: "Bình luận 4" },
        ],
      },
    ],
  },
  // Add more subjects here
];
const CommentItem2 = ({ avatar, name, content }) => (
  <View style={[styles.commentItem]}>
    <View style={{ flexDirection: "row" }}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentName}>{name}</Text>
        <Text style={styles.commentText}>{content}</Text>
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

const commentsData = [
  {
    id: "1",
    avatar:
      "https://static-00.iconduck.com/assets.00/user-avatar-icon-2048x2048-wpp8os2d.png",
    name: "Nguyễn Văn A",
    content: "Bình luận 1",
  },
  {
    id: "2",
    avatar:
      "https://static-00.iconduck.com/assets.00/user-avatar-icon-2048x2048-wpp8os2d.png",
    name: "Trần Thị B",
    content: "Bình luận 2",
  },
  // Add more comments here
];

const randomColor = () => {
  const colors = ["#FF5733", "#C70039", "#900C3F", "#581845", "#003366"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const CommentItem = ({ content }) => (
  <View style={styles.commentItem}>
    <Text style={styles.commentContent}>{content}</Text>
  </View>
);

const PostItem = ({
  content,
  likes,
  comments,
  modalVisible,
  setModalVisible,
}) => (
  <View style={styles.postItem}>
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.postContent}>{content}</Text>

      <View style={styles.editDeleteSection}>
        <TouchableOpacity>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={{ marginVertical: 20, marginLeft: 20 }}>
      {"Đây là bình luận"}
    </Text>

    <View style={styles.postActions}>
      <View style={styles.likeSection}>
        <TouchableOpacity style={styles.likeButton}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Facebook_Thumb_icon.svg/1200px-Facebook_Thumb_icon.svg.png",
            }}
            style={styles.likeIcon}
          />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={commentsData}
                  renderItem={renderCommentItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>Close Comment</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Image
            source={{
              uri: "https://e7.pngegg.com/pngimages/459/323/png-clipart-smiley-happiness-line-comment-icon-face-smiley-thumbnail.png",
            }}
            style={styles.commentIcon}
          />
          <Text style={styles.actionText}>{comments.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const renderCommentItem = ({ item }) => (
  <CommentItem2 avatar={item.avatar} name={item.name} content={item.content} />
);

const ClassObjectDetail = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    subject,
    teacher,
    note,
    startDate,
    academicYear,
    semester,
    classId,
    posts,
  } = route.params || postsData[0];

  const renderPostItem = ({ item }) => (
    <PostItem
      content={item.content}
      likes={item.likes}
      comments={item.comments}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subjectName}>{subject}</Text>
        <Text style={styles.teacherName}>{teacher}</Text>
        <Text style={styles.note}>{note}</Text>
        <Text>{`Start Date: ${startDate}`}</Text>
        <Text>{`Academic Year: ${academicYear}`}</Text>
        <Text>{`Semester: ${semester}`}</Text>
        <Text>{`Class ID: ${classId}`}</Text>
      </View>
      <View style={styles.createPost}>
        <TextInput placeholder="Tạo bài viết mới..." style={styles.input} />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Tạo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={postsData[0].posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
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
    fontSize: 16,
    marginBottom: 8,
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
    alignItems: "center",
    alignSelf: "center",
    bottom: 4,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
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
  },
  openModalButton: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  commentText: {
    color: "gray",
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
  },
});

export default ClassObjectDetail;
