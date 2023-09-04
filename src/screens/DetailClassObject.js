import React, { useEffect, useState } from "react";
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
import { ScaleSize, getStorage } from "../Utils";
import moment from "moment";
import { CallNewAPI } from "../Utils/requestAPI";
import { Keyboard } from "react-native";
import { Popup } from "popup-ui";
const randomImage = [
  "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
  "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  "https://cdn3.vectorstock.com/i/1000x1000/23/22/new-woman-avatar-icon-flat-vector-19152322.jpg",
];

const ClassObjectDetail = (props) => {
  const { navigation } = props;
  const { params } = props?.route;
  const { item } = params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dataTemp, setDataTemp] = useState(0);

  useEffect(() => {
    setListData(item?.posts);
  }, []);

  function getRandomItemsFromArray(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const CommentItem2 = (item) => (
    <View style={[styles.commentItem]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: getRandomItemsFromArray(randomImage, 1)[0],
          }}
          style={styles.avatar}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentName}>
            {"Id Author Comment:" + item?.author}
          </Text>
          <Text style={styles.commentText}>{item?.content}</Text>
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

  const handleDelete = async (item2) => {
    const { class_id, post_id } = item2;
    const access_token = await getStorage("access_token", "");
    // CallNewAPI(
    //   access_token,
    //   `classroom/${class_id}/delete-post/${post_id}`,
    //   "",
    //   "DELETE",
    //   (res) => console.debug("=-=res", res)
    // );
    const updatedPosts = listData.filter((post) => post.post_id !== post_id);
    setListData(updatedPosts);
  };

  const CommentItem = ({ content }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentContent}>{content}</Text>
    </View>
  );

  const PostItem = ({ modalVisible, setModalVisible, item, comments }) => (
    <View style={styles.postItem}>
      <View style={styles.editDeleteSection}>
        <TouchableOpacity onPress={() => handleEditPost(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.postContent}>{item?.title || "Empty Title"}</Text>
      </View>
      <Text style={{ marginVertical: 20, marginLeft: 20 }}>
        {item?.content}
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
            <Text style={styles.actionText}>{item.likes[0] || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => {
              navigation?.navigate("DETAIL COMMENT", item);
            }}
          >
            <Image
              source={{
                uri: "https://e7.pngegg.com/pngimages/459/323/png-clipart-smiley-happiness-line-comment-icon-face-smiley-thumbnail.png",
              }}
              style={styles.commentIcon}
            />
            <Text style={styles.actionText}>{item?.comments.length || 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCommentItem = ({ item, index }) => (
    <>
      <CommentItem2 comment={item} />
    </>
  );

  const renderPostItem = ({ index, item }) => (
    <>
      <PostItem
        item={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100000);
  }

  const handleCreatePost = () => {
    if (dataTemp) {
      const postIndexToEdit = listData.findIndex(
        (post) => post.post_id === dataTemp
      );
      console.debug("=-=postIndexToEdit", postIndexToEdit);
      const updatedPosts = [...listData];
      updatedPosts[postIndexToEdit].title = title;
      updatedPosts[postIndexToEdit].content = body;
      setListData(updatedPosts);
      setTitle("");
      setBody("");
      Popup.show({
        type: "Success",
        title: "Notification",
        button: true,
        textBody: "Edit Post Success",
        buttonText: "Ok",
      });
    } else {
      Keyboard.dismiss();
      if (!title) {
        Popup.show({
          type: "Warning",
          title: "Warning",
          button: true,
          textBody: "Title is not empty",
          buttonText: "Ok",
        });
      } else if (!body) {
        Popup.show({
          type: "Warning",
          title: "Warning",
          button: true,
          textBody: "Content is not empty",
          buttonText: "Ok",
        });
      } else {
        const newPost = {
          author: 1,
          classroom: "class00001",
          comments: 0,
          content: body,
          created_date: new Date().toISOString(),
          is_edited: false,
          likes: [0],
          post_id: `postclass${generateRandomNumber()}`,
          title: title,
        };
        const updatedPosts = [...listData, newPost];
        setListData(updatedPosts);
        setTitle("");
        setBody("");
        Popup.show({
          type: "Success",
          title: "Notification",
          button: true,
          textBody: "Create New Post Success",
          buttonText: "Ok",
        });
      }
    }
  };

  const handleEditPost = (item2) => {
    setTitle(item2?.title);
    setBody(item2?.content);
    setDataTemp(item2?.post_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subjectName}>{item?.class_id}</Text>
        <Text style={styles.teacherName}>
          {"Create Date: " + moment(item?.created_date).format("DD-MM-YYYY")}
        </Text>
        <Text style={styles.note}>{"Info Class: " + item?.info}</Text>
        <Text>{`School Year: ${item?.school_year}`}</Text>
        <Text>{`Semester: ${item?.semester}`}</Text>
      </View>
      <View style={styles.createPost}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Content"
          value={body}
          onChangeText={(text) => {
            setBody(text);
          }}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => handleCreatePost()}
        >
          <Text style={styles.createButtonText}>Tạo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listData}
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
