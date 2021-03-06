import React from "react";
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity,AppState } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");

import LandingPageTeaser from "./LandingPageTeaser";
import FunctionListTeaser from "./FunctionListTeaser";
import NoticeBoardTeaser from "./NoticeBoardTeaser";
import EventTeaser from "./EventTeaser";
import AppTeaser from "./AppTeaser";
import AboutTeaser from "./AboutTeaser";
import NewspaperStand from "./NewspaperStand";
import { setLocalstorageObject, getLocalstorageObject } from "./../../AyncStorage/LocalAsyncStorage";
import PushRegister from "./../../Common/PushNotification/PushRegister";
import PromiseRegisterList from "./PromiseRegisterList";


class HomeScreen extends React.Component {
  
  constructor() {
    super();
    
  }
  componentDidMount() {
    //this.props.navigation.setOptions({ title: "HomeUpdated" });
   
  }

  componentWillUnmount(){
    setLocalstorageObject("NTRWF_LastUsage", {
      DateTime: new Date().getTime()
    });
   
  }



  render() {
    return (
      <View style={styles.homeContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LandingPageTeaser />
          <FunctionListTeaser navigation={this.props.navigation} />
          <NoticeBoardTeaser navigation={this.props.navigation} />
          <EventTeaser navigation={this.props.navigation} />
          <NewspaperStand />
          <AppTeaser />
          <AboutTeaser navigation={this.props.navigation} />
          <PushRegister navigation={this.props.navigation}/>
          <PromiseRegisterList/>
        </ScrollView>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ff929226",
  },

  card: {
    width: "90%",
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
  },
});
export default HomeScreen;
