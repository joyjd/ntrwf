import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking, Alert } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import Btn from "./../../Elements/Button/Btn";
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import { getDataLive } from "./../../Firebase/FirebaseActions";
import Preload from "./../../Common/PreLoader/Preload";
import { ScrollView } from "react-native-gesture-handler";
import PostDiscussionWrapper from "./PostDiscussionWrapper";
import SearchBox from "./../../Common/SearchBox/SearchBox";
import DataContext from "./../../Context/DataContext";

class ForumScreen extends React.Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      discussionList: [],
      viewList: [],
      isReady: false,
    };
  }

  componentDidMount() {
    this.getDiscussionList();
    if (!this.context.userLogged) {
      Alert.alert("You are not logged in !", "Please log in to start a discussion or post a comment.");
    }
  }

  getDiscussionList = () => {
    getDataLive("Forum").on("value", (snapshot) => {
      let pt = snapshot.val();

      if (pt !== null) {
        let notfCount = 0;
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        this.setState({
          discussionList: newArr,
          viewList: newArr,
          isReady: true,
        });
      }
    });
  };
  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <SearchBox search='forum' searchData={this.state.discussionList} clearText={() => this.setState({ viewList: this.state.discussionList })} getSearchResult={(resultArr) => this.setState({ viewList: resultArr })} placeholder='Search discussion topics by name...' />

        <FlatList
          ListHeaderComponent={<View style={{ marginVertical: 20 }} />}
          ListFooterComponent={<View style={{ marginVertical: 20 }} />}
          ListEmptyComponent={
            this.state.isReady ? (
              <TextLabel style={[{ flex: 1, justifyContent: "center", alignItems: "center", fontSize: 20, marginLeft: 30, marginTop: 50 }]}>No discussions found.</TextLabel>
            ) : (
              <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
                <TextLabel>Please wait...</TextLabel>
              </View>
            )
          }
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(index) => index.DiscId}
          data={this.state.viewList.reverse()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("Discussion", { discussionDetails: item })} style={[styles.forumCard, cssUtil.shadowX]}>
                <View style={[viewUtil.viewRow, styles.paddingH_10, { justifyContent: "center", alignItems: "center" }]}>
                  <IconRenderer iconFamily='MaterialCommunityIcons' iconName='forum' size={25} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#38ada9' wrpRaised={true} wrpSpace={10} wrpHeight={50} wrpWidth={50} />
                  <View style={[viewUtil.textWrapperVw]}>
                    <TextLabel style={[{ fontWeight: "bold" }]}>{item.DiscTitle}</TextLabel>
                  </View>
                </View>
                <View style={[styles.paddingH_10, { marginLeft: 5, marginTop: 5 }]}>
                  <TextLabel style={[textUtil.passiveText]}>Started By</TextLabel>
                  <View style={[viewUtil.viewRow, { marginTop: 2, alignItems: "center" }]}>
                    <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                    <TextLabel style={[{ paddingLeft: 5 }, textUtil.capitalize]}>{item.DiscOwnerName.toLowerCase()}</TextLabel>
                  </View>
                </View>
                <View style={[styles.paddingH_10, { marginLeft: 5, marginTop: 5 }]}>
                  <TextLabel style={[textUtil.passiveText]}>Started On</TextLabel>
                  <View style={[viewUtil.viewRow, { marginTop: 2, alignItems: "center" }]}>
                    <IconRenderer iconFamily='Fontisto' iconName='date' size={18} color='#17c0eb' />
                    <TextLabel style={[{ paddingLeft: 5 }]}>{item.DiscDate}</TextLabel>
                  </View>
                </View>
                <View style={[{ marginVertical: 5, marginHorizontal: 15 }]}>
                  <TextLabel style={[{ fontStyle: "italic" }, textUtil.passiveTextX]} numberOfLines={1}>
                    {item.DiscDesc}
                  </TextLabel>
                </View>
                <View style={[viewUtil.viewRow, styles.paddingH_10, { marginLeft: 5, marginTop: 15, alignItems: "center" }]}>
                  <IconRenderer iconFamily='FontAwesome' iconName='hashtag' size={18} color='#3e090959' />
                  <TextLabel style={[{ fontWeight: "bold", marginLeft: 3 }]}>{item.DiscComments} Comments</TextLabel>
                  <TextLabel style={[textUtil.passiveTextX]}> on this discussion.</TextLabel>
                </View>
                <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }, this.context.userLogged ? null : viewUtil.disableView]}>
                  <TouchableOpacity disabled={!this.context.userLogged} onPress={() => this.props.navigation.navigate("Discussion", { discussionDetails: item, defaultOpencomment: true })} style={[{ justifyContent: "center", alignItems: "center", width: "100%", paddingVertical: 5 }, viewUtil.viewRow]}>
                    <IconRenderer iconFamily='Foundation' iconName='comment-quotes' size={30} color='#27ae60' />

                    <TextLabel style={[{ color: "#27ae60", textDecorationLine: "underline", marginLeft: 5 }]}>Post a comment</TextLabel>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={[styles.floatingVw, cssUtil.shadowX]}>
          <PostDiscussionWrapper />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
  },
  floatingVw: {
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  paddingH_10: {
    paddingHorizontal: 10,
  },
  forumCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    paddingTop: 5,
  },
});
export default ForumScreen;
