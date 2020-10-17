import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { LinearGradient } from "expo-linear-gradient";
import { textUtil, cssUtil } from "./../../Styles/GenericStyles";

const Header = ({ title, leftButton, navigation }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#FF512F", "#DD2476"]}
    >
      <StatusBar style='light' />
      <View style={styles.header}>
        {leftButton}
        <View>
          <TextLabel style={[styles.headerNameText, textUtil.semiBold]}>{title}</TextLabel>
        </View>
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
