import React from "react";
import firebase from "firebase";
import { StyleSheet, Dimensions, View, ImageBackground, Alert, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import Btn from "./../../Elements/Button/Btn";

import Form from "./../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail } from "./../../Elements/Validator/Validator";

import { signInWithEmailAndPassword, getOnceSnapshot, getAuthorisedUser, getDataByIndex } from "./../../Firebase/FirebaseActions";

import Loader from "./../../Utils/Loader";
import DataContext from "./../../Context/DataContext";
import { setLocalstorageObject, getLocalstorageObject, clearAll } from "./../../AyncStorage/LocalAsyncStorage";
import Modal from "./../../Utils/Modal";

class LoginScreen extends React.Component {
  static contextType = DataContext;
  loginCreds = {};
  forgotPwd = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      frgtPwdVisibility: false,
    };
  }
  forgotPasswordSubmitPost = () => {
    getDataByIndex("UserDetails", "Email", this.forgotPwd.Email).then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        this.toggleOverlay();
        this.forgotPasswordFirebase(this.forgotPwd.Email);
      } else {
        Alert.alert("NTRWF Password Reset", "This email is not associated with any registered account at NTRWF.Please enter your registered email address.");
      }
    });
  };

  postSubmit = (logCreds) => {
    this.setState({
      loading: true,
    });

    signInWithEmailAndPassword(logCreds.email, logCreds.password)
      .then(() => {
        return getAuthorisedUser();
      })
      .then((id) => {
        return getOnceSnapshot("/UserDetails/" + id);
      })
      .then((snapshot) => {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.context.changeUserStatus(true, {
              UserId: snapshot.val().UserId,
              Name: snapshot.val().FirstName.toLowerCase() + " " + snapshot.val().LastName.toLowerCase(),
              Password: snapshot.val().Password,
              Email: snapshot.val().Email,
              Phone: snapshot.val().Phone,
              Address: snapshot.val().Address,
              ProfilePic: snapshot.val().ProfilePic,
            });

            setLocalstorageObject("NTRWF_UserCreds", {
              UserId: snapshot.val().UserId,
              Name: snapshot.val().FirstName.toLowerCase() + " " + snapshot.val().LastName.toLowerCase(),
              Password: snapshot.val().Password,
              Email: snapshot.val().Email,
              Phone: snapshot.val().Phone,
              Address: snapshot.val().Address,
              ProfilePic: snapshot.val().ProfilePic,
            });
          }
        );
      })
      .catch((data) => {
        console.log(data);
        this.setState(
          {
            loading: false,
          },
          () => Alert.alert("Login Failed !", "Invalid credentials provided.")
        );
      });
  };

  login = (email, password) => {
    this.loginCreds["email"] = email;
    this.loginCreds["password"] = password;
    return this.loginCreds;
  };

  forgotPasswordSubmit = (Email) => {
    this.forgotPwd["Email"] = Email;
    return this.forgotPwd;
  };

  forgotPasswordFirebase = (email) => {
    var auth = firebase.auth();
    var emailAddress = email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then((data) => {
        Alert.alert("NTRWF Password Reset", "Password reset link has been sent to " + emailAddress + ".Please check mail for resetting your password.");
      })
      .catch(function (error) {
        Alert.alert("NTRWF Password Reset", "Password reset could not be done.Please contact Admin.");
      });
  };
  toggleOverlay = () => {
    this.setState({
      frgtPwdVisibility: !this.state.frgtPwdVisibility,
    });
  };
  render() {
    return (
      <>
        {this.state.loading ? <Loader loaderText='Please wait..' /> : null}
        <View style={[viewUtil.viewPageWrapper, styles.overrideBg, { minHeight: Math.round(height) }]}>
          <View style={[styles.topBg, cssUtil.shadowXX]}>
            <ImageBackground source={require("./../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}>
              <View style={[styles.headerTextWrapper]}>
                <TextLabel style={[textUtil.fontBold, { fontSize: 18, color: "#ffe4e4" }]}>Log In / Register </TextLabel>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.supprtDiv, cssUtil.shadowXX]}></View>

          <View style={styles.upperHalf}>
            <View style={styles.iconWrapper}>
              <View style={[styles.iconHolder, cssUtil.shadowXX]}>{this.context.userDetails.userLogged ? this.context.userDetails.ProfilePic === "" ? <IconRenderer iconFamily='Entypo' iconName='user' size={45} color='#d2dae2' style={[cssUtil.iconShadow]} /> : <Image resizeMode='contain' source={{ uri: this.context.userDetails.ProfilePic }}></Image> : <IconRenderer iconFamily='Entypo' iconName='user' size={45} color='#d2dae2' style={[cssUtil.iconShadow]} />}</View>
              <View style={[{ width: "100%", paddingHorizontal: 15 }]}>
                <Form
                  action={this.login}
                  afterSubmit={this.postSubmit}
                  buttonText='Login'
                  buttonOrientation='right'
                  btnType='outlined'
                  theme='light'
                  btnLeftEnable={true}
                  btnLeft={{
                    title: "Forgot Password?",
                    onPressMethod: () => this.toggleOverlay(),
                    btnStyle: { fontSize: 16, color: "#3e0909", fontWeight: "bold", textDecorationLine: "none" },
                  }}
                  fields={{
                    email: {
                      label: "Email",
                      validators: [validateContent, validateEmail],
                      icon: { type: "materialicons", name: "mail", color: "#ffffff" },
                      inputProps: {
                        keyboardType: "email-address",
                      },
                      placeholder: "Your registered mail-Id ..",
                    },
                    password: {
                      label: "Password",
                      icon: { name: "more", color: "#ffffff" },
                      validators: [validateContent, validateLength],
                      inputProps: {
                        secureTextEntry: true,
                      },
                      placeholder: "Password ..",
                    },
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.lowerHalf}></View>
          <View style={styles.regContainer}>
            <View style={{ marginTop: -10, marginLeft: 20, marginRight: 20 }}>
              <TextLabel style={[{ fontSize: 18 }]}>Not A Registered Member Yet?</TextLabel>
              <Btn title='Register / Sign Up' font={20} containerStyle={{ marginTop: 10 }} buttonStyle={{ borderRadius: 10 }} onPressMethod={() => this.props.navigation.navigate("RegisterUserScreen")} />
            </View>
          </View>
        </View>
        <>
          <Modal visibility={this.state.frgtPwdVisibility} onCloseMethod={() => this.toggleOverlay()}>
            <View style={{ minWidth: "85%", maxWidth: "85%" }}>
              <Form
                action={this.forgotPasswordSubmit}
                afterSubmit={this.forgotPasswordSubmitPost}
                buttonText='Submit'
                buttonOrientation='right'
                btnType='solid'
                theme='dark'
                btnLeftEnable={false}
                fields={{
                  Email: {
                    label: "Registered Email Id*",
                    validators: [validateContent, validateEmail],
                    icon: { type: "materialicons", name: "mail", color: "#17c0eb" },
                    inputProps: {
                      keyboardType: "email-address",
                    },
                    placeholder: "Enter your registered email..",
                  },
                }}
              />
            </View>
          </Modal>
        </>
      </>
    );
  }
}
const styles = StyleSheet.create({
  headerTextWrapper: {
    marginTop: 20,
    marginLeft: 20,
    zIndex: 1,
  },
  iconWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  iconHolder: {
    height: 70,
    width: 70,
    display: "flex",
    alignItems: "center",
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "#f1c40f",
    backgroundColor: "#ffffff",
    marginTop: -40,
    marginRight: 20,
  },
  topBg: {
    width: "100%",
    height: 50,
  },
  image: {
    flex: 1,
  },
  supprtDiv: {
    height: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "#880E4F",
  },
  overrideBg: {
    backgroundColor: "#eb3b5a96",
  },
  lowerHalf: {
    width: "100%",
    height: "15%",
    backgroundColor: "#ffe4e4",
    transform: [{ rotateZ: "10deg" }, { scaleX: 2 }],
    justifyContent: "center",
    alignItems: "center",
  },
  upperHalf: {
    height: "48%",
  },
  regContainer: {
    backgroundColor: "#ffe4e4",
    marginTop: "-15%",
    height: "35%",
  },
});
export default LoginScreen;
