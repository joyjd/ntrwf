import React from "react";
import { StyleSheet, TouchableOpacity, Image, Alert, ToastAndroid } from "react-native";
import IconRenderer from "./IconRenderer";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import { viewUtil, cssUtil, textUtil } from "../Styles/GenericStyles";
import MessageBox from "./MessageBox";
import DataContext from "./../Context/DataContext";
import { setData } from "./../Firebase/FirebaseActions";

class MsgWrapper extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }
  showSuccessToast = () => {
    ToastAndroid.showWithGravity("Your message was sent succesfully to " + this.props.receiverDetails.userName + " !", ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  closeMsgBox = (data) => {
    this.setState({ visibility: false });

    if (data !== "") {
      this.submitMessage(data);
    }
  };

  submitMessage = (data) => {
    let timestamp = new Date().getTime();
    let dateStr = new Date().toDateString();

    setData("Messages/" + "Msg_" + timestamp, {
      MessageId: "Msg_" + timestamp,
      MessageHeader: data.MessageHeader,
      MessageBody: data.MessageBody,
      SenderName: this.context.userDetails.Name,
      SenderId: this.context.userDetails.UserId,
      ReceiverName: this.props.receiverDetails.userName,
      ReceiverId: this.props.receiverDetails.UserId,
      MessageDate: dateStr,
      MessageSeen: false,
    })
      .then((data) => {
        this.showSuccessToast();
      })
      .catch((er) => {
        Alert.alert("Message sending failed !", "Message was not sent.Please try again in sometime.");
      });
  };

  render() {
    return (
      <>
        <TouchableOpacity disabled={!this.context.userLogged} onPress={() => this.setState({ visibility: true })} style={[this.props.actionStyle, viewUtil.viewRow]}>
          {this.props.iconType === "wrapper" ? <IconRenderer iconFamily='AntDesign' iconName='wechat' size={20} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#27ae60' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} /> : <IconRenderer iconFamily='AntDesign' iconName='wechat' size={30} color='#27ae60' />}

          <TextLabel style={[{ color: "#27ae60", textDecorationLine: "underline" }, this.props.iconType === "wrapper" ? null : { paddingLeft: 5 }]}>{this.props.label}</TextLabel>
        </TouchableOpacity>
        <MessageBox visibility={this.state.visibility} name={this.props.receiverDetails.userName} closeMsgBox={(data) => this.closeMsgBox(data)} />
      </>
    );
  }
}
const styles = StyleSheet.create({});
export default MsgWrapper;
