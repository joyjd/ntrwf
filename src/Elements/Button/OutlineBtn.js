import React from "react";
import { Button } from "react-native-elements";

const OutlineBtn = ({ title, onPressMethod, font, buttonStyle, theme }) => {
  return <Button title={title} type='outline' raised onPress={() => onPressMethod()} buttonStyle={[buttonStyle, { borderWidth: 4 }, theme === "light" ? { borderColor: "#ffffff" } : { borderColor: "#3e0909" }]} titleStyle={[{ fontSize: font, fontFamily: "UbuntuCondensed-Regular" }, theme === "light" ? { color: "#ffffff" } : { color: "#3e0909" }]} />;
};

export default OutlineBtn;
