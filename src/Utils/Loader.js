import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import TextLabel from "./../Elements/TextLabel/TextLabel";

const Loader = ({ loaderText }) => {
  const ldtext = loaderText ? loaderText : "Please wait ..";
  return (
    <View style={styles.spinnerStyle}>
      <TextLabel style={[{ fontSize: 18 }]}>{ldtext}</TextLabel>
      <ActivityIndicator size='large' color='#831A2B' />
    </View>
  );
};
const styles = {
  spinnerStyle: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e3e3",
    opacity: 0.7,
    zIndex: 10,
  },
  spinnerText: {
    color: "#785454",
  },
};

export default Loader;
