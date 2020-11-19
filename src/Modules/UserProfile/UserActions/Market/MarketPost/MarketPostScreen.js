import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity, ToastAndroid, Alert, ScrollView } from "react-native";

import TextLabel from "./../../../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../../../Styles/GenericStyles";
import IconRenderer from "./../../../../../Utils/IconRenderer";
import { setData, uploadImage, getImageRef } from "./../../../../../Firebase/FirebaseActions";

import DataContext from "./../../../../../Context/DataContext";

import SecFirst from "./Sections/SecFirst";
import SecSecond from "./Sections/SecSecond";
import SecThird from "./Sections/SecThird";
import Loader from "./../../../../../Utils/Loader";

const activeIcon = "#ffffff";
const activeBg = "#20bf6b";
const inactiveIcon = "#a5b1c2";
const inactiveBg = "#ffffff";

class MarketPostScreen extends React.Component {
  static contextType = DataContext;
  postMarketForm = {};
  constructor(props) {
    super(props);
    this.state = {
      activeState: "secFirst", // secFirst,secSecond,secThird,

      secFirstIcon: activeIcon,
      secFirstBg: activeBg,

      secSecondIcon: inactiveIcon,
      secSecondBg: inactiveBg,

      secThirdIcon: inactiveIcon,
      secThirdBg: inactiveBg,

      isLoading: false,
    };
  }

  getNextScreen = (dataObj, nextScreen) => {
    this.postMarketForm = { ...this.postMarketForm, ...dataObj };
    if (nextScreen !== "") {
      this.setState({
        activeState: nextScreen,
        [nextScreen + "Icon"]: activeIcon,
        [nextScreen + "Bg"]: activeBg,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      //upload photo if url is present
      let loc_timeStamp = new Date().getTime();
      let loc_Date = new Date().toDateString();
      if (this.postMarketForm["ItemPhotoUrl"] !== "") {
        uploadImage(this.postMarketForm["ItemPhotoUrl"], "Marketplace/" + this.context.userDetails.UserId + "_mrkt_" + loc_timeStamp).then((data) => {
          getImageRef("images/Marketplace/" + this.context.userDetails.UserId + "_mrkt_" + loc_timeStamp)
            .getDownloadURL()
            .then((url) => {
              this.postMarketForm["ItemPhotoUrl"] = url;
              this.marketPostSubmit(loc_timeStamp, loc_Date);
            });
        });
      } else {
        this.marketPostSubmit(loc_timeStamp, loc_Date);
      }
    }
  };

  marketPostSubmit = (loc_timeStamp, loc_Date) => {
    if (this.postMarketForm["ItemType"] === "Resale") {
      this.postMarketForm["ItemUnit"] = "";
    }

    setData("MarketList/" + this.context.userDetails.UserId + "_mrkt_" + loc_timeStamp, {
      ItemId: this.context.userDetails.UserId + "_mrkt_" + loc_timeStamp,
      ItemType: this.postMarketForm["ItemType"],
      ItemName: this.postMarketForm["ItemName"],
      ItemPostDate: loc_timeStamp,
      ItemPrice: this.postMarketForm["ItemPrice"],
      ItemUnit: this.postMarketForm["ItemUnit"],
      ItemLocation: this.postMarketForm["ItemLocation"],
      ItemDesc: this.postMarketForm["ItemDesc"],
      ItemOwnerName: this.context.userDetails.Name,
      ItemOwnerContact: this.postMarketForm["ItemOwnerContact"],
      ItemOwnerMail: this.postMarketForm["ItemOwnerMail"],
      ItemPhotoUrl: this.postMarketForm["ItemPhotoUrl"],
      ItemOwnerId: this.context.userDetails.UserId,
    })
      .then((data) => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.viewChange();
          }
        );
      })
      .catch((err) => {
        () => {
          this.setState({
            isLoading: false,
          });
          Alert.alert("Market Post Failed !", err.message);
        };
      });
  };
 
  getPreviousSection = (prevScreen, currentScreen) => {
    this.setState({
      activeState: prevScreen,
      [currentScreen + "Icon"]: inactiveIcon,
      [currentScreen + "Bg"]: inactiveBg,
    });
  };

  render() {
    return (
      <View>
        {this.state.isLoading ? <Loader /> : null}
        <View style={styles.activityBox}>
          <ScrollView>
            {this.state.activeState === "secFirst" ? <SecFirst transmitData={(dataObj) => this.getNextScreen(dataObj, "secSecond")} /> : <SecFirst transmitData={(dataObj) => this.getNextScreen(dataObj, "secSecond")} type='hide' />}
            {this.state.activeState === "secSecond" ? <SecSecond backPressMethod={(section) => this.getPreviousSection(section, "secSecond")} transmitData={(dataObj) => this.getNextScreen(dataObj, "secThird")} /> : <SecSecond transmitData={(dataObj) => this.getNextScreen(dataObj, "secThird")} type='hide' />}
            {this.state.activeState === "secThird" ? <SecThird backPressMethod={(section) => this.getPreviousSection(section, "secThird")} transmitData={(dataObj) => this.getNextScreen(dataObj, "")} /> : <SecThird transmitData={(dataObj) => this.getNextScreen(dataObj, "")} type='hide' />}
          </ScrollView>
        </View>
        <View style={styles.stepIndicator}>
          <View style={[styles.headerTextWrapper, viewUtil.viewRow]}>
            <View style={styles.stepIndicator}>
              <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-1' size={30} color={this.state.secFirstIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.secFirstBg} wrpRaised={true} wrpHeight={30} wrpWidth={30} />
            </View>
            <View style={styles.stepPath}></View>
            <View style={styles.stepIndicator}>
              <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-2' size={30} color={this.state.secSecondIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.secSecondBg} wrpRaised={true} wrpHeight={30} wrpWidth={30} />
            </View>
            <View style={styles.stepPath}></View>
            <View style={styles.stepIndicator}>
              <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-3' size={30} color={this.state.secThirdIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.secThirdBg} wrpRaised={true} wrpHeight={30} wrpWidth={30} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stepPath: {
    width: "30%",
    height: 4,
    marginTop: "6%",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    marginHorizontal: 3,
  },
  stepIndicator: {
    width: "15%",
    borderRadius: 40,
  },
  headerTextWrapper: {
    marginTop: 5,
    alignSelf: "center",
    width: "90%",
  },
  activityBox: { height: height * 0.7 },
  stepIndicator: {
    backgroundColor: "#880E4F",
    height: height * 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default MarketPostScreen;
