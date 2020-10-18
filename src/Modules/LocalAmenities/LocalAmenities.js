import React from "react";
import { StyleSheet, Dimensions, View, FlatList, TouchableOpacity, Linking } from "react-native";
import TextLabel from "./../../Elements/TextLabel/TextLabel";

const { width, height } = Dimensions.get("window");

import { viewUtil, cssUtil, textUtil } from "../../Styles/GenericStyles";

import IconRenderer from "./../../Utils/IconRenderer";
import { getOnceSnapshot } from "./../../Firebase/FirebaseActions";
import Preload from "./../../Common/PreLoader/Preload";
import LASkeleton from "./Skeletons/LASkeleton";
import SearchBox from "./../../Common/SearchBox/SearchBox";

class LocalAmenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      establishments: [],
      viewList: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Local Amenities" });
    this.getEstablishmentList();
  }

  getEstablishmentList = () => {
    getOnceSnapshot("Establishments").then((snapshot) => {
      let pt = snapshot.val();
      if (pt !== null) {
        let newArr = [];
        Object.keys(pt).map((key) => {
          newArr.push(pt[key]);
        });
        //newArr = newArr.concat(newArr);
        this.setState({
          isReady: true,
          establishments: newArr,
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
      <Preload isLoading={!this.state.isReady} divArr={LASkeleton}>
        <View style={viewUtil.viewPageWrapper}>
          <SearchBox search='amneties' searchData={this.state.establishments} clearText={() => this.setState({ viewList: this.state.establishments })} getSearchResult={(resultArr) => this.setState({ viewList: resultArr })} placeholder='Search by name...' />

          <FlatList
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            ListEmptyComponent={
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextLabel>No amenities found.</TextLabel>
              </View>
            }
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            data={this.state.viewList}
            renderItem={({ item }) => {
              return (
                <View style={[styles.cardWrapper, viewUtil.viewCol, cssUtil.shadowXX]}>
                  <View style={[viewUtil.viewRow]}>
                    <View style={styles.avatarWrapper}>
                      <IconRenderer iconFamily='FontAwesome' iconName='building-o' size={30} color='#ffffff' style={cssUtil.iconShadow} wrpStyle='round' wrpColor='#9980FA' wrpRaised={true} wrpSpace={10} wrpHeight={60} wrpWidth={60} />
                    </View>
                    <View style={styles.titleWrapper}>
                      <TextLabel style={[textUtil.fontBold, textUtil.capitalize, { fontSize: 18 }]}>{item.Name.toLowerCase()}</TextLabel>
                      <TextLabel>Eye Hospital</TextLabel>
                    </View>
                  </View>
                  <View style={styles.addressWrapper}>
                    <View style={[viewUtil.viewRow]}>
                      <IconRenderer iconFamily='MaterialIcons' iconName='location-on' size={20} color='#17c0eb' />
                      <TextLabel style={[textUtil.fontBold]}>Location Address</TextLabel>
                    </View>
                    <TextLabel style={[textUtil.capitalize, { paddingLeft: 20 }]}>{item.Address.toLowerCase()}</TextLabel>
                  </View>

                  <View style={[viewUtil.viewRow, styles.topBorder, { marginTop: 10 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL("geo:0,0?q=" + item.Address);
                      }}
                      style={[styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}
                    >
                      <IconRenderer iconFamily='MaterialIcons' iconName='location-on' size={30} color='#27ae60' style={[cssUtil.iconShadow]} />
                      <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Gmap</TextLabel>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL("mailto:" + item.Mail);
                      }}
                      style={[styles.actionWrapper, styles.rightBorder, viewUtil.viewRow]}
                    >
                      <IconRenderer iconFamily='MaterialCommunityIcons' iconName='email-edit' size={30} color='#27ae60' />
                      <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Write Mail</TextLabel>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL("tel:" + item.Contact);
                      }}
                      style={[styles.actionWrapper, viewUtil.viewRow]}
                    >
                      <IconRenderer iconFamily='FontAwesome' iconName='phone' size={30} color='#27ae60' />
                      <TextLabel style={[{ color: "#27ae60", marginLeft: 5, textDecorationLine: "underline" }]}>Contact</TextLabel>
                    </TouchableOpacity>
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
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "#d2dae2",
  },
  actionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "33.3%",
    paddingVertical: 5,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#d2dae2",
  },

  addressWrapper: {
    marginHorizontal: 10,
  },
  titleWrapper: { width: "80%", justifyContent: "center", alignItems: "flex-start", paddingLeft: 5, paddingTop: 5 },
  avatarWrapper: { width: "20%", margin: 5, justifyContent: "center" },
  cardWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },
});
export default LocalAmenities;
