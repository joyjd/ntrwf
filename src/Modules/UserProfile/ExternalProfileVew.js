import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { ListItem } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import IconRenderer from "./../../Utils/IconRenderer";
import MsgWrapper from "./../../Utils/MsgWrapper";

class ExternalProfileView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  closeMsgBox = (data) => {};
  render() {
    console.log("img", this.props.route.params.userPic);
    return (
      <View style={[viewUtil.viewPageWrapper]}>
        <View style={[styles.topBg, cssUtil.shadowXX]}>
          <ImageBackground source={require("./../../Assets/Images/searchBg.jpg")} resizeMode='cover' style={styles.image}>
            <View style={[styles.headerTextWrapper, viewUtil.textWrapperVw]}>
              <TextLabel style={[{ fontSize: 24, color: "#ffe4e4" }, textUtil.capitalize, cssUtil.iconShadow, textUtil.capitalize]}>{this.props.route.params.userFirstName.toLowerCase() + " " + this.props.route.params.userLastName.toLowerCase()}</TextLabel>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.bodyWrapper, cssUtil.shadowXX]}>
          <View style={styles.imageHolder}>{this.props.route.params.userPic === "" ? <IconRenderer iconFamily='Entypo' iconName='user' size={85} color='#d2dae2' style={[cssUtil.iconShadow]} /> : <Image progressiveRenderingEnabled style={styles.imageProfile} source={{ uri: this.props.route.params.userPic }}></Image>}</View>
          <View style={[styles.addressCard, , cssUtil.shadowXX]}>
            <View style={[viewUtil.viewRow, { paddingHorizontal: 10, paddingTop: 10 }]}>
              <IconRenderer iconFamily='FontAwesome' iconName='address-card' size={24} color='#17c0eb' />
              <TextLabel style={[{ paddingLeft: 10, fontSize: 18 }]}>Residential Address</TextLabel>
            </View>
            <View style={{ padding: 10 }}>
              <TextLabel style={[textUtil.passiveText]}>{this.props.route.params.userAddress}</TextLabel>
            </View>

            <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }]}>
              <MsgWrapper
                label='Drop a message'
                actionStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                iconType='wrapper'
                receiverDetails={{ UserId: this.props.route.params.UserId, userName: this.props.route.params.userFirstName.toLowerCase() + " " + this.props.route.params.userLastName.toLowerCase() }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageProfile: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  actionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
  },
  addressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 4,

    marginVertical: 20,
    width: "85%",
    alignSelf: "center",
  },
  headerTextWrapper: {
    width: "55%",
    paddingLeft: 10,
    paddingBottom: 20,
    alignSelf: "flex-end",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "flex-start",
    marginRight: 10,
    maxHeight: "40%",
    minHeight: "40%",
  },
  imageHolder: {
    height: 110,
    width: 100,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    marginTop: -70,
    marginLeft: "15%",
    borderWidth: 6,
    borderColor: "#f1c40f",
  },
  topBg: {
    width: "100%",
    height: 160,
  },
  bodyWrapper: {
    flex: 1,
    backgroundColor: "#ffe4e4",
    borderTopLeftRadius: 80,
    marginTop: -70,
  },
  image: {
    flex: 1,
  },
});

export default ExternalProfileView;
