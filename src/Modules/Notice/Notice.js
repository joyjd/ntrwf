import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking, ScrollView } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

const { width, height } = Dimensions.get("window");

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import ReadMoreNotice from "./ReadMoreNotice";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";
import Preload from "./../../Common/PreLoader/Preload";
import SearchBox from "./../../Common/SearchBox/SearchBox";
import NoticeSkeleton from "./Skeletons/Skeleton";

class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      allNotices: [],
      viewList: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Notice Board" });
    this.getAllNotices();
  }

  getAllNotices = () => {
    getOnceSnapshot("Notice").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        this.setState({
          isReady: true,
          allNotices: newArr.reverse(),
          viewList: newArr.reverse(),
        });
      } else {
        this.setState({
          isReady: true,
        });
      }
    });
  };

  render() {
    return (
      <Preload isLoading={!this.state.isReady} divArr={NoticeSkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <SearchBox search='notice' searchData={this.state.allNotices} clearText={() => this.setState({ viewList: this.state.allNotices })} getSearchResult={(resultArr) => this.setState({ viewList: resultArr })} placeholder='Search notices...' />
          <FlatList
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            ListFooterComponent={<View style={{ marginTop: 30 }} />}
            ListEmptyComponent={
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextLabel>No notices found.</TextLabel>
              </View>
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            data={this.state.viewList}
            renderItem={({ item }) => {
              return (
                <View style={[styles.noticeCard, cssUtil.shadowXX]}>
                  <View style={styles.noticeHead}>
                    <View style={[viewUtil.viewRow]}>
                      <IconRenderer iconFamily='MaterialCommunityIcons' iconName='clipboard-text' size={25} color='red' style={cssUtil.iconShadow} />
                      <View style={[viewUtil.textWrapperVw]}>
                        <TextLabel style={[{ fontSize: 20, paddingHorizontal: 5 }, textUtil.capitalize]}>{item.Title.toLowerCase()}</TextLabel>
                      </View>
                    </View>

                    <View style={[viewUtil.viewRow, { alignItems: "center" }]}>
                      <IconRenderer iconFamily='FontAwesome5' iconName='calendar-alt' size={10} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#17c0eb' wrpRaised={false} wrpSpace={5} wrpHeight={20} wrpWidth={20} />
                      <TextLabel style={[textUtil.passiveText]}>{item.Postdate}</TextLabel>
                    </View>
                    <View>
                      <TextLabel numberOfLines={2} style={[{ paddingHorizontal: 5 }]}>
                        {item.Desc}
                      </TextLabel>
                    </View>

                    <ReadMoreNotice>
                      <View style={{ minWidth: "85%", maxWidth: "85%", height: "80%" }}>
                        <View style={{ minHeight: height / 1.4, maxHeight: height / 1.4 }}>
                          <ScrollView>
                            <View>
                              <TextLabel style={[{ fontSize: 20 }, textUtil.capitalize]}>{item.Title.toLowerCase()}</TextLabel>
                            </View>
                            <View>
                              <TextLabel style={[textUtil.passiveText]}>{item.Postdate}</TextLabel>
                            </View>
                            <View style={{ marginTop: 20 }}>
                              <TextLabel>{item.Desc}</TextLabel>
                            </View>
                          </ScrollView>
                        </View>
                      </View>
                    </ReadMoreNotice>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Preload>
    );
  }
}
const styles = StyleSheet.create({
  noticeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  noticeHead: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
export default Notice;
