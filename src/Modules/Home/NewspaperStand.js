import React, { useCallback } from "react";
import { StyleSheet, View, ImageBackground, Dimensions, Image, Linking, TouchableOpacity } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { Icon } from "react-native-elements";
import IconRenderer from "./../../Utils/IconRenderer";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

const NewspaperStand = () => {
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
  };

  return (
    <View style={styles.newspaperWrapper}>
      <ImageBackground source={require("./../../Assets/Images/paperStand.png")} resizeMode='stretch' style={styles.image}>
        <View style={[styles.rack, viewUtil.viewCol]}>
          <View style={styles.header}>
            <TextLabel style={[textUtil.semiBold, { fontSize: 25 }]}>Newspaper Stand</TextLabel>
          </View>
          <View style={styles.shelf1}>
            <View style={styles.partRackLeft}>
              <OpenURLButton url={"https://www.anandabazar.com"}>
                <ImageBackground source={require("./../../Assets/Images/paper.png")} resizeMode='stretch' style={styles.image}>
                  <Image
                    style={{ height: 27, width: 130, marginHorizontal: 15, marginTop: 50 }}
                    source={{
                      uri: "https://www.anandabazar.com/img/anandabazar-bootstrap/newmdb/ABPLogo.png",
                    }}
                  ></Image>
                </ImageBackground>
              </OpenURLButton>
            </View>
            <View style={styles.partRackRight}>
              <OpenURLButton url={"https://timesofindia.indiatimes.com/"}>
                <ImageBackground source={require("./../../Assets/Images/paper.png")} resizeMode='stretch' style={styles.image}>
                  <Image
                    style={{ height: 25, width: 120, marginHorizontal: 15, marginTop: 50 }}
                    source={{
                      uri: "http://cdn3.allindiannewspapers.com/wp-content/india-news-files/2014/02/Times-of-India-Newspaper-111x25.png",
                    }}
                  ></Image>
                </ImageBackground>
              </OpenURLButton>
            </View>
          </View>
          <View style={styles.shelf2}>
            <View style={styles.partRackLeft}>
              <OpenURLButton url={"https://www.hindustantimes.com/"}>
                <ImageBackground source={require("./../../Assets/Images/paper.png")} resizeMode='stretch' style={styles.image}>
                  <Image
                    style={{ height: 27, width: 130, marginHorizontal: 15, marginTop: 50 }}
                    source={{
                      uri: "http://cdn3.allindiannewspapers.com/wp-content/india-news-files/2014/01/Hindustan-Times-Newspaper-111x25.png",
                    }}
                  ></Image>
                </ImageBackground>
              </OpenURLButton>
            </View>
            <View style={styles.partRackRight}>
              <OpenURLButton url={"https://www.business-standard.com/"}>
                <ImageBackground source={require("./../../Assets/Images/paper.png")} resizeMode='stretch' style={styles.image}>
                  <Image
                    style={{ height: 17, width: 145, marginHorizontal: 15, marginTop: 50 }}
                    source={{
                      uri: "http://cdn3.allindiannewspapers.com/wp-content/india-news-files/2014/02/Business-Standard-Newspaper-India-e1404016090369-145x17.jpg",
                    }}
                  ></Image>
                </ImageBackground>
              </OpenURLButton>
            </View>
          </View>
          <View style={styles.shelf3}>
            <View style={styles.partRackWhole}>
              <OpenURLButton url={"https://bartamanpatrika.com/"}>
                <ImageBackground source={require("./../../Assets/Images/paper.png")} resizeMode='stretch' style={styles.image}>
                  <Image
                    style={{ height: 27, width: 130, marginHorizontal: 15, marginTop: 50 }}
                    source={{
                      uri: "https://bartamanpatrika.com/images/logo.png",
                    }}
                  ></Image>
                </ImageBackground>
              </OpenURLButton>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NewspaperStand;

const styles = StyleSheet.create({
  newspaperWrapper: {
    marginVertical: 15,
    marginHorizontal: 0,
    backgroundColor: "#ffffff",
    width: width,
    height: 500,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  image: {
    flex: 1,
  },
  rack: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  shelf1: {
    height: "28%",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  shelf2: {
    height: "29%",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  shelf3: {
    height: "29%",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  partRackLeft: {
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  partRackRight: {
    width: "50%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  partRackWhole: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
