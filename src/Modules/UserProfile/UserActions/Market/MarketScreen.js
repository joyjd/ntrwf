import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";

import MarketPostScreen from "./MarketPost/MarketPostScreen";
import MarketList from "./MarketList";

class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "register", //view,register
    };
  }
  showSuccessToast = () => {
    ToastAndroid.showWithGravity("Your item has been posted successfully in Community Market!", ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  render() {
    return (
      <View style={[viewUtil.viewPageWrapper]}>
        <View style={[viewUtil.subHeader, viewUtil.viewRow]}>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "register" })} style={[viewUtil.header, this.state.viewMode === "register" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "register" ? null : textUtil.passiveTextX]}>Register New Post</TextLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "view" })} style={[viewUtil.header, this.state.viewMode === "view" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "view" ? null : textUtil.passiveTextX]}>My Existing Posts </TextLabel>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: "15%" }}>{this.state.viewMode === "register" ? <MarketPostScreen viewChange={() => this.setState({ viewMode: "view" }, () => this.showSuccessToast())} /> : <MarketList navigation={this.props.navigation} />}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
export default MarketScreen;
