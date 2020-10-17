import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");

const LandingPageTeaser = () => {
  return (
    <View>
      <Image style={styles.imageBg} source={require("./../../Assets/Images/homeBg.jpg")}></Image>
      <View style={styles.communityName}>
        <TextLabel
          style={[
            {
              fontSize: 20,
              fontWeight: "bold",
              paddingLeft: 5,
              color: "#ffffff",
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
              fontFamily: "sans-serif-condensed",
            },
          ]}
        >
          New Town Residents' Welfare Forum
        </TextLabel>
      </View>
      <View style={styles.logoHolder}>
        <Image style={styles.logo} source={require("./../../Assets/Images/logo.jpg")}></Image>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  communityName: {
    alignSelf: "center",
    width: 200,
    left: -70,
    bottom: 320,
  },
  imageBg: {
    height: 350,
    backgroundColor: "red",
    width: width,
    resizeMode: "cover",
    borderBottomLeftRadius: 240,
    borderBottomRightRadius: 40,
  },
  logoHolder: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderColor: "white",
    borderWidth: 4,
  },
  logo: {
    height: 80,
    width: 80,
  },
});

export default LandingPageTeaser;
