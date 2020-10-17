//import { StatusBar } from "expo-status-bar";
import React from "react";
import firebase from "firebase";
import FirebaseConfig from "./src/Firebase/Config";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { DataContextProvider } from "./src/Context/DataContext";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/Navigation/TabNavigator";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appIsReady: false,
    };
  }

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    }
  }

  prepareResources = async () => {
    await this.fetchFonts();

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

  render() {
    if (!this.state.appIsReady) {
      return null;
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
