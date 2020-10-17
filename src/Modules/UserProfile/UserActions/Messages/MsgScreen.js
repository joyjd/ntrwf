import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";

import ReceivedMsg from "./ReceivedMsg";
import SentMsg from "./SentMsg";
import DataContext from "./../../../../Context/DataContext";
class MsgScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "received", //received,sent
    };
  }

  render() {
    return (
      <View style={[viewUtil.viewPageWrapper]}>
        <View style={[viewUtil.subHeader, viewUtil.viewRow]}>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "received" })} style={[viewUtil.header, this.state.viewMode === "received" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "received" ? null : textUtil.passiveTextX]}>Message Received ({this.context.receivedMessages.length})</TextLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "sent" })} style={[viewUtil.header, this.state.viewMode === "sent" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "sent" ? null : textUtil.passiveTextX]}>Message Sent ({this.context.sentMessages.length})</TextLabel>
          </TouchableOpacity>
        </View>
        <View>{this.state.viewMode === "received" ? <ReceivedMsg /> : <SentMsg />}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default MsgScreen;
