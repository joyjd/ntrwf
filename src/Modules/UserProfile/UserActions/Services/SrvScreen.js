import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid } from "react-native";

import TextLabel from "./../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../Styles/GenericStyles";

import ViewSrv from "./ViewSrv";
import RegisterSrv from "./RegisterSrv";

class SrvScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "viewSrv", //viewSrv,registerSrv
    };
  }
  showSuccessToast = () => {
    ToastAndroid.showWithGravity(
      "Your service has been registered successfully !",
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      { backgroundColor: "red" } // this style will go on the View
    );
  };
  render() {
    return (
      <View style={[viewUtil.viewPageWrapper]}>
        <View style={[viewUtil.subHeader, viewUtil.viewRow]}>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "viewSrv" })} style={[viewUtil.header, this.state.viewMode === "viewSrv" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "viewSrv" ? null : textUtil.passiveTextX]}>My Existing Services</TextLabel>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ viewMode: "registerSrv" }, () => this.showSuccessToast())} style={[viewUtil.header, this.state.viewMode === "registerSrv" ? viewUtil.activeBar : null, cssUtil.shadowXX]}>
            <TextLabel style={[this.state.viewMode === "registerSrv" ? null : textUtil.passiveTextX]}>Register New Service</TextLabel>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: "15%" }}>{this.state.viewMode === "viewSrv" ? <ViewSrv /> : <RegisterSrv viewChange={() => this.setState({ viewMode: "viewSrv" }, () => this.showSuccessToast())} />}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
export default SrvScreen;
