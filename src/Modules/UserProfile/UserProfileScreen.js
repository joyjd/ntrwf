import React from "react";
import { StyleSheet, View } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

import DataContext from "./../../Context/DataContext";

import LoginScreen from "./LoginScreen";
import UserScreen from "./UserScreen";

class UserProfileScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const userSignedStatus = this.context.userLogged;
    return userSignedStatus ? <UserScreen navigation={this.props.navigation} /> : <LoginScreen navigation={this.props.navigation} />;
  }
}
const styles = StyleSheet.create({});
export default UserProfileScreen;
