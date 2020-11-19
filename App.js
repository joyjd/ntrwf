//import { StatusBar } from "expo-status-bar";
import React from "react";
import firebase from "firebase";

import FirebaseConfig from "./src/Firebase/Config";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { DataContextProvider } from "./src/Context/DataContext";
import AppIntroSlider from "react-native-app-intro-slider";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/Navigation/TabNavigator";
import { getOnceSnapshot } from "./src/Firebase/FirebaseActions";
import { setLocalstorageObject, getLocalstorageObject } from "./src/AyncStorage/LocalAsyncStorage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appIsReady: false,
      showRealApp: false,
      slides: [],
    };
  }

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
     
    }
    this.prepareResources();
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    }
  }

  prepareResources = async () => {
    await this.fetchFonts();
    await getLocalstorageObject("NTRWF_ViewAdd").then((data) => {
      if (data === null) {
        this.fetchSlideDetails();
      } else {
        this.setState({
          showRealApp: true,
        });
      }
    });

    this.setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };
  fetchFonts = async () => {
    return Font.loadAsync({
      "UbuntuCondensed-Regular": require("./src/Assets/Fonts/UbuntuCondensed-Regular.ttf"),
      "Baloo2-Medium": require("./src/Assets/Fonts/Baloo2-Medium.ttf"),
      "Baloo2-SemiBold": require("./src/Assets/Fonts/Baloo2-SemiBold.ttf"),
      "Baloo2-Bold": require("./src/Assets/Fonts/Baloo2-Bold.ttf"),
    });
  };
  fetchSlideDetails = async () => {
    getOnceSnapshot("AppIntro").then((snapshot) => {
      let pt = snapshot.val();
      let newArr = [];
      Object.keys(pt).map((key) => {
        newArr.push(pt[key]);
      });

      this.setState(
        {
          slides: newArr,
        },
        () => {
          setLocalstorageObject("NTRWF_ViewAdd", {
            view: true,
          });
        }
      );
    });
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.picHolder} source={{ uri: item.image }} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  render() {
    if (!this.state.appIsReady) {
      return null;
    } else if (this.state.appIsReady && !this.state.showRealApp) {
      return <AppIntroSlider renderItem={this._renderItem} data={this.state.slides} onDone={this._onDone} showSkipButton={true} onSkip={this._onSkip} />;
    }
    return (
      <>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </>
    );
  }
}
export default () => {
  return (
    <DataContextProvider>
      <App />
    </DataContextProvider>
  );
};

const styles = StyleSheet.create({
  picHolder: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },

  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    top: 50,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});
