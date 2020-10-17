import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TextLabel from "../../Elements/TextLabel/TextLabel";
import { Icon } from "react-native-elements";
import { textUtil, cssUtil } from "./../../Styles/GenericStyles";
import { useNavigation } from "@react-navigation/native";

const MyBackButton = ({ previous }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.backBtnContainer}>
        <Icon name='ios-arrow-back' type='ionicon' size={26} color='#ffffff' />
        <TextLabel style={[styles.prevText, textUtil.medium]}>{previous.route.name}</TextLabel>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtnContainer: {
    display: "flex",
    flexDirection: "row",
  },
  prevText: {
    color: "#ffffff",
    paddingTop: 2,
    paddingLeft: 3,
  },
});

export default MyBackButton;
