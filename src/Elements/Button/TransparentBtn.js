import React from "react";
import { Button } from "react-native-elements";

const TransparentBtn = ({ title, onPressMethod, btnStyle }) => {
  return <Button title={title} onPress={() => onPressMethod()} type='clear' titleStyle={[{ fontSize: 16, color: "#FF512F", fontFamily: "UbuntuCondensed-Regular", textDecorationLine: "underline" }, btnStyle]} />;
};

export default TransparentBtn;
