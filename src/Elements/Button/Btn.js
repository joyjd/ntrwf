import React from "react";
import { Button } from "react-native-elements";

const Btn = ({ title, onPressMethod, font, buttonStyle, containerStyle }) => {
  return (
    <Button
      title={title}
      raised
      onPress={() => onPressMethod()}
      linearGradientProps={{
        colors: ["#FF512F", "#DD2476"],
      }}
      containerStyle={[containerStyle, buttonStyle]}
      buttonStyle={[buttonStyle]}
      titleStyle={{ fontSize: font, fontFamily: "UbuntuCondensed-Regular", color: "#ffffff" }}
    />
  );
};

export default Btn;
