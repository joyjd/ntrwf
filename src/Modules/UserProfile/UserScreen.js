import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { ListItem } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import ProfileEdit from "./ProfileEdit/ProfileEdit";

import IconRenderer from "./../../Utils/IconRenderer";
import DataContext from "./../../Context/DataContext";

import { userLogOut } from "./../../Firebase/FirebaseActions";
import { clearAll } from "./../../AyncStorage/LocalAsyncStorage";
import TransparentBtn from "./../../Elements/Button/TransparentBtn";
import PhotoUploadUserWrapper from "./PhotoUploadUserWrapper";

class UserScreen extends React.Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  render() {
    return this.context.userLogged ? (
      <View style={[viewUtil.viewPageWrapper]}>
        <ScrollView>
          <View style={[styles.topBg, cssUtil.shadowXX]}>
            <ImageBackground source={require("./../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}>
              <View style={[styles.headerTextWrapper, viewUtil.textWrapperVw]}>
                <TextLabel style={[{ fontSize: 24, color: "#ffe4e4" }, textUtil.capitalize]}>Hi, {this.context.userDetails.Name.split(" ")[0]} ! </TextLabel>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.supprtDiv, cssUtil.shadowXX]}></View>
          <View style={styles.iconWrapper}>
            <View style={[styles.iconHolder, cssUtil.shadowXX]}>{this.context.userDetails.ProfilePic === "" ? <IconRenderer iconFamily='Entypo' iconName='user' size={70} color='#d2dae2' style={[cssUtil.iconShadow]} /> : <Image style={styles.imageProfile} source={{ uri: this.context.userDetails.ProfilePic }}></Image>}</View>
            <PhotoUploadUserWrapper />
          </View>
          <View style='bodyWrapper'>
            {!this.state.editMode ? (
              <View style={[styles.accountDetailsCard, viewUtil.viewCol]}>
                <View style={[viewUtil.viewRow]}>
                  <View style={{ paddingRight: 10 }}>
                    <IconRenderer iconFamily='FontAwesome' iconName='address-card' size={20} color='#17c0eb' />
                  </View>
                  <View style={[viewUtil.textWrapperVw, { justifyContent: "center" }]}>
                    <TextLabel style={[textUtil.capitalize]}>{this.context.userDetails.Address} </TextLabel>
                  </View>
                </View>
                {this.context.userDetails.Phone !== "" ? (
                  <View style={[viewUtil.viewRow]}>
                    <View style={{ paddingRight: 10 }}>
                      <IconRenderer iconFamily='Entypo' iconName='old-phone' size={25} color='#17c0eb' />
                    </View>

                    <View style={[viewUtil.textWrapperVw, { justifyContent: "center" }]}>
                      <TextLabel>{this.context.userDetails.Phone}</TextLabel>
                    </View>
                  </View>
                ) : null}

                <View style={[viewUtil.viewRow]}>
                  <View style={{ paddingRight: 10 }}>
                    <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email' size={25} color='#17c0eb' />
                  </View>
                  <View style={[viewUtil.textWrapperVw, { justifyContent: "center" }]}>
                    <TextLabel>{this.context.userDetails.Email}</TextLabel>
                  </View>
                </View>
                <View style={[viewUtil.viewRow, { alignItems: "center", justifyContent: "flex-end" }]}>
                  <IconRenderer iconFamily='FontAwesome' iconName='pencil' size={15} color='red' />
                  <TransparentBtn title='Edit Details' onPressMethod={() => this.setState({ editMode: true })} />
                </View>
              </View>
            ) : (
              <ProfileEdit onCancel={() => this.setState({ editMode: false })} />
            )}

            {!this.state.editMode ? (
              <View style={[styles.accountActionCard, viewUtil.viewCol, cssUtil.shadowXX]}>
                <ListItem onPress={() => this.props.navigation.navigate("Messages")} bottomDivider>
                  <IconRenderer iconFamily='AntDesign' iconName='wechat' size={18} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#9980FA' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                  <ListItem.Content>
                    <ListItem.Title>
                      <TextLabel style={[{ fontSize: 18 }]}>My Messages</TextLabel>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate("MemberServices")} bottomDivider>
                  <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={17} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#f1c40f' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                  <ListItem.Content>
                    <ListItem.Title>
                      <TextLabel style={[{ fontSize: 18 }]}>My Services</TextLabel>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => this.props.navigation.navigate("Market")} bottomDivider>
                  <IconRenderer iconFamily='FontAwesome5' iconName='tools' size={17} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#22a6b3' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                  <ListItem.Content>
                    <ListItem.Title>
                      <TextLabel style={[{ fontSize: 18 }]}>My Market</TextLabel>
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem
                  onPress={() => {
                    clearAll();
                    this.context.logOutUser();
                    userLogOut();
                  }}
                  bottomDivider
                >
                  <IconRenderer iconFamily='MaterialCommunityIcons' iconName='logout' size={18} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='red' wrpRaised={true} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                  <ListItem.Content>
                    <ListItem.Title>
                      <TextLabel style={[{ fontSize: 18 }]}>Logout</TextLabel>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    ) : null;
  }
}
const styles = StyleSheet.create({
  viewHidden: {
    display: "none",
  },
  imageProfile: {
    flex: 1,
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderRadius: 1000,
  },
  uploadPic: {
    backgroundColor: "#880E4F",
    marginRight: 90,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: -20,
    borderRadius: 10,
  },
  accountDetailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  accountActionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  iconWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  iconHolder: {
    height: 100,
    width: 100,
    display: "flex",
    alignItems: "center",
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "#f1c40f",
    backgroundColor: "#ffffff",
    marginTop: -60,
    marginRight: 20,
  },
  bodyWrapper: {
    flex: 1,
  },
  topBg: {
    width: "100%",
    height: 60,
  },
  headerTextWrapper: {
    marginTop: 15,
    justifyContent: "flex-end",
    marginLeft: 15,
    alignSelf: "flex-start",
    width: "65%",
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

export default UserScreen;
