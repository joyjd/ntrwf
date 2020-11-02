import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import TextLabel from "./../TextLabel/TextLabel";

const Field = ({ fieldName, field, value, onChangeText, error, theme }) => {
  return <Input allowFontScaling={false} label={field.label} inputContainerStyle={[field.inputProps.multiline ? { height: 20 * field.inputProps.numberOfLines } : { height: 40 }, theme === "light" ? styles.light : styles.dark]} labelStyle={[theme === "light" ? styles.lightText : styles.darkText]} placeholder={field.placeholder} {...field.inputProps} leftIcon={field.icon} value={value} onChangeText={(text) => onChangeText(fieldName, text)} errorStyle={{ color: "#b33939", fontSize: 16, fontFamily: "UbuntuCondensed-Regular" }} errorMessage={error} selectionColor={theme === "light" ? "#ffffff70" : "#3e090991"} placeholderTextColor={theme === "light" ? "#ffffff9e" : "#3e090991"} inputStyle={[theme === "light" ? styles.lightText : styles.darkText]} />;
};

const styles = StyleSheet.create({
  light: {
    borderBottomColor: "#ffffff52",
  },
  lightText: {
    color: "#ffffff",
  },
  darkText: {
    color: "#3e0909d6",
  },
  dark: {
    borderBottomColor: "#3e09095c",
  },
});

export default Field;
