import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

const ReadMore = ({ onPressMethod }) => {
  return (
    <View style={{ width: 100, marginRight: 15, marginBottom: 10, borderRadius: 15, backgroundColor: "#FF512F" }}>
      <Button onPress={() => onPressMethod()} buttonStyle={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }} titleStyle={{ fontSize: 15, fontFamily: "UbuntuCondensed-Regular", color: "#ffffff" }} title='Read more..' type='clear' />
    </View>
  );
};

export default ReadMore;
