import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";
import ReadMore from "./../../Elements/Button/ReadMore";
const { width, height } = Dimensions.get("window");

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";
import Preload from "./../../Common/PreLoader/Preload";
import EventSkeleton from "./Skeletons/EventSkeleton";
import { LinearGradient } from "expo-linear-gradient";
import ReadMoreToggle from "./../../Utils/ReadMoreToggle";
import Photoslider from "./../../Utils/PhotoSlider";
import SearchBox from "./../../Common/SearchBox/SearchBox";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      eventList: [],
      viewList: [],
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({ title: "Community Events" });
    this.getEventList();
  }

  getEventList = () => {
    getOnceSnapshot("Events").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        this.setState({
          isReady: true,
          eventList: newArr,
          viewList: newArr,
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
      <Preload isLoading={!this.state.isReady} divArr={EventSkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <SearchBox search='events' searchData={this.state.eventList} clearText={() => this.setState({ viewList: this.state.eventList })} getSearchResult={(resultArr) => this.setState({ viewList: resultArr })} placeholder='Search events by name...' />
          <FlatList
            horizontal={false}
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            ListFooterComponent={<View style={{ marginTop: 30 }} />}
            ListEmptyComponent={
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextLabel>No events found.</TextLabel>
              </View>
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.id}
            data={this.state.viewList.reverse()}
            renderItem={({ item,index }) => {
              return (
                <View key={index} style={[styles.eventCard, viewUtil.viewCol, cssUtil.shadowXX]}>
                  <View style={styles.imageWrapper}>
                    <View style={styles.imageContainer}>
                      <Photoslider photo={item.photo} customStyle={{ borderRadius: 5 }} />
                    </View>

                    <View style={styles.dateWrapper}>
                      <LinearGradient colors={["transparent", "#000000"]} locations={[0, 0.5]}>
                        <View style={[viewUtil.viewRow]}>
                          <View style={{ justifyContent: "flex-end" }}>
                            <IconRenderer iconFamily='FontAwesome5' iconName='calendar-alt' size={15} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#17c0eb' wrpRaised={false} wrpSpace={5} wrpHeight={30} wrpWidth={30} />
                          </View>
                          <TextLabel style={[{ color: "#ffffff", paddingHorizontal: 5, paddingBottom: 10, paddingTop: 20 }]}>{item.date}</TextLabel>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                  <View style={[styles.descWrapper]}>
                    <TextLabel style={[{ fontSize: 18, paddingLeft: 5 }, textUtil.fontBold]}> {item.name}</TextLabel>
                    <View style={[viewUtil.viewRow]}>
                      <View>
                        <IconRenderer iconFamily='MaterialIcons' iconName='location-on' size={15} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#17c0eb' wrpRaised={false} wrpSpace={5} wrpHeight={25} wrpWidth={25} />
                      </View>
                      <View style={[{ justifyContent: "center" }, viewUtil.textWrapperVw]}>
                        <TextLabel>{item.venue}</TextLabel>
                      </View>
                    </View>
                    <View style={{ marginVertical: 10, margingHorizontal: 5 }}>
                      <ReadMoreToggle text={item.desc} numberOfLines={1} />
                    </View>
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
  imageContainer: {
    height: "100%",
    backgroundColor: "#90A4AE",
    borderRadius: 5,
  },
  dateWrapper: {
    width: "100%",
    zIndex: 1,
    marginTop: -30,
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 30,
  },
  imageWrapper: {
    marginHorizontal: 20,
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 5,
    marginTop: -20,
  },
  descWrapper: {
    marginHorizontal: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 20,
    paddingTop: 10,
  },
});
export default Events;
