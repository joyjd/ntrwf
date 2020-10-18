import React from "react";
import firebase from "firebase";
import { StyleSheet, Dimensions, View, ImageBackground, ScrollView, Alert, ToastAndroid } from "react-native";

import TextLabel from "./../../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../../Styles/GenericStyles";
import IconRenderer from "./../../../Utils/IconRenderer";

import SectionName from "./Sections/SectionName";
import SectionPhone from "./Sections/SectionPhone";
import SectionAddress from "./Sections/SectionAddress";

import DataContext from "./../../../Context/DataContext";
import { setLocalstorageObject, clearAll } from "./../../../AyncStorage/LocalAsyncStorage";

const activeIcon = "#ffffff";
const activeBg = "#20bf6b";
const inactiveIcon = "#a5b1c2";
const inactiveBg = "#ffffff";

import Loader from "./../../../Utils/Loader";

class RegisterUserScreen extends React.Component {
  registerFormObj = {};
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      activeState: "nameSec", // nameSec,phoneSec,addressSec,

      nameSecIcon: activeIcon,
      nameSecBg: activeBg,

      phoneSecIcon: inactiveIcon,
      phoneSecBg: inactiveBg,

      addressSecIcon: inactiveIcon,
      addressSecBg: inactiveBg,

      isLoading: false,
      loaderText: "",
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({ title: "Member Registration" });
  }

  getPreviousSection = (sectionName) => {
    if (sectionName === "phoneSec") {
      this.setState({
        activeState: sectionName,

        phoneSecIcon: sectionName === "phoneSec" ? activeIcon : inactiveIcon,
        phoneSecBg: sectionName === "phoneSec" ? activeBg : inactiveBg,

        addressSecIcon: sectionName === "addressSec" ? activeIcon : inactiveIcon,
        addressSecBg: sectionName === "addressSec" ? activeBg : inactiveBg,
      });
    } else if (sectionName === "nameSec") {
      this.setState({
        activeState: sectionName,

        nameSecIcon: sectionName === "nameSec" ? activeIcon : inactiveIcon,
        nameSecBg: sectionName === "nameSec" ? activeBg : inactiveBg,

        phoneSecIcon: sectionName === "phoneSec" ? activeIcon : inactiveIcon,
        phoneSecBg: sectionName === "phoneSec" ? activeBg : inactiveBg,

        addressSecIcon: sectionName === "addressSec" ? activeIcon : inactiveIcon,
        addressSecBg: sectionName === "addressSec" ? activeBg : inactiveBg,
      });
    }
  };

  getNextScreen = (dataObj, nextSection) => {
    this.registerFormObj = { ...this.registerFormObj, ...dataObj };
    console.log({ ...this.registerFormObj });
    if (nextSection === "phoneSec") {
      this.setState({
        activeState: nextSection,
        phoneSecIcon: activeIcon,
        phoneSecBg: activeBg,
      });
    } else if (nextSection === "addressSec") {
      this.setState({
        activeState: nextSection,
        addressSecIcon: activeIcon,
        addressSecBg: activeBg,
      });
    } else if (nextSection === "") {
      this.setState({
        isLoading: true,
        loaderText: "Validating Member Details..",
      });
      this.registrationSubmit();
    }
  };

  registrationSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.registerFormObj.Email, this.registerFormObj.Password)
      .then((data) => {
        this.setState({
          isLoading: false,
          fireBaseErrorMsg: "Member Account is already registered with this Email Id and password.Please try to log in or retrieve password for this account.",
        });
      })
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.registerFormObj.Email, this.registerFormObj.Password)
          .then((data) => {
            this.setState({
              isLoading: true,
              loaderText: "Registering Member Details..",
            });
            this.fireBasePushUserData(data.user.uid);
            //PostSuccessful Insertion
            //this.context.changeUserStatus(true, this.state.FirstName + " " + this.state.LastName);
          })
          .catch((error) => {
            // Account creation failed for some deep rooted problem
            this.setState({
              isLoading: false,
              fireBaseErrorMsg: "Member Account could not be created.Please try again in sometime.More Details -" + error.message,
            });
          });
      });
  };
  showSuccessToast = () => {
    ToastAndroid.showWithGravity("You are registered succesfully at NTRWF. !", ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  fireBasePushUserData = (userId) => {
    firebase
      .database()
      .ref("/UserDetails/" + userId + "")
      .set({
        UserId: userId,
        FirstName: this.registerFormObj.Firstname.toLowerCase(),
        LastName: this.registerFormObj.Lastname.toLowerCase(),
        Password: this.registerFormObj.Password,
        Email: this.registerFormObj.Email,
        Phone: this.registerFormObj.Phone,
        Address: this.registerFormObj.Building + ", " + this.registerFormObj.Locality,
        ProfilePic: "",
      })
      .then(() => {
        this.context.changeUserStatus(false, {
          Name: this.registerFormObj.Firstname.toLowerCase() + " " + this.registerFormObj.Lastname.toLowerCase(),
          Password: this.registerFormObj.Password,
          Email: this.registerFormObj.Email,
          Phone: this.registerFormObj.Phone,
          Address: this.registerFormObj.Building + ", " + this.registerFormObj.Locality,
          ProfilePic: "",
          UserId: userId,
        });
        setLocalstorageObject("NTRWF_UserCreds", {
          Name: this.registerFormObj.Firstname.toLowerCase() + " " + this.registerFormObj.Lastname.toLowerCase(),
          Password: this.registerFormObj.Password,
          Email: this.registerFormObj.Email,
          Phone: this.registerFormObj.Phone,
          Address: this.registerFormObj.Building + ", " + this.registerFormObj.Locality,
          ProfilePic: "",
          UserId: userId,
        });
        this.setState(
          {
            isLoading: false,
            loaderText: "",
          },
          () => {
            this.showSuccessToast();
            this.props.navigation.navigate("Profile");
          }
        );
      })
      .catch((er) => {
        this.setState({
          isLoading: false,
        });
        Alert.alert("Registration failed!", er.message);
      });
  };

  render() {
    return (
      <View style={[viewUtil.viewPageWrapper]}>
        <View style={[styles.topBg, cssUtil.shadowXX]}>
          <ImageBackground source={require("./../../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}>
            <View style={[styles.headerTextWrapper, viewUtil.viewRow]}>
              <View style={styles.stepIndicator}>
                <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-1' size={40} color={this.state.nameSecIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.nameSecBg} wrpRaised={true} wrpHeight={40} wrpWidth={40} />
              </View>
              <View style={styles.stepPath}></View>
              <View style={styles.stepIndicator}>
                <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-2' size={40} color={this.state.phoneSecIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.phoneSecBg} wrpRaised={true} wrpHeight={40} wrpWidth={40} />
              </View>
              <View style={styles.stepPath}></View>
              <View style={styles.stepIndicator}>
                <IconRenderer iconFamily='MaterialCommunityIcons' iconName='numeric-3' size={40} color={this.state.addressSecIcon} style={[{ alignSelf: "center" }]} wrpStyle='round' wrpColor={this.state.addressSecBg} wrpRaised={true} wrpHeight={40} wrpWidth={40} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.supprtDiv, cssUtil.shadowXX]}></View>

        <View style='bodyWrapper'>
          <ScrollView>
            {this.state.activeState === "nameSec" ? <SectionName transmitData={(dataObj) => this.getNextScreen(dataObj, "phoneSec")} /> : <SectionName transmitData={(dataObj) => this.getNextScreen(dataObj, "phoneSec")} type='hide' />}
            {this.state.activeState === "phoneSec" ? <SectionPhone backPressMethod={(section) => this.getPreviousSection(section, "phoneSec")} transmitData={(dataObj) => this.getNextScreen(dataObj, "addressSec")} /> : <SectionPhone backPressMethod={(section) => this.getPreviousSection(section, "phoneSec")} transmitData={(dataObj) => this.getNextScreen(dataObj, "addressSec")} type='hide' />}
            {this.state.activeState === "addressSec" ? <SectionAddress backPressMethod={(section) => this.getPreviousSection(section, "addressSec")} transmitData={(dataObj) => this.getNextScreen(dataObj, "")} /> : <SectionAddress backPressMethod={(section) => this.getPreviousSection(section, "addressSec")} transmitData={(dataObj) => this.getNextScreen(dataObj, "")} type='hide' />}
          </ScrollView>
        </View>
        {this.state.isLoading ? <Loader loaderText={this.state.loaderText} /> : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bodyWrapper: {
    flex: 1,
  },
  stepPath: {
    width: "25%",
    height: 4,
    alignSelf: "center",

    backgroundColor: "#ffffff",
    marginLeft: 3,
  },
  stepIndicator: {
    width: "15%",
    borderRadius: 40,
  },
  topBg: {
    width: "100%",
    height: 50,
  },
  headerTextWrapper: {
    marginTop: 5,

    alignSelf: "center",

    width: "85%",
  },
  supprtDiv: {
    height: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#880E4F",
  },
  image: {
    flex: 1,
  },
});
export default RegisterUserScreen;
