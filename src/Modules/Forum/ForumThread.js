import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
const { width, height } = Dimensions.get("window");
import Btn from "./../../Elements/Button/Btn";
import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import { getDataByIndex } from "./../../Firebase/FirebaseActions";
import Preload from "./../../Common/PreLoader/Preload";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import PostCommentWrapper from "./PostCommentWrapper";
import ReadMoreToggle from "./../../Utils/ReadMoreToggle";

class ForumThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isReady: false,
    };
  }

  componentDidMount() {
    this.getCommentList();
  }

  getCommentList = () => {
    getDataByIndex("ForumComments", "DComDiscId", this.props.route.params.discussionDetails.DiscId)
      .then((snapshot) => {
        let pt = snapshot.val();
        if (pt !== null) {
          let newArr = [];
          Object.keys(pt).map((key) => {
            newArr.push(pt[key]);
          });
          // console.log(newArr);
          this.setState({
            comments: newArr,
            isReady: true,
          });
        } else {
          this.setState({
            isReady: true,
          });
        }
      })
      .catch((er) => {
        this.setState(
          {
            isReady: true,
          },
          () => Alert.alert("Services could not be fetched !", er.message)
        );
      });
  };

  render() {
    return (
      <View style={viewUtil.viewPageWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={[styles.discPlate, cssUtil.shadowX]}>
                <View>
                  <TextLabel style={[{ fontWeight: "bold" }]}>{this.props.route.params.discussionDetails.DiscTitle}</TextLabel>
                </View>
                <View style={[viewUtil.viewRow, { marginTop: 2, alignItems: "center" }]}>
                  <IconRenderer iconFamily='FontAwesome5' iconName='user-alt' size={15} color='#17c0eb' />
                  <TextLabel style={[{ paddingLeft: 5 }, textUtil.capitalize]}>{this.props.route.params.discussionDetails.DiscOwnerName.toLowerCase()}</TextLabel>
                </View>
                <View style={[viewUtil.viewRow, { marginTop: 2, alignItems: "center" }]}>
                  <IconRenderer iconFamily='Fontisto' iconName='date' size={18} color='#17c0eb' />
                  <TextLabel style={[{ paddingLeft: 5 }]}>{this.props.route.params.discussionDetails.DiscDate}</TextLabel>
                </View>
                <View style={{ marginTop: 15 }}>
                  <ReadMoreToggle text={this.props.route.params.discussionDetails.DiscDesc} numberOfLines={3} />
                </View>
              </View>

              <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                <TextLabel style={[textUtil.passiveText]}>{this.state.comments.length} Comments</TextLabel>
              </View>
              <Divider />
            </>
          }
          ListFooterComponent={<View style={{ marginVertical: 40 }} />}
          ListEmptyComponent={
            this.state.isReady ? (
              <TextLabel style={[{ flex: 1, justifyContent: "center", alignItems: "center", fontSize: 20, marginLeft: 30, marginTop: 50 }]}>No comments posted yet.</TextLabel>
            ) : (
              <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
                <TextLabel>Please wait...</TextLabel>
              </View>
            )
          }
          keyExtractor={(item) => item.DComId}
          data={this.state.comments}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={[index % 2 == 0 ? styles.cardLeft : styles.cardRight]}>
                <View style={[viewUtil.viewRow, { alignItems: "center" }, index % 2 == 0 ? { justifyContent: "flex-start" } : { justifyContent: "flex-end" }]}>
                  <TextLabel style={[textUtil.passiveText, textUtil.capitalize, { fontSize: 18 }]}>{item.DComOwnerName.toLowerCase()}</TextLabel>
                  <TextLabel style={[textUtil.passiveTextX, { marginLeft: 10 }]}>{item.DComDate}</TextLabel>
                </View>
                <View>
                  <ReadMoreToggle text={item.DComBody} numberOfLines={2} />
                </View>
              </View>
            );
          }}
        />

        <View style={[styles.floatingVw, cssUtil.shadowX]}>
          <PostCommentWrapper defaultCommentOpen={this.props.route.params.defaultOpencomment} updateCommentCount={() => this.getCommentList()} commentCount={this.state.comments.length} DComDiscId={this.props.route.params.discussionDetails.DiscId} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatingVw: {
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  cardLeft: {
    marginRight: 30,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#ffffff",
    padding: 10,
    elevation: 1,
    marginTop: 15,
  },
  cardRight: {
    marginLeft: 30,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "#ffffff",
    padding: 10,
    elevation: 1,
    marginTop: 15,
  },
  discPlate: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "#F8EFBA",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ForumThread;
