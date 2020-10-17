import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import IconRenderer from "./../../Utils/IconRenderer";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

const AboutTeaser = () => {
  return (
    <View style={[styles.aboutWrapper, cssUtil.shadowXX, viewUtil.viewCol]}>
      <View style={styles.textContainer}>
        <TextLabel style={[textUtil.semiBold]}>SUPPORT & FEEDBACK</TextLabel>
        <TextLabel>Share your feedback and suggestions</TextLabel>
      </View>
      <View style={viewUtil.viewRow}>
        <View style={[styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}>
          <IconRenderer iconFamily='MaterialIcons' iconName='mail-outline' size={20} color='#95a5a6' style={{ paddingRight: 5 }} />
          <TextLabel style={[{ color: "#FF512F" }]}>Write to NTRWF</TextLabel>
        </View>
        <View style={[styles.actionWrapper, viewUtil.viewRow]}>
          <IconRenderer iconFamily='Ionicons' iconName='ios-information-circle-outline' size={21} color='#95a5a6' style={{ paddingRight: 5 }} />
          <TextLabel style={[{ color: "#FF512F" }]}>About NTRWF</TextLabel>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutWrapper: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  textContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d2dae2",
  },
  actionWrapper: {
    padding: 15,
    width: "50%",
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#d2dae2",
  },
});
export default AboutTeaser;
