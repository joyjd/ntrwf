import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, Alert, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import Btn from "./../../Elements/Button/Btn";

import Form from "./../../Elements/Form/Form";
import { validateContent, validateLength, validateEmail } from "./../../Elements/Validator/Validator";

import { signInWithEmailAndPassword, getOnceSnapshot, getAuthorisedUser } from "./../../Firebase/FirebaseActions";

import Loader from "./../../Utils/Loader";
import DataContext from "./../../Context/DataContext";
import { setLocalstorageObject, clearAll } from "./../../AyncStorage/LocalAsyncStorage";

class LoginScreen extends React.Component {
  static contextType = DataContext;
  loginCreds = {};
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

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
                    onPressMethod: () => {},
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
