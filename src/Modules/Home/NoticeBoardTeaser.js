import React from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import { Icon } from "react-native-elements";
import IconRenderer from "./../../Utils/IconRenderer";
const { width, height } = Dimensions.get("window");
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";
import { getLatestElement } from "./../../Firebase/FirebaseActions";

class NoticeBoardTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: [],
      isReady: false,
    };
  }

  componentDidMount() {
    this.getLatestNotice();
  }

  getLatestNotice = () => {
    getLatestElement("Notice").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        this.setState({
          isReady: true,
          notice: newArr,
        });
      } else {
        this.setState({
          isReady: true,
        });
      }
    });
  };

  render() {
    return this.state.isReady ? (
      <TouchableOpacity style={[styles.noticeWrapper, cssUtil.shadowXX]} onPress={() => this.props.navigation.navigate("Notice")}>
        <View style={styles.boardLine}>
          <View>
            <Image style={styles.pinImg} source={require("./../../Assets/Images/pin.png")}></Image>
          </View>
          <View>
            <TextLabel style={[textUtil.semiBold]}>NOTICE BOARD</TextLabel>
          </View>
          <View></View>
        </View>
        <View style={styles.boardLine}>
          <IconRenderer iconFamily='MaterialCommunityIcons' iconName='clipboard-text' size={25} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#FF512F' wrpRaised={false} wrpSpace={10} />
          <View style={[viewUtil.textWrapperVw, viewUtil.viewCol]}>
            <View style={[viewUtil.textWrapperVw, styles.topMargin]}>
              <TextLabel style={[textUtil.fontBold, textUtil.capitalize]} numberOfLines={1}>
                {this.state.notice[0].Title.toLowerCase()}
              </TextLabel>
            </View>
            <View style={[viewUtil.textWrapperVw]}>
              <TextLabel numberOfLines={1} style={[{ fontSize: 14 }]}>
                {this.state.notice[0].Desc}
              </TextLabel>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 20, paddingTop: 10 }}>
          <TextLabel style={[{ color: "#FF512F", textDecorationLine: "underline" }]}>View All</TextLabel>
        </View>
      </TouchableOpacity>
    ) : null;
  }
}

export default NoticeBoardTeaser;

const styles = StyleSheet.create({
  boardLine: {
    display: "flex",
    flexDirection: "row",
  },
  noticeWrapper: {
    backgroundColor: "#ffeaa7",
    borderRadius: 20,

    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  pinImg: {
    height: 45,
    width: 50,
    marginLeft: 10,
    marginTop: -25,
  },
  topMargin: {
    marginTop: 10,
  },
});
