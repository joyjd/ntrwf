import React from "react";

import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";

/*
Usages:
==============
<TextLabel>Test</TextLabel>
<TextLabel style={[styles.test, { fontWeight: "bold" }]}>Test</TextLabel>
<TextLabel style={[{ fontWeight: "bold" }]}>Test</TextLabel>
<TextLabel attr={{ h1: true }}>Test</TextLabel>
<TextLabel attr={{ h1: true, h1Style: { color: "green" } }} style={[styles.test]}>Test</TextLabel>
*/

const TextLabel = ({ style, children, numberOfLines, attr, getNumberOfDefaultLines }) => {
  const textStyle = [styles.default, style !== undefined ? [...style] : null];

  return getNumberOfDefaultLines !== undefined ? (
    <Text allowFontScaling={false} onTextLayout={(e) => getNumberOfDefaultLines(e.nativeEvent.lines.length)} {...attr} numberOfLines={numberOfLines} ellipsizeMode='tail' style={textStyle}>
      {children}
    </Text>
  ) : (
    <Text {...attr} allowFontScaling={false} numberOfLines={numberOfLines} ellipsizeMode='tail' style={textStyle}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: "UbuntuCondensed-Regular",
    color: "#3e0909",
  },
});

export default TextLabel;
