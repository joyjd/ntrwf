import React from "react";
import { StyleSheet, View } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <TextLabel>I am notofication Screen</TextLabel>;
  }
}
const styles = StyleSheet.create({});
export default NotificationScreen;
