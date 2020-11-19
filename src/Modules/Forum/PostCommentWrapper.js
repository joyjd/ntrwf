import React from "react";
import { StyleSheet, TouchableOpacity, Image, Alert, ToastAndroid } from "react-native";
import IconRenderer from "./../../Utils/IconRenderer";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import PostComment from "./PostBox//PostComment";
import DataContext from "./../../Context/DataContext";
import { setData, updateindividualKey } from "./../../Firebase/FirebaseActions";
import Btn from "./../../Elements/Button/Btn";

class PostCommentWrapper extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }
  componentDidMount() {
    if (this.props.defaultCommentOpen) {
      this.setState({ visibility: true });
    }
  }
  showSuccessToast = () => {
    ToastAndroid.showWithGravity("Your comment was successfully posted !", ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  closeMsgBox = (data) => {
    this.setState({ visibility: false });

    if (data !== "") {
      this.submitComment(data);
    }
  };

  submitComment = (data) => {
    let timestamp = new Date().getTime();
    let dateStr = new Date().toDateString();

    setData("ForumComments/"+this.props.DComDiscId+"/" + "DCom_" + timestamp, {
      DComId: "DCom_" + timestamp,
      DComBody: data.DComBody,
      DComOwnerId: this.context.userDetails.UserId,
      DComOwnerName: this.context.userDetails.Name,
      DComDate: dateStr,
      DComDiscId: this.props.DComDiscId,
    })
      .then((data) => {
        //update forum discussion too - get data nd update *****
        updateindividualKey("Forum/" + this.props.DComDiscId + "/DiscComments", this.props.commentCount + 1).then((data) => {
          this.showSuccessToast();
          this.props.updateCommentCount();
        });
      })
      .catch((er) => {
        Alert.alert("Message sending failed !", "Message was not sent.Please try again in sometime.Details - " + er.message);
      });
  };

  render() {
    return (
      <>
        <Btn disabled={!this.context.userLogged} title='Post A Comment' font={20} containerStyle={{ marginTop: 10 }} buttonStyle={{ borderRadius: 10 }} onPressMethod={() => this.setState({ visibility: true })} />
        <PostComment visibility={this.state.visibility} closeMsgBox={(data) => this.closeMsgBox(data)} />
      </>
    );
  }
}

export default PostCommentWrapper;
