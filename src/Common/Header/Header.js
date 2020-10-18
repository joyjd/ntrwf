import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { LinearGradient } from "expo-linear-gradient";
import { textUtil, cssUtil } from "./../../Styles/GenericStyles";
import Greeting from "./Greeting";
import IconRenderer from "./../../Utils/IconRenderer";

const Header = ({ title, leftButton, navigation }) => {
  const getMainPageName = (name) => {
    switch (name) {
      case "Home":
        return <IconRenderer iconFamily='Fontisto' iconName='home' size={30} color='#ffffff' style={cssUtil.iconShadow} />;
        break;
      case "Profile":
        return <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={30} color='#ffffff' style={cssUtil.iconShadow} />;
        break;
      case "Notifications":
        return <IconRenderer iconFamily='Fontisto' iconName='bell-alt' size={30} color='#ffffff' style={cssUtil.iconShadow} />;
        break;
      default:
        break;
    }
  };

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#FF512F", "#DD2476"]}
    >
      <StatusBar style='light' />
      <View style={styles.header}>
        {leftButton ? leftButton : <Greeting />}
        <View>{title === "Home" || title === "Profile" || title === "Notifications" ? getMainPageName(title) : <TextLabel style={[styles.headerNameText, textUtil.semiBold]}>{title}</TextLabel>}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    height: 80,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerNameText: {
    color: "#ffffff",
    fontSize: 24,
  },
});

export default Header;
