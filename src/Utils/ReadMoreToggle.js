import React, { useState } from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../Elements/TextLabel/TextLabel";
import TransparentBtn from "./../Elements/Button/TransparentBtn";

const ReadMoreToggle = ({ text, numberOfLines, style }) => {
  const [expand, setExpand] = useState(true);
  const [visible, setVisible] = useState(true);
  const toggleRead = () => {
    setExpand(!expand);
  };

  const setReadMoreVisible = (lines) => {
    numberOfLines > lines || numberOfLines == lines ? setVisible(false) : setVisible(true);
  };
  return (
    <>
      {style !== undefined ? (
        <TextLabel getNumberOfDefaultLines={(lines) => setReadMoreVisible(lines)} style={[...style]} numberOfLines={expand ? numberOfLines : null}>
          {text}
        </TextLabel>
      ) : (
        <TextLabel getNumberOfDefaultLines={(lines) => setReadMoreVisible(lines)} numberOfLines={expand ? numberOfLines : null}>
          {text}
        </TextLabel>
      )}
      {visible ? (
        <View style={{ alignItems: "flex-end" }}>
          <TransparentBtn onPressMethod={() => toggleRead()} title={expand ? "Read more.." : "Read Less.."} />
        </View>
      ) : null}
    </>
  );
};
export default ReadMoreToggle;
