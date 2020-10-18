import React from "react";
import { StyleSheet, View } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import IconRenderer from "./../../Utils/IconRenderer";
import DataContext from "./../../Context/DataContext";

class NotificationScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <View style={[styles.notCard, cssUtil.shadowX]}>
          <View style={[viewUtil.viewRow, { justifyContent: "center", alignItems: "center" }]}>
            <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email-alert' size={40} color='red' style={cssUtil.iconShadow} />
            <TextLabel style={[{ fontSize: 20, paddingLeft: 5, textDecorationLine: "underline" }]}>Message Notifications</TextLabel>
          </View>
          <View style={[{ justifyContent: "center", alignItems: "center" }]}>{this.context.notificationCount !== 0 ? <TextLabel>You have {this.context.notificationCount} new messages.</TextLabel> : <TextLabel>You have no new messages</TextLabel>}</View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  notCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 15,
    borderRadius: 6,
  },
});
export default NotificationScreen;
