import React from "react";
import { StyleSheet, TouchableOpacity, Image, Alert, ToastAndroid } from "react-native";
import IconRenderer from "./../../Utils/IconRenderer";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import PostDiscussion from "./PostBox/PostDiscussion";
import DataContext from "./../../Context/DataContext";
import { setData } from "./../../Firebase/FirebaseActions";
import Btn from "./../../Elements/Button/Btn";

class PostDiscussionWrapper extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  showSuccessToast = () => {
    ToastAndroid.showWithGravity("Your discussion topic was successfully posted !", ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  closeMsgBox = (data) => {
    this.setState({ visibility: false });

    if (data !== "") {
      this.submitPost(data);
    }
  };

  submitPost = (data) => {
    let timestamp = new Date().getTime();
    let dateStr = new Date().toDateString();

    setData("Forum/" + "Disc_" + timestamp, {
      DiscId: "Disc_" + timestamp,
      DiscTitle: data.DiscTitle,
      DiscDesc: data.DiscDesc,
      DiscOwnerId: this.context.userDetails.UserId,
      DiscOwnerName: this.context.userDetails.Name,
      DiscDate: timestamp,
      DiscComments: 0,
    })
      .then((dataResp) => {
        this.showSuccessToast();
        
        
      })
      .catch((er) => {
        Alert.alert("Message sending failed !", "Message was not sent.Please try again in sometime.");
      });
  };

  render() {
    return (
      <>
        <Btn disabled={!this.context.userLogged} title='Start A New Discussion' font={20} containerStyle={{ marginTop: 10 }} buttonStyle={{ borderRadius: 10 }} onPressMethod={() => this.setState({ visibility: true })} />
        <PostDiscussion visibility={this.state.visibility} closeMsgBox={(data) => this.closeMsgBox(data)} />
      </>
    );
  }
}

export default PostDiscussionWrapper;
